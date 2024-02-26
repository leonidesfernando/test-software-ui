import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores';
import { TOKEN } from '@/utils/Constants';
import axios from "axios"

const baseUrl = `${import.meta.env.VITE_API_URL}/api/auth`;
const checkUrl = `${import.meta.env.VITE_API_URL}/api/check`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
      // initialize state from local storage to enable user to stay logged in
      token: localStorage.getItem(TOKEN)
  }),
    actions: {
      getToken(){
        return this.token
      },
      async login(username, password) {
        const alertStore = useAlertStore()
        alertStore.clear()
        try{
          const body = {'username': username, 'password': password}
          const resp = await axios.post(`${baseUrl}/signin`, body)
          if(resp.status == 200){
            this.token = await resp.data.token
            localStorage.setItem(TOKEN, this.token)
            // redirect to previous url or default to home page
            this.token = localStorage.getItem(TOKEN)
            router.push('/');
          }else{
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')            
          }
        }catch(error){
          const message = await error.response.data.message;
          alertStore.error(message)
        }
    },
    async isLoggedIn(){
      return await localStorage.getItem(TOKEN) != null
    },

    async logout(){
      this.token = null;
      localStorage.removeItem(TOKEN);
      await router.push('/login');
    },
    async home() {
      try{
        const resp = await axios.get(
          `${checkUrl}/profile`, 
          {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          }
        )     
        if(resp.status == 200){
          router.push('/entries')
        }else{
          router.push('/login')
        }
        
      }catch(error){
        console.log(error)
        router.push('/login')
      }
    }
  }
})