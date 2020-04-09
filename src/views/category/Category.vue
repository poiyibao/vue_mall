<template>
  <div class="category">
    <nav-bar class="home-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="detail">
      <left-bar :left-bar="categoryList" @barClick="barClick"></left-bar>
      <Scroll class="content" ref="scroll" :probeType="3">
        <right-content :item-list="subcategoryList[currentIndex]"></right-content>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import {
    getCategory,
    getSubcategory,
  } from "network/category";

  import NavBar from 'components/common/navbar/NavBar';
  import rightContent from "./childComps/rightContent";
  import leftBar from "./childComps/leftBar";
  export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      leftBar,
      rightContent,
    },
    data() {
      return {
        categoryList:[],
        subcategoryList: [],
        currentIndex: 0,

      }

    },
    created() {
      //请求网络数据（2）
      this.getCategory();
    },
    methods: {
      //使用axios实例封装，再次封装为方法，再created中直接调用
      getCategory() {
        //请求分类的左侧分类主题数据（1）
        getCategory().then(res => {
          console.log(res.data.category.list);
          //存储左侧主题栏数据
          this.categoryList = res.data.category.list;
          //渲染数据后读取左侧数据
          this.$nextTick(() => {
          // 读取参数协助右侧top请求对应的数据
          this.getSubcategory(this.categoryList[0].maitKey, 0);
          });
        });
        },
      getSubcategory(key, index) {
        getSubcategory(key).then(res => {
          this.subcategoryList[index] = res.data.list;
          console.log(this.subcategoryList);
        });
      },
      //左边点击事件的传出
      barClick(index) {
        //左边点击所对应的index保存起来
        this.currentIndex = index;
        //请求对应的右边数据
        this.getSubcategory(this.categoryList[this.currentIndex].maitKey, index);
        //右侧展示区域Y值回归为0
        this.$refs.scroll.scroll.scrollTo(0, 0, 0);
       //this.$refs.scroll.refresh()
      }
      },
  }
</script>

<style scoped>
  .category {
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .home-nav {
    //z-index: 999;
    background-color: var(--color-tint);
    color: #fff;
  }
  .detail {
    display: flex;
    width: 100%;
    height:calc(100% - 49px - 44px);
  }
  .content {
    position: fixed;
    right: 0;
    height: calc(100% - 49px - 44px);;
    width: calc(100% - 120px);
    left: 120px;
    overflow: hidden;
    bottom: 49px;
    top: 44px;
  }
</style>
