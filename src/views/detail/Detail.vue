<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop :shop="shop"></detail-shop>
        <detail-goods-pic :goodsPic="detailInfo"></detail-goods-pic>
        <detail-item-params :item-params="itemParams"></detail-item-params>
    </div>
</template>

<script>
    import detailNavBar from "./childComponent/detailNavBar";
    import {getDetail,Goods} from "network/detail";
    import DetailSwiper from "./childComponent/DetailSwiper";
    import DetailBaseInfo from "./childComponent/DetailBaseInfo";
    import DetailShop from "./childComponent/DetailShop";
    import DetailGoodsPic from "./childComponent/DetailGoodsPic";
    import DetailItemParams from "./childComponent/DetailItemParams";
    export default {
        name: "Detail",
        props: {

        },
        components :{
            detailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShop,
            DetailGoodsPic,
            DetailItemParams
        },
        data() {
            return {
                iid: null,
                topImages:[],
                goods: {},
                shop: {},
                detailInfo: {},
                itemParams: {}

            }
        },
        created() {
            this.iid = this.$route.params.iid;
            //根据idd获取详情页数据
            getDetail(this.iid).then(res =>{
                // 1.获取顶部图片
                this.topImages = res.result.itemInfo.topImages
                //获取商品信息
                this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services);
                //获取店铺信息
                this.shop = res.result.shopInfo;
                //获取详情图片
                this.detailInfo = res.result.detailInfo;
                //获取商品参数
                this.itemParams = res.result.itemParams;

            })
        }
    }
</script>

<style scoped>

</style>