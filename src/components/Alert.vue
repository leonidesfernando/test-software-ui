<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
    <div v-if="alert" class="container-fluid">
        <div class="">
            <div class="alert alert-dismissable" :class="alert.type">
                <button @click="alertStore.clear()" class="btn btn-link close">&times;</button>
                <span style="font-weight: bold; font-style: italic;">
                    {{ alert.message}}
                </span>
                
            </div>
        </div>
    </div>
</template>