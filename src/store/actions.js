export  default {
    addCart(context, payload) {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldProduct) {
            context.commit('addCounter', oldProduct)
        } else {
            payload.count = 1;
            context.commit('addToCart',payload)
        }
    }
}
/*
export default  {
    addCart(context,payload) {
        let oldProduct = null;
        for(let i=0;i<context.state.cartList.length;i++) {
            if(context.state.cartList[i].iid === payload.iid) {
                oldProduct = context.state.cartList[i];
            }
        }
        if(oldProduct) {
            context.commit('addCounter', oldProduct)
        }else {
            payload.count = 1;
            context.commit('addToCart' , payload)
        }
    }
}
 */