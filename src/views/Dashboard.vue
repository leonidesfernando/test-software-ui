<script setup>

import { useDashboardStore, useAlertStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import {Field } from 'vee-validate';

import { GChart } from 'vue-google-charts'

import {validatePeriod} from '@/utils/Utils'

//
const typeTable = 'Table';

const optionsTable = {
  title: 'Company Performance',
  curveType: 'function',
  legend: { position: 'bottom' },
  
  width: 800,
  height: 600,
};
//
const type = 'PieChart';


const dashboardStore = useDashboardStore()
const { doughnutData } = storeToRefs(dashboardStore)
const { tableData } = storeToRefs(dashboardStore)
const { startDate } = storeToRefs(dashboardStore)
const { endDate } = storeToRefs(dashboardStore)

const options = {
  title: '',
  pieHole: 0.4,
  width: 800,
  height: 600
}

function initializeFilter(){
  const date = new Date();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  firstDay.setHours(23, 59, 59, 999);

  dashboardStore.startDate = firstDay.toISOString().split('T')[0];
  dashboardStore.endDate = lastDay.toISOString().split('T')[0];
}

initializeFilter()
async function load(){
  
  await dashboardStore.doughnutChart()
  await dashboardStore.tableChart()
}


async function search(){
  try{
    validatePeriod(dashboardStore.startDate, dashboardStore.endDate)
    await load()
  }catch(err){
    const alertStore = useAlertStore()
    alertStore.error(`Invalid search: ${err.message}`)
  }
  
}


load()

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>{{$t('dashboard')}}</h4>
          </div>
          <div class="card-body">
            
            <div class="row" style="border: 1px solid lightgray;border-radius: 1%;padding-top: .40%;padding-bottom: .4%;margin-bottom: .5%;">
              <div class="col-1">
                <label class="form-label">{{ $t('start.date') }}</label>
                <Field name="startDate" type="date" 
                  v-model="startDate" class="form-control"/>
              </div>
              <div class="col-1">
                <label class="form-label">{{ $t('end.date') }}</label>
                <Field name="endDate" type="date" 
                  v-model="endDate" class="form-control"/>
              </div>
              <div class="col-1">
                  <button class="btn btn-info" id="bth-search" @click="search()" style="margin-top: 30px;">
                    {{ $t('search') }}
                    <span id="loadingSearch" style="display: none;" class="spinner-border spinner-border-sm mr-1"></span>
                  </button> 
              </div>
              <div class="col-1">
                <router-link :to="`/entries`" class="btn btn-primary" :title="$t('entries')" style="margin-top: 30px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                  </svg>
                </router-link>
              </div>              

            </div>
            

            <div class="row">
              <div class="col-6">
                <GChart
                    id="tableChart"
                    :type="typeTable"
                    :data="tableData"
                    :options="optionsTable"
                  />
              </div>
              <div class="col-6">
                  <GChart
                      id="doughnutChart"
                      :type="type"
                      :data="doughnutData"
                      :options="options"
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
