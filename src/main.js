import Vue from 'vue'
import App from './App.vue'
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
Vue.config.productionTip = false

import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(ViewUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
