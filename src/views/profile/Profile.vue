<template>
  <div class="profile">
    <nav-bar class="profile-nav">
      <div slot="right" class="option">
        <img src="~assets/img/profile/option.png" alt="">
      </div>
    </nav-bar>
    <user></user>
    <manage></manage>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import user from "./childComps/user";
  import manage from "./childComps/manage";
  export default {
    name: "Profile",
    components: {
      NavBar,
      manage,
      user
    }
  }
</script>

<style scoped>
  .profile {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #E6E6E6;
  }
  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .option img {
    position: fixed;
    top: 5px;
    right:10px;
  }
</style>
