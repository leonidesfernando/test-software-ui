import { defineStore } from 'pinia';

const timeout = 4000

export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
            setTimeout(() => {
                    this.alert = null;
                }, timeout);
        },
        error(message) {
            this.alert = { message, type: 'alert-danger' };
            setTimeout(() => {
                    this.alert = null;
                }, timeout);
        },
        clear() {
            this.alert = null;
        }
    }
});
