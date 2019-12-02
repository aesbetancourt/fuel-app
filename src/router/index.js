import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import { IonicVueRouter } from '@ionic/vue';
Vue.use(IonicVueRouter);


export default new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
});
