import { createApp } from 'vue'
import './Global'
import App from './App.vue'
import router from './router'
import store from './store'
// import ArticleHtml from "@/components/MainPage/article.vue";


// Vue.use(VueAxios, axios)
const app = createApp(App)
app.use(store).use(router).mount('#app')
// app.component('article-html', ArticleHtml)