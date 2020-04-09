<template>
    <div class="manage">
        <div class="all-orders"><span>所有订单</span><img src="~assets/img/common/spread.svg" alt=""></div>
        <div class="order-category">
            <div class="manage-item"><img src="~assets/img/profile/orders.png" alt=""><p>待付款</p></div>
            <div class="manage-item"><img src="~assets/img/profile/deliver.png" alt=""><p>待发货</p></div>
            <div class="manage-item"><img src="~assets/img/profile/delivered.png" alt=""><p>待收货</p></div>
            <div class="manage-item"><img src="~assets/img/profile/comment.png" alt=""><p>待评价</p></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mmanage"
    }
</script>

<style scoped>
    .manage {
        width: 90%;
        height: 150px;
        margin: 0 auto;
        background-color: #fff;
        border: #fff solid 1px;
        border-radius: 15px;
    }
    .all-orders {
        border-bottom:#E6E6E6 solid 1px ;
        font-size: 18px;
        font-weight: bolder;
        padding-bottom: 10px;
    }
    .all-orders span {
        position: relative;
        top: 5px;
        left: 5px;;
    }
    .all-orders img {
        position: fixed;
        right:15px;
    }
    .order-category {
        display: flex;
        justify-content: space-around;
    }
    .manage-item {
        margin-top: 20px;
        font-size: 14px;
    }
    .manage-item img {
        width: 40px;
        height: 40px;
    }
</style>