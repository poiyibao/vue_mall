<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">易购女装</div>
    </nav-bar>
    <tab-control ref="copyTabControl"
                 class="tab-control"
                 v-show="isTabControlfixed"
                 :titles="['流行','新品','精选']"
                 @tabClick="tabClick"></tab-control>
    <Scroll class="scroll" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
    <recommend-view :recommends="recommends"/>
    <fashion></fashion>
    <tab-control ref="tabControl"
                 :titles="['流行','新品','精选']"
                 @tabClick="tabClick"></tab-control>
    <goods-list :goods="goods[selectType].list"></goods-list>
    </Scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import fashion from './childComps/fashion';

  import tabControl from "components/content/tabcontrol/tabControl";
  import GoodsList from "components/content/goods/GoodsList";

//import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import Scroll from "components/common/scroll/Scroll";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      fashion,
      tabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list:[]

          },
          'new': {
            page: 0,
            list:[]

          },
          'sell': {
            page: 0,
            list:[]
          },
          },
        selectType:'pop',
        tabOffsetTop: 0,
        isTabControlfixed: false,
        saveY:0,
      }
    },
    created() {
      // 1.请求多个导航分类数据
      this.getHomeMultidata();
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      //console.log(this.goods['pop']);

    },
    mounted() {
      // 图片加载完成监听
      //tabcontrol的offsetTop获取
      //tabcontrol为组件，通过$el:属性获取组件中元素

    },

    activated() {
      //return console.log('activated');
      //this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
       this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
      // return console.log('deactivated');
    },

    methods: {
      /*
      *网络请求方法
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type, page).then(res =>{
          this.goods[type].list .push(...res.data.list );
          this.goods[type].page += 1;
          this.$refs.scroll.scroll.finishPullUp()
        })
      },
      /*
      * 事件监听
      * */
      tabClick(index) {
        switch (index) {
          case 0:
            this.selectType = 'pop';
            break
          case 1:
            this.selectType = 'new';
            break
          case 2:
            this.selectType = 'sell';
            break

        }
        this.$refs.copyTabControl.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },

      /*
      * 判断返回顶端按钮的显示隐藏
      * */
      contentScroll(position) {
        //console.log(position);
        //backTap是否显示
        this.isShow = position.y < (-1000);
        //controlbar是否吸顶
        this.isTabControlfixed = (-position.y) >= this.tabOffsetTop
      },
      /*
      * 上拉加载更多
      * */
      loadMore (){
        //console.log('shangla');
        this.getHomeGoods(this.selectType)
      },
      /*
      *防抖监听
      * */
      /*
      * 轮播图片加载完成监听
      * */
      swiperImageLoad (){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        //console.log(this.$refs.tabControl.$el.offsetTop);
      },

    }
  }
</script>

<style scoped>
  #home {
    //margin-top: 44px;
    height: 100vh;
    //padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
     */
  }
  .tab-control {
    position: relative;
    z-index: 99;
  }

  .scroll {
  //height: 300px;
  overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

</style>
