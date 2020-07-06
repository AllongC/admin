import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import PostList from '@/views/PostList'
import PublishPost from '@/views/PublishPost'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      name: '主页'
    },
    children: [
      {
        path: 'post',
        name: 'PostListPage',
        component: PostList,
        meta: {
          name: '文章列表'
        },
      },
      {
        path: 'publish',
        name: 'PublishPostPage',
        component: PublishPost,
        meta: {
          name: '文章发布',
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: Login
  },

]

const router = new VueRouter({
  routes
})

export default router
