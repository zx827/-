// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//导入路由vue-router.js
import VueRouter from 'vue-router'

//模块化导入基础样式
import "./assets/css/reset.css"

//导入字体样式
import './assets/css/style.css'

//导入轮播插件
import VueSwiper from 'vue-awesome-swiper'

//导入各个组件
import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'
import Main from './components/main/Main.vue'
import WelcomeSwiper from './components/welcomeSwiper/WelcomeSwiper.vue'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueSwiper);

const router=new VueRouter({
  routes:[
    {path:'/',component:WelcomeSwiper},
    {
      path:'/main',component:Main,
      children:[
        {path:'goods',component:Goods},
        {path:'ratings',component:Ratings},
        {path:'seller',component:Seller},
        {path:'',redirect:'goods'}
      ]
    },

  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});
