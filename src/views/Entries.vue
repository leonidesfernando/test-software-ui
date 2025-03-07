<script setup>

import { storeToRefs } from 'pinia'
import { useEntriesStore } from '@/stores'
import { reactive, onMounted } from 'vue'
import { Modal } from "bootstrap"

const entriesStore = useEntriesStore()
const { entries } = storeToRefs(entriesStore)
const {rows} = storeToRefs(entriesStore)
const {entryData} = storeToRefs(entriesStore)

const searchForm = { 'searchItem': '', 'searchOnlyCurrentMonth': true }

const modalState = reactive({
  modal: null
})

onMounted(() => {
  modalState.modal = new Modal('#modalRemoveAll', {})
  
  document.getElementById('searchOnlyCurrentMonth').checked = true
  document.getElementById('itemBusca').focus()
  reload()
})

const onPressEnter = () => {
  search()
};



async function newEntry(){
  await entriesStore.newEntry()
}

async function removeAll() {
  await entriesStore.removeAll()
  modalState.modal.hide()
  await reload()
}

async function sendDelete(id){
  displayElementById(`loadindDelete${id}`)
  await entriesStore.remove(id)
  await reload()
}

async function reload(){
  displayElementById('loadingReload')
  searchForm.itemBusca = ''
  searchForm.searchOnlyCurrentMonth = document.getElementById('searchOnlyCurrentMonth').checked
  await entriesStore.search(searchForm)
  hideElementById('loadingReload')
}

async function search(){

  const input = document.getElementById('itemBusca')
  if(input.value.length < 3){
    input.focus()
    displayElementById('searchTextRequired')
    return;
  }
  
  hideElementById('searchTextRequired')
  displayElementById('loadingSearch')
  searchForm.searchItem = input.value
  searchForm.searchOnlyCurrentMonth = document.getElementById('searchOnlyCurrentMonth').checked
  await entriesStore.search(searchForm)
  hideElementById('loadingSearch')
}

async function searchOnPagination(page) {
  
  searchForm.page = page
  const input = document.getElementById('itemBusca')
  
  hideElementById('searchTextRequired')
  displayElementById('loadingSearch')
  searchForm.searchItem = input.value
  searchForm.searchOnlyCurrentMonth = document.getElementById('searchOnlyCurrentMonth').checked
  await entriesStore.search(searchForm)
  hideElementById('loadingSearch')
}

function displayElementById(id){
  const loading = document.getElementById(id)
  loading.style.display = 'block'
}

function hideElementById(id){
  const loading = document.getElementById(id)
  loading.style.display = 'none'
}


</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4>{{ $t('entries') }}</h4>
          </div>
          <div class="card-body">
            <div class="row" style="border: 1px solid lightgray;border-radius: 1%;padding-top: .40%;">
              <div class="col-1 mb-2">
                <a class="btn btn-success" id="novoLancamento" @:click="newEntry()" >{{ $t('new') }}</a>
              </div>
              <div class="col-3">
                  <input type="text" @keyup.enter="onPressEnter" :placeholder="$t('search.description.category.type')" id="itemBusca" class="form-control">
                  <div id="searchTextRequired" class="text-danger" style="display: none;">
                    {{$t('search.text.must.informed')}}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                    </svg>
                  </div>
              </div>
              <div class="col-3">
                  <input type="checkbox" id="searchOnlyCurrentMonth">
                  <label for="searchOnlyCurrentMonth" style="">{{ $t('search.only.current.month') }}</label>
              </div>
              <div class="col-1">
                <button class="btn btn-info" id="bth-search" @click="search()">
                  {{ $t('search') }}
                  <span id="loadingSearch" style="display: none;" class="spinner-border spinner-border-sm mr-1"></span>
                </button> 
              </div>
              <div class=" col-1">
                  <button class="btn btn-success" id="btnReload" @click="reload()" >
                    {{ $t('reload') }}
                    <span id="loadingReload" style="display: none;" class="spinner-border spinner-border-sm mr-1"></span>
                  </button>
              </div>
              <div class="col-1">

                <router-link :to="`/dashboard`" class="btn btn-primary" title="Dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                  </svg>                  
                </router-link>
              </div>
              <div class="col-1"></div>
              <div class="col-1 mb-2">
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" id="btnRemoveAll" data-bs-target="#modalRemoveAll">
                    {{ $t('btn.remove.all') }}
                </button>
              </div>
            </div>
            <div class="row">
              <template v-if="entries.length">
                <div class="table-responsive" id="tabelaLancamentos">
                  <table class="table table-striped">
                    <thead>
                      <!-- tr>
                        <th colspan="6">{{ $t('total.records') }} : {{ entryData.totalRecords }}</th>
                      </tr -->
                      <tr>
                        <th v-for="row in rows" :key="row"><strong>{{ row }}</strong></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for="entry in entries" :key="entry.id">
                          <td>{{ entry.description }}</td>
                          <td>{{ $t(entry.category) }}</td>
                          <td>{{ $t(entry.entryType) }}</td>
                          <td>{{ entry.entryDate }}</td>
                          <td>{{ entry.amount }}</td>
                          <td>
                            <router-link :to="`/entry/${entry.id}`" class="btn btn-sm btn-primary">{{ $t('edit') }}</router-link>
                            <a :id="`delete${entry.id}`" style="margin-left: 5px;" class="btn btn-sm btn-warning" @click="sendDelete(`${entry.id}`)">{{ $t('remove') }}
                              <span :id="`loadindDelete${entry.id}`" style="display: none;" class="spinner-border spinner-border-sm mr-1"></span>
                            </a>
                          </td>
                        </tr>
                    </tbody>
                    <tfoot>
                      <tr class="spend">
                        <th>{{$t('total.spend')}}</th>
                        <th colspan="5">{{entryData.totalSpend}}</th>
                      </tr>
                      <tr class="earnings">
                        <th>{{ $t('total.earnings') }}</th>
                        <th colspan="5">{{ entryData.totalEarnings }}</th>
                      </tr>
                      <tr class="spend">
                        <th>{{ $t('grand.total.expenses') }}</th>
                        <th colspan="5">{{ entryData.grandTotalExpenses }}</th>
                      </tr>
                      <tr class="winnings">
                        <th>{{ $t('grand.total.winnings') }}</th>
                        <th colspan="5">{{ entryData.grandTotalWinnings }}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div class="row">
                  <nav>
                    <ul class="pagination position-relative overflow-auto">
                      <li v-for="p in entryData.pages" :key="p" class="page-item">
                        <a class="page-link" href="#" @click="searchOnPagination(`${p}`)">{{ p }}</a>
                      </li>
                    </ul>
                  </nav>
                </div>

              </template>
              <template v-else>
                <table id="tabelaLancamentos" class="table table-sm table-striped table-hover table-bordered ui-empty-table">
                  <thead>
                    <tr>
                      <th style="text-align: center;">{{ $t('msg.empty.table') }}</th>
                    </tr>
                  </thead>
                </table>
              </template>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modalRemoveAll" tabindex="-1" aria-labelledby="modalRemoveAllLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modalRemoveAllLabel">{{ $t('remove.all') }}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="$t('cancel')"></button>
              </div>
              <div class="modal-body">
                  {{ $t('sure.remove.all.entries') }}
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" id="btnCancelRemoveAll" data-bs-dismiss="modal">{{ $t('cancel') }}</button>
                  <button type="button" class="btn btn-danger" id="btnYesRemoveAll"  @click="removeAll()">{{ $t('yes.sure') }}</button>
              </div>
          </div>
      </div>
  </div>

</template>