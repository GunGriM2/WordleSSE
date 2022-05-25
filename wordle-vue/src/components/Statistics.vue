<template>
  <div>
    <v-btn color="none" elevation="0" @click="isVisible = true">
      <v-icon>mdi-chart-box</v-icon>
    </v-btn>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="isVisible"
    >
      <v-card>
        <v-toolbar
            color="black"
            dark
        >Statistics</v-toolbar>

        <h2>Statistics</h2>
        <div class="stat--box">
          <v-sheet >
            <p class="stat--num">{{ this.tries }}</p>
            <p>Played</p>
          </v-sheet >
          <v-sheet >
            <p class="stat--num">{{ this.win_percent }}%</p>
            <p>Win %</p>
          </v-sheet >
          <v-sheet >
            <p class="stat--num">{{ this.current_streak }}</p>
            <p>Current streak</p>
          </v-sheet>
          <v-sheet >
            <p class="stat--num">{{ this.max_streak }}</p>
            <p>Max streak</p>
          </v-sheet>
        </div>
        <h2>Guess Distribution</h2>
        <bar-chart :library="{ scales: { xAxes: [{display: false}]}}" width="60%" height="200px" style="margin: 0 auto 10px;" :stacked="true"
                   :data="[['1', this.one], ['2', this.two], ['3', this.three], ['4', this.four], ['5', this.five], ['6', this.six]]"></bar-chart>
        <div v-if="gameState === 'SUCCESS' || gameState === 'FAIL'">
          <h2>Next WORDLE</h2>
          <Timer></Timer>
        </div>


        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="isVisible = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Timer from "@/components/Timer.vue";
import UserService from "@/services/UserService";
@Component({
  components: {Timer}
})
export default class Statistics extends Vue {

  isVisible: boolean = false

  gameState: string = JSON.parse(localStorage.getItem('state')!)
  tries: number = 0
  win_percent: number = 0
  current_streak: number = 0
  max_streak: number = 0
  one: number = 0
  two: number = 0
  three: number = 0
  four: number = 0
  five: number = 0
  six: number = 0

  async mounted() {
    try {
      const response = await UserService.getOne()
      if (response.data) {
        this.one = response.data['1']
        this.two = response.data['2']
        this.three = response.data['3']
        this.four = response.data['4']
        this.five = response.data['5']
        this.six = response.data['6']
        this.tries = response.data.tries
        this.current_streak = response.data.current_streak
        this.max_streak = response.data.max_streak

        if (Math.ceil((this.one+this.two+this.three+this.four+this.five+this.six)/this.tries * 100)) {
          this.win_percent = Math.ceil((this.one+this.two+this.three+this.four+this.five+this.six)/this.tries * 100)
        }

      }
    } catch (e) {

    }
  }
};

</script>

<style scoped lang="scss">
.stat--box {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  .v-sheet {
    margin: 0 5px;
    width: 80px;
    height: 80px;
    //line-height: px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;

    p {
      margin-bottom: 5px;
      color: #787c7e;
      font-size: small;
    }
    .stat--num {
      color: black;
      margin-bottom: 0px;
      font-size: xx-large;
      font-weight: bold;
    }


  }
}
</style>