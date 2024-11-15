import { createWebHistory, createRouter } from 'vue-router'
import HomeView from './routes/Home.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:pathMatch(.*)*', component: HomeView }
  ]
  
export const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  