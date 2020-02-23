<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">易购女装</div>
    </nav-bar>
    <Scroll class="scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <fashion></fashion>
    <tab-control class="tab-control" :titles="['流行','新品','精选']"
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
  import backTop from "components/content/backtop/backTop";
//import GoodsList from "../../components/content/goods/GoodsList";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  import Scroll from "components/common/scroll/Scroll";


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
      backTop
    },
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
        isShow: false

      }
    },
    created() {
      // 1.请求多个导航分类数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      //console.log(this.goods['pop']);
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
          this.goods[type].list .push(...res.data.list )
          this.goods[type].page += 1
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
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0,900)
      },
      contentScroll(position) {
        //console.log(position);
        this.isShow = position.y < (-1000)
      },
    }
  }
</script>

<style scoped>
  #home {
    margin-top: 44px;
    height: 100vh;
    //padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
  .tab-control {
    position: sticky;
    top: 44px;
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
