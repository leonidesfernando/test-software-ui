import { defineStore } from 'pinia'

import { router } from '@/router'
import { useAlertStore } from '@/stores'
import { useAuthStore } from '@/stores'
import { TOKEN } from '@/utils/Constants'
import axios from 'axios'
import {i18n} from '@/locale/i18n'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/entries`

export const useEntriesStore = defineStore({
  id: 'entries',
  state: () => ({
      token: localStorage.getItem(TOKEN),
      entryData: {},
      entries: {}
    }),
    getters:{
      rows: () =>{
        return i18n.global.messages[i18n.global.locale]['entries.rows'].split(',')
      }
    },
    actions: {
      async search(searchForm) {
        try{
          const resp = await axios.post(
            `${baseUrl}/search`, 
            searchForm,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
              }
            }
          )
          if(resp.status == 200){
            
            this.entries = resp.data.lancamentos
            const {lancamentos, ... myData} = resp.data
            this.entryData = myData
          }else{
            const alertStore = useAlertStore()
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')            
          }
        }catch(error){
          if(error.response.status == 401){
            const authStore = useAuthStore()
            await authStore.logout()
          }else{
            const message = await error.response.data.message;
            const alertStore = useAlertStore()
            alertStore.error(message)
          }
        }
    },
    async removeAll(){
      const alertStore = useAlertStore()
      try{
        const resp = await axios.delete(
          `${baseUrl}/removeAll`, 
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
            }
          }
        )
        if(resp.status == 200){
          const messageKey = await resp.data.message  
          alertStore.success(i18n.global.messages[i18n.global.locale][messageKey])
        }
      }catch(error){
        alertStore.error(error)
      }

    },
    async remove(id){
      const alertStore = useAlertStore()
      try{
        const resp = await axios.delete(
            `${baseUrl}/remove/${id}`, 
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
            }
          }
        )
        if(resp.status == 200){
          const messageKey = await resp.data.message  
          alertStore.success(i18n.global.messages[i18n.global.locale][messageKey])
        }
      }catch(error){
        alertStore.error(error)
      }
    },
    async newEntry(){
      router.push('/entry')
    },
    async load(id){
      router.push('/entry/'+id)
    }
  }
})
