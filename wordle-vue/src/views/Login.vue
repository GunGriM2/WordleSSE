<template>
  <v-content>
    <v-card width="500" class="mx-auto mt-9">
      <v-card-title>Authorization</v-card-title>
      <v-card-text>
        <v-text-field v-model="data.name" label="Username" prepend-icon="mdi-account-circle"/>
        <v-text-field
            v-model="data.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"/>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="register()">Register</v-btn>
        <v-btn color="info" @click="login()">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserService from '@/services/UserService';

@Component
export default class Login extends Vue {

  data: {name: string, password: string} =
      {
        name: '',
        password: ''
      }

  showPassword: boolean = false;

  async register() {
    console.log(this.data)
    const response = await UserService.create(this.data)
  }

  async login() {
    try {
      const response = await UserService.login(this.data)
      await this.$store.dispatch('setAuth', true)

    } catch (e) {

    }
  }
}
</script>

<style scoped>

</style>