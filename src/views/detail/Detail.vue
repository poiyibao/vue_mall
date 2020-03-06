<template>
    <div id="detail">
        <detail-nav-bar class="datilNav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop :shop="shop"></detail-shop>
        <detail-goods-pic :goodsPic="detailInfo"></detail-goods-pic>
        <detail-item-params :item-params="itemParams"></detail-item-params>
        <detail-comment :comment="comment"></detail-comment>
        <goods-list :goods ="recommends"></goods-list>
        </scroll>
    </div>
</template>

<script>
    import detailNavBar from "./childComponent/detailNavBar";
    import {getDetail,Goods,getRecommend} from "network/detail";
    import DetailSwiper from "./childComponent/DetailSwiper";
    import DetailBaseInfo from "./childComponent/DetailBaseInfo";
    import DetailShop from "./childComponent/DetailShop";
    import DetailGoodsPic from "./childComponent/DetailGoodsPic";
    import DetailItemParams from "./childComponent/DetailItemParams";
    import DetailComment from "./childComponent/DetailComment";

    import GoodsList from "components/content/goods/GoodsList";
    import {debounce} from "common/utils";
    import Scroll from "components/common/scroll/Scroll";
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
            DetailItemParams,
            DetailComment,
            Scroll,
            GoodsList
        },
        data() {
            return {
                iid: null,
                topImages:[],
                recommends: [],
                goods: {},
                shop: {},
                detailInfo: {},
                itemParams: {},
                comment: {}

            }
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.scroll.refresh,100);

            this.$bus.$on('detailItemImgeLoad',() =>{
                refresh()
            });

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
                //console.log(this.itemParams.rule.tables);
                //获取评论信息
                if(res.result.rate.cRate !== 0) {
                    this.comment = res.result.rate.list[0]
                }

            })
            //请求推荐数据
            getRecommend().then(res =>{
                this.recommends = res.data.list
            })
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 999;
        background-color: #fff;
        height: 100vh;
    }
    .content {
        height: calc(100% - 44px);
        background-color: #fff;
    }
    .datilNav {
        position: relative;
        z-index: 999;
        background-color: #fff;
    }
</style>