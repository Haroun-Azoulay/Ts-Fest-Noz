import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-grid.min.css'
import './assets/css/bootstrap-reboot.min.css'
import './assets/css/animate.css'
import './assets/css/owl.carousel.css'
import './assets/css/owl.theme.css'
import './assets/css/owl.transitions.css'
import './assets/css/magnific-popup.css'
import './assets/css/jquery.countdown.css'
import './assets/css/mdb.min.css'
import './assets/css/style.css'
import './assets/css/de-dj.css'
import './assets/css/colors/scheme-02.css'
import './assets/css/coloring.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
