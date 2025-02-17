import Vue from 'vue';
import App from './App.vue';
import router from './router';


import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
Vue.use(Ionic);
// Vue.config.productionTip = false;
// Vue.config.ignoredElements = [/^ion-/];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
