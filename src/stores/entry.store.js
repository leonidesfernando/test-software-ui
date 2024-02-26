import { defineStore } from 'pinia'

import { router } from '@/router'
import { useAlertStore } from '@/stores'
import { TOKEN } from '@/utils/Constants'
import axios from 'axios'
import {i18n} from '@/locale/i18n'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/entries`


export const useEntryStore = defineStore({
  id: 'entry',
  state: () => ({
      token: localStorage.getItem(TOKEN),
      entry: {"id":"",
              "categoria": "",
              "valor": 0,
              "descricao": "",
              "dataLancamento": "",
              "tipoLancamento": "EXPENSE"
            }
    }),
    getters:{
      getEntryTypes: () => {
        
        const messages = i18n.global.messages[i18n.global.locale]
        const entryTypesKey = ["income","expense","transf"]
        const entryTypes = []
        entryTypesKey.forEach(element => {
          entryTypes.push({'key': element.toUpperCase(), 'value': messages[element]})
        });
        return entryTypes
      },
      
      getCategories: () => {
        const messages = i18n.global.messages[i18n.global.locale]
        const keys = ["food","wage","leisure","phone.internet","loan","investiments","car","clothing","other"]
        const categories = []
        keys.forEach(element => {
          categories.push({'key': element.toUpperCase().replaceAll('.','_'), 'value': messages[element]})
        });
        return categories
      }
    },
    actions: {
      init(){
        this.entry = {"id":"",
                "categoria": "",
                "valor": 0,
                "descricao": "",
                "dataLancamento": "",
                "tipoLancamento": "EXPENSE"
              }
      },
      async add() {
        const alertStore = useAlertStore()
        try{
          const resp = await axios.post(
            `${baseUrl}/add`, 
            this.entry,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
              }
            }
          )
          
          if(resp.status == 200){
            const messageKey = await resp.data.message
            const messages = i18n.global.messages[i18n.global.locale]
            alertStore.success(messages[messageKey])
            this.init()
            router.push('/entries')
          }else if(resp.status == 400){
            alertStore.error(resp.message)
          }else{
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')
          }
        }catch(error){
          const message = await error.response.data.message;
          //const alertStore = useAlertStore()
          alertStore.error(message)
        }
    },
    async update() {
        const alertStore = useAlertStore()
        try{
          const resp = await axios.put(
            `${baseUrl}/update`, 
            this.entry,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
              }
            }
          )
          
          if(resp.status == 200){
            const messageKey = await resp.data.message
            const messages = i18n.global.messages[i18n.global.locale]
            alertStore.success(messages[messageKey])
            this.init()
            router.push('/entries')
          }else if(resp.status == 400){
            alertStore.error(resp.message)
          }else{
            alertStore.error('An unexpected error occurred. Try again if the error persists, contact your administrator.')
          }
        }catch(error){
          console.log(error)
          const message = await error.response.data.message;
          alertStore.error(message)
        }
    },
    async load(id){

      const resp = await axios.get(
        `${baseUrl}/get/${id}`, 
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
          }
        }
      )      
      if(resp.status == 200){
        this.entry = resp.data

        this.entry.tipoLancamento = this.entry.tipoLancamento.toUpperCase()
        this.entry.categoria = this.entry.categoria.toUpperCase()
        const arrayDate = this.entry.dataLancamento.split('/')

        this.entry.dataLancamento = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
        this.entry.valor = new Intl.NumberFormat('pt', 
              { maximumFractionDigits: 2, minimumFractionDigits:2})
            .format(this.entry.valor)
      }

    },
    cancel(){
      this.init()
      router.push('/entries')
    }
  }
})
