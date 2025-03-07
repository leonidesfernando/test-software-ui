<script setup>
import { Form, Field } from 'vee-validate';
import {Alert} from '@/components'
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';
import EN from '@/locale/en.json'


const schema = Yup.object().shape({
  username: Yup.string().required(EN['msg.username.required']),
  password: Yup.string().required(EN['msg.password.required'])
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, password } = values;
  await authStore.login(username, password);
}


</script>

<template>
  <Alert/>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="card m-3">
          <div class="card-header">
            <h4>{{ $t('login') }}</h4>
          </div>
          
          <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
              <div class="form-group">
                <label>{{ $t('username') }}</label>
                <Field name="username" id="username" autofocus  type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{ errors.username }}</div>
              </div>
              <div class="form-group">
                <label>{{ $t('password') }}</label>
                <Field name="password" id="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{ errors.password }}</div>
              </div>
              <div class="form-group" style="padding-top: 5px;">
                <button class="btn btn-primary" :disabled="isSubmitting">
                  <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                  {{$t('login')}}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>

</template>
