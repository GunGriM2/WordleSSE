<template>
  <div>
    <h1>This is an about page</h1>
    <Timer></Timer>
  </div>
</template>

<script>
import Timer from '@/components/Timer';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Timer
  }
})
export default class About extends Vue {

};
</script>