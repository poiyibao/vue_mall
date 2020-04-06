<template>
    <div class="right-content">
        <Scroll class="content" ref="scroll" :probeType="3">
            <div class="goods-item" v-for="(item,index) in itemList" :key="index">
                <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
                </a>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    export default {
        name: "rightContent",
        props: {
            itemList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            Scroll
        }

    }
</script>
<style scoped>
    .right-content {
        width: calc(100% - 112px);
        height: 100%;
    }
    .content {
        overflow: hidden;
        position: relative;
        bottom: 49px;
        right: 0;
        left: 0;
    }
</style>