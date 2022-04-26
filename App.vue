<template>
  <w-app>
    <w-toolbar shadow height="4em" fixed absolute>
      <router-link to="/">
        <div class="title3 mr3">Wordle</div>
      </router-link>
      <div class="spacer"></div>
      <router-link to="/">
        <w-button text lg class="ml3" height="2.5em">
          Statistics
        </w-button>
      </router-link>
      <router-link to="/about">
        <w-button text lg class="ml3" height="2.5em">
          Login
        </w-button>
      </router-link>
      <router-link to="/about">
        <w-button text lg class="ml3" height="2.5em">
          Register
        </w-button>
      </router-link>
    </w-toolbar>
    <router-view class="view-class"/>
  </w-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.view-class {
  padding-top: 4em;
}
</style>
