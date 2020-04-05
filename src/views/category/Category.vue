<template>
  <div class="category">
    <nav-bar class="home-nav">
      <div slot="center">分类</div>
    </nav-bar>
    <Scroll class="content" ref="scroll" :probeType="3">
      <left-bar :left-bar="categoryList"></left-bar>
      <right-content></right-content>
    </Scroll>
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
           console.log(this.subcategoryList);
          this.subcategoryList[index] = res.data.list;
        });
      },
      },
  }
</script>

<style scoped>

</style>
