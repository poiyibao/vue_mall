<template>
    <div id="detail">
        <detail-nav-bar class="datilNav" @titleClick="titleClick" ref="navIndex"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop :shop="shop"></detail-shop>
        <detail-goods-pic :goodsPic="detailInfo" @imgLoad="imgLoad"></detail-goods-pic>
        <detail-item-params :item-params="itemParams" ref="params"></detail-item-params>
        <detail-comment :comment="comment" ref="comments" ></detail-comment>
        <goods-list :goods ="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addCart"> </detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShow"></back-top>
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
    import Scroll from "components/common/scroll/Scroll";
    import { itemListenerMixin,backTopMixin} from "common/mixin";
    import DetailBottomBar from "./childComponent/DetailBottomBar";
    //import {debounce} from "../../common/utils";

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
            GoodsList,
            DetailBottomBar,
        },
        mixins: [itemListenerMixin,backTopMixin],
        data() {
            return {
                iid: null,
                topImages:[],
                recommends: [],
                goods: {},
                shop: {},
                detailInfo: {},
                itemParams: {},
                comment: {},
                tops:[],
                //newRefresh: null,
                getTops: null,
                currentIndex: 0,

            }
        },
        mounted() {

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
            });
            //请求推荐数据
            getRecommend().then(res =>{
                this.recommends = res.data.list
            });
            //详情页图片加载完监听
        },
        destroyed() {
            //取消全局事件监听
            this.$bus.$off("itemImgeLoad", this.itemImgListener);
        },
        methods: {
            imgLoad() {
                //console.log("---");
                this.$refs.scroll.refresh();
                //his.newRefresh();
                this.tops = [];
                this.tops.push(0);
                this.tops.push(this.$refs.params.$el.offsetTop);
                this.tops.push(this.$refs.comments.$el.offsetTop);
                this.tops.push(this.$refs.recommend.$el.offsetTop);
                this.tops.push(Number.MAX_VALUE);
                //console.log(this.tops);

            },
            titleClick(index){
                this.$refs.scroll.scroll.scrollTo(0,44-this.tops[index],500)
            },
            contentScroll(position) {
                //backTap是否显示
                this.isShow = position.y < (-1000);
                const positionY = -position.y;
                let length = this.tops.length;
                for (let i = 0; i < length-1; i++) {
                    if ((this.currentIndex !== i) && (positionY >= this.tops[i]-44 && positionY < this.tops[i + 1]-44)) {
                        this.currentIndex = i;
                        this.$refs.navIndex.currentIndex = this.currentIndex;
                        //console.log(this.currentIndex);
                    }

                }
            },
            addCart() {
                //获取购物车展示商品信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                //console.log("----");
                //将商品添加入购物车

                this.$store.dispatch("addCart", product).then(res => {
                    this.$toast.show(res, 2000);
                });

            }
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