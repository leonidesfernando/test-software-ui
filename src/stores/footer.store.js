import { defineStore } from 'pinia';

import { useAlertStore } from '@/stores';
import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_API_URL}/api/footer`;

export const useFooterStore = defineStore({
  id: 'footer',
  state: () => ({
      env: '',
      dbName: ''
    }),
    getters:{
      currentLocale: () =>{
        return '';
      }
    },
    actions: {
      async getEnv() {
        try{
          const resp = await axios.get(
            `${baseUrl}/env`)
          if(resp.status == 200){
            this.env = resp.data
          }else{
            const alertStore = useAlertStore()
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')            
          }
        }catch(error){
          const message = await error.response.data.message;
          const alertStore = useAlertStore()
          alertStore.error(message)
        }
    },
      async getDbName() {
        try{
          const resp = await axios.get(`${baseUrl}/dbName`)
          if(resp.status == 200){
            this.dbName = resp.data
          }else{
            const alertStore = useAlertStore()
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')            
          }
        }catch(error){
          const message = await error.response.data.message;
          const alertStore = useAlertStore()
          alertStore.error(message)
        }
    }
  }
})
