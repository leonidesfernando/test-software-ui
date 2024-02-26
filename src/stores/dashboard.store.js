import { defineStore } from 'pinia'
import { useAlertStore } from '@/stores'
import { TOKEN } from '@/utils/Constants'
import axios from 'axios'

import {i18n} from '@/locale/i18n'

const baseUrl = `${import.meta.env.VITE_API_URL}/api/dashboard`


export const useDashboardStore = defineStore({
  id: 'dashboard',
  state: () => ({
      
      doughnutData: [],
      tableData: [],
      startDate: '',
      endDate: '',
    }),
    actions: {
      async doughnutChart() {
        try{
          const resp = await axios.get(
            `${baseUrl}/doughnutChart`,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
              },
              params: {
                'startDate': this.startDate,
                'endDate': this.endDate
              }
            }
          )
          
          if(resp.status == 200){
            const messageI18n = i18n.global.messages[i18n.global.locale]
            this.doughnutData = []
            this.doughnutData.push(['',''])
            for(let line of resp.data){
              let arrayLine = []
              arrayLine.push(messageI18n[line[0]])
              arrayLine.push(line[1])
              this.doughnutData.push(arrayLine)
            }            
          }else{
            this.doughnutData = []
          }
        }catch(error){
          const message = await error.response.data.message;
          const alertStore = useAlertStore()
          alertStore.error(message)
        }
    },//tableChart
      async tableChart() {
        try{
          const resp = await axios.get(
            `${baseUrl}/tableChart`,
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)
              },
              params: {
                'startDate': this.startDate,
                'endDate': this.endDate
              }
            }
          )
          
          if(resp.status == 200){

            const messageI18n = i18n.global.messages[i18n.global.locale]
            this.tableData = []
            this.tableData.push([messageI18n['category'],messageI18n['total']])
            for(let line of resp.data){
              let arrayLine = []
              arrayLine.push(messageI18n[line[0]])
              arrayLine.push(line[1])
              this.tableData.push(arrayLine)
            }
          }else{
            this.tableData = []
          }
        }catch(error){
          const message = await error.response.data.message;
          const alertStore = useAlertStore()
          alertStore.error(message)
        }
    }
  }
})
