<template>
  <header>
    <nav>
      <div class="branding">
        <img src="@/assets/wordle-icon.png"/>
      </div>
      <ul class="navigation">
        <li>
          <router-link to="/"><it-button type="primary">Home</it-button></router-link>
        </li>
        <li>
          <router-link to="/about"><it-button type="primary">About</it-button></router-link>
        </li>
      </ul>

    </nav>
<!--    <it-divider style="margin: 0px"/>-->
  </header>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
header {
  top: 0;
  background-color: rgba(245, 248, 240, 0.96);
  width: 100%;
  position: sticky;
  z-index: 99;


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