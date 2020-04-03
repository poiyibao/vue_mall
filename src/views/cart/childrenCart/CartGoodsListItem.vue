<template>
  <div class="list-item">
    <div class="card">
      <check-button
              slot="default"
              :is-checked="listItem.checked"
              @click.native="checkClick"
              class="left"
      />
      <div class="img">
        <img v-lazy="listItem.image" alt="">
      </div>
      <div class="content">
        <div class="info">
          <div class="title" @click="titleClick">{{listItem.title}}</div>
          <div class="style">{{listItem.desc}}</div>
        </div>
        <div class="info-bottom">
          <div class="price">￥{{listItem.price}}</div>
          <div class="count">
            <button @click="reduceBClick" class="reduce">-</button>
            <span>{{listItem.count}}</span>
            <button class="add"  @click="addBClick">+</button>
          </div>
        </div>
      </div>
    </div>
      <div class="left cover" @click="titleClick"></div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartGoodsListItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    //选中按钮点击事件
    checkClick() {
      this.listItem.checked = !this.listItem.checked;
    },
    //删除按钮点击事件
    /*
    deleteClick() {
      this.$store.dispatch("deleteCart", this.listItem);
    },
     */
    //商品 减 按钮点击
    reduceBClick() {
      if (this.listItem.count === 1) return;
      this.$store.commit("reduceGoods", this.listItem);
    },
    //商品 加 按钮点击
    addBClick() {
      if (this.listItem.count === 5) {
        this.$toast.show("已是商品最大数量", 1000);
      } else {
        this.$store.commit("addGoods", this.listItem);
      }
    },
    titleClick() {
      this.$router.push("/detail/" + this.listItem.iid);
    }
  }
};
</script>
<style scoped>
  .list-item {
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 10px auto 0;
    width: calc(100% - 10px);
    box-shadow:2px 0 1px  #E6E6E6;
  }
  .card {
    display: flex;
    margin: 5px 0;
    align-items: center;
  }
  .left {
    margin:0 20px 0 10px;
  }
  .img {
    width:20%;
    height: 105px;
  }
  .img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .content {
    width: 50%;
    margin-left: 20px;
    //text-overflow: ellipsis;
  }
.title {
  font-size: 14px;
  font-weight: bolder;
  width: 100%;
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 150%;
}
  .price {
    color: rgb(255, 68, 0);;
  }
  .count {
    position: relative;
    width: 100px;
    right: calc(100px - 100%);
  }
  .count span {
    margin: 0 10px;
  }
</style>