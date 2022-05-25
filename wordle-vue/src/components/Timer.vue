<template>
  <div>
    <div class="time--box" v-if="seconds">
      <v-sheet elevation="0" >{{ ("0" + this.hours).slice(-2) }}:{{ ("0" + this.minutes).slice(-2) }}:{{ ("0" + this.seconds).slice(-2) }}</v-sheet>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  nextDay: Date = new Date(new Date().setHours(24, 0, 0, 0))

  mounted() {
    setInterval(() => {
      const currentDate = new Date();
      const leftTime = this.nextDay.getTime() - currentDate.getTime();

      this.seconds = Math.floor(leftTime / 1000);
      this.minutes = Math.floor(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);

      this.seconds = this.seconds % 60;
      this.minutes = this.minutes % 60;
    }, 1000)
  }

};
</script>

<style scoped lang="scss">
.time--box {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .v-sheet {
    color: black;
    font-size: xx-large;
    font-weight: bold;
    margin: 0 5px;
    width: 150px;
    height: 60px;
    line-height: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>