<script setup>
import { useAuthStore } from '@/stores'
import { useHomeStore } from '@/stores'
import {Alert} from '@/components'

const homeStore = useHomeStore()

const authStore = useAuthStore()

homeStore.home()

function setLocaleEn(ctx){
  ctx.$i18n.locale = 'EN'
  localStorage.setItem('locale', 'EN')
}

function setLocaleBR(ctx) {
  ctx.$i18n.locale = 'BR'
  localStorage.setItem('locale', 'BR')
}
</script>

<template>
  <nav v-show="authStore.token" class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #cbdee9b5;margin-bottom: 2px;">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
              <router-link to="/" id="homeLink" class="navbar-brand">{{ $t('home') }}</router-link>
          </li>
        </ul>
      </div>
      <Alert />
      <div class="navbar-text" style="padding-right: 20px;">
        <div style="display: flex;">
          
          <input type="radio" name="langOptions" class="form-check-input"  @click="setLocaleBR(this)"
            style="background-image: url('./src/assets/brazil-circle.png'); height: 28px; width: 28px; " id="BR"
            autocomplete="off"/>
                
          <input type="radio" name="langOptions" class="form-check-input" @click="setLocaleEn(this)"
            style="background-image: url('./src/assets/usa-circle.png'); height: 28px; width: 28px;margin-left: 5px;" id="EN" autocomplete="off" checked/>

          <span style="padding-left: 15px;">
            <button id="logout" @click="authStore.logout()" class="btn btn-link nav-item nav-link">{{ $t('logout') }}</button>
          </span>
        </div>
      </div>
    </div>





    <!--div class="navbar-nav">
      <router-link to="/" class="nav-item nav-link">Home</router-link>
      
      <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
    </div -->
  </nav>
</template>