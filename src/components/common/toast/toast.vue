<template>
    <div class="toast" v-show="isshow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "toast",
        props: {

        },
        data() {
            return {
               message: '',
               isshow: false
            }
        },
        methods: {
            show(message,duration) {
                this.isshow = true;
                this.message = message

                setTimeout(() =>{
                    this.isshow = false;
                    this.message = '';
                },duration)
            }
        }
    }
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.6);
    color: #f2f5f8;
    padding: 10px;
    z-index: 9999;
}
</style>