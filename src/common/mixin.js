
import {debounce} from "./utils";
import backTop from "components/content/backtop/backTop";
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh:null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh,100);
        this.itemImgListener = () =>{
            this.newRefresh()
        };
        this.$bus.$on('itemImgeLoad',this.itemImgListener);
        //console.log('---');
    }
};
export const backTopMixin = {
    components : {
        backTop
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scroll.scrollTo(0,0,900)
        },
    }
}