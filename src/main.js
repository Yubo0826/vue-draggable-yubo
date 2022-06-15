import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'

const emitter = mitt()
const app = createApp(App)
app.config.globalProperties.emitter = emitter
app.mount('#app')
