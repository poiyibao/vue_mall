<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
        <div class="goods-title">{{goods.title}}</div>
        <div class="goods-price">
            <span class="new-price">{{goods.newPrice}}</span>
            <span class="old-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <div class="goods-other">
            <span>{{goods.columns[0]}} </span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        <div class="goods-services">
            <span class="goods-services-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
        props: {
            goods: {
                type:Object
            }
        }
    }
</script>

<style scoped>
    .base-info {
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom:  5px solid #f2f5f8;
    }
    .goods-title {
        color: #222;
    }
    .goods-price {
        margin-top: 10px;
    }
    .goods-price .new-price {
        font-size: 24px;
        color: var(--color-high-text);

    }
    .goods-price .old-price {
        font-size: 13px;
        margin-left: 5px;
        text-decoration: line-through;

    }
    .goods-price .discount {
        font-size: 12px;
        padding: 2px 5px;
        color: #fff;
        background-color: var(--color-high-text);
        border-radius: 8px;
        margin-left: 5px;
        position: relative;
        top: -8px;
    }
    .goods-other {
        margin-top: 15px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        border-bottom: 1px solid rgba(100,100,100,0.1);
    }
    .goods-services {
        display: flex;
        justify-content: space-between;
        line-height: 60px;

    }
    .goods-services-item img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
    }
    .goods-services-item span {
        font-size: 13px;
        color: #333;
    }
</style>