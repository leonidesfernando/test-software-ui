import { defineStore } from 'pinia';
import { router } from '@/router';
import { useAuthStore } from '@/stores';

export const useHomeStore = defineStore({
  id: 'home',
  state: () => ({
        returnUrl: null
  }),
    actions: {
      async home() {
        
        const userStore = useAuthStore()
        const logged = await userStore.isLoggedIn()
        if(logged === true){
          router.push('/entries')
        }else{
          router.push('/login')
        }
    }
  }
})
