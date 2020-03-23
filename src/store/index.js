import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
//import getter from "./getter ";
import actions from "./actions";

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})
export default store