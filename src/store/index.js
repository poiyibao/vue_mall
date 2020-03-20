import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state,payload) {
      let oldProduct = null;
      for(let i=0;i<state.cartList.length;i++) {
        if(state.cartList[i].iid === payload.iid) {
          oldProduct = state.cartList[i];
        }
      }
      if(oldProduct) {
        oldProduct.count += 1;
      }else {
        payload.count = 1;
        state.cartList.push(payload);
      }
      //
    }
  },
  actions: {
  },
  modules: {
  }
})
