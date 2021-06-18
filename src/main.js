import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import Vuetify from 'vuetify'
export default new Vuetify()



Vue.use(Vuetify)
Vue.use(vueCustomElement)
App.store = store
App.router = router
Vue.customElement('vue-widget', App)


