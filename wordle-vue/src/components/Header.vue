<template>
  <v-app-bar>
    <nav>
      <div class="branding">
        <img src="@/assets/wordle-icon.png"/>
      </div>
      <ul class="navigation">
        <li>
          <Statistics :isVisible="isVisible" :key="statKey"/>
        </li>
        <li>
          <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  elevation="0"
                  color="none"
                  v-bind="attrs"
                  v-on="on"
              ><v-icon>mdi-help-circle-outline</v-icon></v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                    color="black"
                    dark
                >HOW TO PLAY</v-toolbar>
                <v-card-text>
                  <p>Guess the <strong>WORDLE</strong> in six tries.</p>
                  <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
                  <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                  <v-divider></v-divider>
                  <p><strong>A new WORDLE will be available each day!</strong></p>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                      text
                      @click="dialog.value = false; overlay = false"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </li>
        <li>
          <router-link to="/"><v-btn elevation="0">Play</v-btn></router-link>
        </li>
        <li>
          <router-link to="/rating"><v-btn elevation="0">Rating</v-btn></router-link>
        </li>
        <li v-if="!this.$store.state.authenticated">
          <router-link to="/login"><v-btn elevation="0">Login</v-btn></router-link>
        </li>
        <li v-else>
          <v-btn elevation="0" @click="logout">Logout</v-btn>
        </li>
      </ul>
    </nav>

<!--    <it-divider style="margin: 0px"/>-->
  </v-app-bar>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Statistics from "@/components/Statistics.vue";
import UserService from "@/services/UserService";

/**
 * Navigation bar of the App
 *
 * @displayName Navbar
 */
@Component({
  components: {Statistics}
})
export default class Header extends Vue {
  /**
   * Makes statistics dialog visible
   */
  isVisible: boolean = false
  statKey: number = 0
  /**
   * Logs user out
   *
   * @public
   */
  async logout() {
    try {
      await UserService.logout()
      await this.$store.dispatch('setAuth', false)
      this.statKey++;

    } catch (e) {

    }


  }
};

</script>

<style lang="scss" scoped>
.v-app-bar {
  top: 0;
  background-color: rgba(245, 248, 240, 0.96);
  width: 100%;
  max-height: 66px;
  position: sticky;
  z-index: 99;
  margin-bottom: 10px;

  .v-card-text {
    text-align: left !important;
  }

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    width: 90%;
    margin: 0 auto;

    ul,
    a {
      font-weight: 500;
      color: cornflowerblue;
      list-style: none;
      text-decoration: none;
    }

    li {
      //padding: 16px;
      margin-left: 16px;

    }

    a {
      font-size: 14px;
      transition: .5s ease all;
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 50px;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
  }

}
</style>

