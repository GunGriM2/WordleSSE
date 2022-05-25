import {BadRequestException, Body, Controller, Get, Patch, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from "express";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  async register(
      @Body('name') name: string,
      @Body('password') password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.appService.create({
      name,
      password: hashedPassword
    });

    delete user.password;

    return user;
  }

  @Post('login')
  async login(
      @Body('name') name: string,
      @Body('password') password: string,
      @Res({passthrough: true}) response: Response
  ) {
    const user = await this.appService.findOne({name});

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({id: user.id});

    response.cookie('jwt', jwt, {httpOnly: true});

    return {
      message: 'success'
    };
  }

  @Get('users')
  async users() {
    try {
      const users = await this.appService.findAll()

      return users;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.appService.findOne({id: data['id']});

      const {password, ...result} = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Patch('statistics')
  async update_stats(
      @Body('state') state: string,
      @Body('currentRow') currentRow: string,
      @Req() request: Request
  ) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.appService.findOne({id: data['id']});
      let current_streak = user.current_streak;

      await this.appService.increment({id: user['id']}, "tries", 1);
      if (state === "SUCCESS") {
        await this.appService.increment({id: user['id']}, "current_streak", 1);
        if (current_streak + 1 > user.max_streak)
          await this.appService.update(user['id'], {max_streak: current_streak + 1});
        await this.appService.increment({id: user['id']}, String(currentRow), 1);

      } else {
        await this.appService.update(user['id'], {current_streak: 0});
      }

      const result = await this.appService.findOne({id: data['id']});

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return {
      message: 'success'
    };
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success'
    }
  }

}
