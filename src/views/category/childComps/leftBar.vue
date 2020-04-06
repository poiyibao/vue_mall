<template>
    <div class="left-bar">
        <Scroll class="content" ref="scroll" :probeType="3">
            <ul class="item-list">
            <li v-for="(item , index) in leftBar"
                :key="index"
                class="nav-item"
                @click="itemClcik(index)"
                :class="{active:index === isActiveIndex }">
                {{item.title}}
            </li>
            </ul>
        </Scroll>
    </div>
</template>

<script>
    import Scroll from "components/common/scroll/Scroll";
    export default {
        name: "leftBar",
        props: {
            leftBar:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components: {
            Scroll,
        },
        data() {
            return {
                isActiveIndex: 0,
            }
        },
        methods: {
            itemClcik(index,) {
               // const maitKey =item.maitKey;
                this.isActiveIndex = index;
                this.$emit('barClick',index);
            }
        }
    }
</script>

<style scoped>
    .left-bar {
        width: 112px;
        height:100%;
    }
    .content {
    //height: 300px;
        overflow: hidden;
        //position: relative;
        height: 100%;
        right: 0;
        left: 0;
    }
    .item-list {
        list-style-type: none;
        padding: 0;
    }
    .nav-item {
        width: 112px;
        height: 50px;
        line-height:50px ;
        text-align: center;
        border-left: #F2F2F2 solid 8px;
        background-color:#F2F2F2;
    }
    .active {
        border-left: var(--color-tint) solid 8px;
        background-color: #fff;
    }

</style>