<script setup>

import { storeToRefs } from 'pinia'
import { useFooterStore } from '@/stores'


const footerStore = useFooterStore()

const { env } = storeToRefs(footerStore)
const { dbName } = storeToRefs(footerStore)
const { dbVendor } = storeToRefs(footerStore)


async function loadFooterData(){
    footerStore.getEnv()
    footerStore.getDbName()
    footerStore.getDbVendor()
}

loadFooterData()
</script>

<template>
      <hr/>
      <p class="text-center text-muted" data-qa="footer-title">&copy; 2021 {{ $t('leonides.fernando.lab') }}</p>
      <div class="text-center text-muted">
          <h6 style="font-size: 0.71rem">
            <small v-html="$t('running.env', {environment: env})"></small>
            <small v-html="$t('database.vendor', {databaseVendor: dbVendor})"></small>
            <small v-html="$t('database.env', {databaseVendor: dbVendor},{databaseName: dbName})"></small>
          </h6>
      </div>
</template>
