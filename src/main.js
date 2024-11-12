import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import HomeView from './routes/Home.vue'
import App from "./App.vue"
// import GithubProjects from './routes/GithubProjects.vue'


const routes = [
  { path: '/', component: HomeView },
  // { path: '/about', component: GithubProjects },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
