<template>
    <div class="left-bar">
        <ul>
        <li v-for="(item , index) in leftBar" :key="index" class="nav-item">
            <button>{{item.title}}</button>
        </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "leftBar",
        props: {
            leftBar:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .left-bar {
        width: 120px;
        background-color: #5ea732;
    }
</style>