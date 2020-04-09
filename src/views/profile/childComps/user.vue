<template>
    <div class="user">
        <div class="user-img"><img src="~assets/img/profile/avatar.svg" alt=""></div>
        <div class="user-login"><span>请登录</span></div>
    </div>
</template>

<script>
    export default {
        name: "user"
    }
</script>

<style scoped>
    .user {
        display: flex;
        align-items: center;
        width: 100%;
        height: 200px;
        //background-color: var(--color-tint);
    }
    .user-img  img{
        width: 150px;
        height: 150px;
    }
    .user-login span {
        font-size: 30px;
        font-weight: bolder;
    }

</style>