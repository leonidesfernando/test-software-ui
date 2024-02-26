import { createI18n } from 'vue-i18n'

import EN from './en.json'
import BR from './ptbr.json'

//TODO: https://www.iban.com/currency-codes


export const i18n = createI18n({
  locale: 'EN',
  formatFallbackMessages: true,
  messages: {
    EN: EN,
    BR: BR
  }
})

