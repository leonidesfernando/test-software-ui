<script setup>
import { storeToRefs } from 'pinia'
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useEntryStore } from '@/stores'
import { i18n } from '@/locale/i18n'



function getMessage(key){
    return i18n.global.messages[localStorage.getItem('locale')][key]
}


const entryStore = useEntryStore()
const { entry } = storeToRefs(entryStore)
const { getEntryTypes } = storeToRefs(entryStore)
const { getCategories } = storeToRefs(entryStore)



const schema = Yup.object().shape({
    descricao: Yup.string().required(getMessage('description.required')),
    entryType: Yup.string().nonNullable().required('entry.type.required'),
    entryDate: Yup.string().required(getMessage('entry.date.required')),
    valor: Yup.number().required(getMessage('entry.amount.required')),
    category: Yup.string().required(getMessage('category.required'))
});




async function onSubmit() {
    await entryStore.add()
}

function cancel(){
    entryStore.cancel()
}


</script>

<template>
  <div class="container-fluid">
      <div class="card">
          <div class="card-header">
              <h4>{{ $t('entry.registration') }}</h4>
          </div>
          <div class="card-body">
              <div class="row">
                  <div class="col-12">
                    <Form @submit="onSubmit" :initial-values="entry" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                        <input type="hidden" name="id" :id="entry.id" :value="entry.id" />
                        <div class="row ">
                            <div class="col-5 mb-3 table-responsive form-check" >
                                <table style="width: 100%;">
                                    <tr>
                                      <th v-for="entryType in getEntryTypes" :key="entryType">
                                            <Field name="entryType" :id="entryType.key" type="radio" class="form-check-input" 
                                                v-model="entry.tipoLancamento"
                                                :value="entryType.key" :class="{ 'is-invalid': errors.entryType }" />
                                          <label class="form-check-label" :for="entryType.key">{{ entryType.value }}</label>
                                          <div class="invalid-feedback">{{ errors.entryType }}</div>
                                      </th>
                                    </tr>
                                </table>
                                
                            </div>
                          </div>
                          <div class="row">
                              <div class="col-4 mb-3">
                                  <div class="form-group">
                                      <label class="form-label">{{ $t('description') }}</label>
                                      <Field type="text" class="form-check-label form-control" id="descricao" name="descricao" 
                                          :class="{ 'is-invalid': errors.descricao }" v-model="entry.descricao"
                                          autofocus="autofocus" :placeholder="$t('provide.description')" maxlength="128"/>
                                      <div class="invalid-feedback">{{ errors.descricao }}</div>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-2 mb-3 form-group" >
                                  <label class="form-label">{{ $t('date') }}</label>
                                  <Field name="entryDate" type="date" :class="{ 'is-invalid': errors.entryDate }" 

                                    
                                    v-model="entry.dataLancamento" class="form-control"/>
                                  <div class="invalid-feedback">{{ errors.entryDate }}</div>
                              </div>
                          </div>
                          <div class="row">
                              <div class=" col-3 mb-3 form-group" >
                                  <label class="form-label">{{$t('amount')}}</label>

                                    <input  name="valor" id="valor" v-model="entry.valor" 
                                        class="form-label form-control"
                                        :class="{ 'is-invalid': errors.valor }"
                                    />
                                  <div id="amountErrorMessage" class="invalid-feedback">{{ errors.valor }}</div>
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-3 mb-3 form-group" >
                                  <label class="form-label">{{ $t('category') }}</label>
                                  <Field class="form-select" as="select" name="category" id="categoria" v-model="entry.categoria"
                                    :class="{ 'is-invalid': errors.category }" >
                                        <option :label="$t('select')" value=""></option>
                                        <option v-for="category in getCategories" :value="category.key" :key="category">{{ category.value }}</option>
                                  </Field>
                                  <div class="invalid-feedback">{{ errors.category }}</div>
                              </div>
                          </div>
                        <div class="row">
                            <div class="col-2 mb-3">
                                <button id="btnSalvar" class="btn btn-primary" :disabled="isSubmitting">
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                {{ $t('save') }}
                                </button>
                            </div>

                            <div class="col-2 mb-3">
                                <a id="cancelar" class="btn btn-light" @click="cancel()" >{{ $t('cancel') }}</a>
                            </div>
                        </div>
                    </Form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
