<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
          color="none"
          elevation="0"
          v-attrs="attrs"
          v-on="on"
      ><v-icon>mdi-chart-box</v-icon></v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="black"
            dark
        >Statistics</v-toolbar>

        <h2>Statistics</h2>
        <div class="stat--box">
          <v-sheet >
            <p class="stat--num">0</p>
            <p>Played</p>
          </v-sheet >
          <v-sheet >
            <p class="stat--num">100%</p>
            <p>Win %</p>
          </v-sheet >
          <v-sheet >
            <p class="stat--num">0</p>
            <p>Current streak</p>
          </v-sheet>
          <v-sheet >
            <p class="stat--num">0</p>
            <p>Max streak</p>
          </v-sheet>
        </div>
        <h2>Guess Distribution</h2>
        <bar-chart :library="{ scales: { xAxes: [{display: false}]}}" width="60%" height="200px" style="margin: 0 auto 10px;" :stacked="true"
                   :data="[['1', 1], ['2', 4], ['3', 6], ['4', 12], ['5', 23], ['6', 10]]"></bar-chart>
        <div v-if="gameState === 'SUCCESS' || gameState === 'FAIL'">
          <h2>Next WORDLE</h2>
          <Timer></Timer>
        </div>


        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Timer from "@/components/Timer.vue";
@Component({
  components: {Timer}
})
export default class Statistics extends Vue {
  gameState: string = JSON.parse(localStorage.getItem('state')!)
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