declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "vue-chartkick" {
  import {PluginObject} from "vue";
  interface VueChartkickPlugin extends PluginObject<{adapter: any}> {
    version: string;
    addAdapter: (library: any) => void
  }
  const VueChartkick: VueChartkickPlugin;
  export default VueChartkick;
}

declare module "chart.js"