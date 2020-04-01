import toast from './toast'

const obj = {}

obj.install = function (Vue) {
    //创建组件构造器
    const toastContrustor = Vue.extend(toast)
    //new的方式，根据组件构造器，创建一个组件对象
    const  new_toast = new toastContrustor;
    //将组件对象手动挂载
    new_toast.$mount(document.createElement('div'));
    //toast.$el对应的就是上面的div
    document.body.appendChild(new_toast.$el)

    Vue.prototype.$toast = new_toast;
}

export default obj