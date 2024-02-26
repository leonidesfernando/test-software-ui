import { createRouter, createWebHistory } from "vue-router"
import { Login, Entries, Home, Entry, EntryEdit, Dashboard } from '@/views'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/entries',
      component: Entries
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/entry',
      component: Entry
    },
    {
      path: '/entry/:id',
      component: EntryEdit
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})