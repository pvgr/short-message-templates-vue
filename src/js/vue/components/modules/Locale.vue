<template>
  <multiselect
    class="select-locale"
    ref="selectLocale"
    v-model="value"
    :options="options"
    :allow-empty="false"
    :custom-label="showLanguage"
    :searchable="false"
    :showLabels="false"
    :label="label"
    :track-by="code"
    @input="onInput"
  ></multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    components: { Multiselect },

    data () {
      return {
        options: [
          { code: 'ar', label: 'العربية' },
          { code: 'be', label: 'Беларуская' },
          { code: 'bg', label: 'български език' },
          { code: 'bn', label: 'বাংলা' },
          { code: 'ca', label: 'Català' },
          { code: 'cs', label: 'Český Jazyk' },
          { code: 'da', label: 'Dansk' },
          { code: 'de', label: 'Deutsch' },
          { code: 'el', label: 'Ελληνικά' },
          { code: 'en', label: 'English' },
          { code: 'en-Au', label: 'English (Australian)' },
          { code: 'en-GB', label: 'English (Great Britain)' },
          { code: 'es', label: 'Español' },
          { code: 'eu', label: 'Euskara' },
          { code: 'fa', label: 'Farsi' },
          { code: 'fi', label: 'Suomi' },
          { code: 'fil', label: 'Wikang Filipino' },
          { code: 'fr', label: 'Français' },
          { code: 'gl', label: 'Galego' },
          { code: 'gu', label: 'ગુજરાતી' },
          { code: 'hi', label: 'हिन्दी' },
          { code: 'hr', label: 'Hrvatski' },
          { code: 'hu', label: 'Magyar' },
          { code: 'id', label: 'Bahasa Indonesia' },
          { code: 'it', label: 'Italiano' },
          { code: 'iw', label: 'עברית‬' },
          { code: 'ja', label: '日本語' },
          { code: 'kk', label: 'Қазақ Tілі' },
          { code: 'kn', label: 'ಕನ್ನಡ' },
          { code: 'ko', label: '조선말' },
          { code: 'ky', label: 'Kyrgyz' },
          { code: 'lt', label: 'Lietuvių' },
          { code: 'lv', label: 'Latviešu' },
          { code: 'mk', label: 'Mакедонски' },
          { code: 'ml', label: 'മലയാളം' },
          { code: 'mr', label: 'मराठी' },
          { code: 'my', label: 'မြန်မာစာ' },
          { code: 'nl', label: 'Nederlands' },
          { code: 'no', label: 'Norsk' },
          { code: 'pa', label: 'पंजाबी' },
          { code: 'pl', label: 'Język polski' },
          { code: 'pt', label: 'Português' },
          { code: 'pt-BR', label: 'Português (Brazil)' },
          { code: 'pt-PT', label: 'Português (Portugal)' },
          { code: 'ro', label: 'Română' },
          { code: 'ru', label: 'Русский' },
          { code: 'sk', label: 'Slovenčina' },
          { code: 'sl', label: 'Slovenian' },
          { code: 'sq', label: 'Shqip' },
          { code: 'sr', label: 'Српски' },
          { code: 'sv', label: 'Svenska' },
          { code: 'ta', label: 'தமிழ்' },
          { code: 'te', label: 'తెలుగు' },
          { code: 'th', label: 'ภาษาไทย' },
          { code: 'tr', label: 'Türkçe' },
          { code: 'uk', label: 'Українська' },
          { code: 'uz', label: 'اوزبیک' },
          { code: 'vi', label: 'Tiếng Việt Nam' },
          { code: 'zh', label: 'CN 汉语' }
        ],
        value: this.$store.getters.locale
      }
    },

    methods: {
      onInput (option) {
        this.$store.commit('updateLocale', option.code);
      },

      showLanguage ({ label }) {
        return `${label}`;
      }
    },

    mounted () {
      // TODO: show the preselect locale as the selected value in Vue Multiselect
      // needs further investigation, or maybe an updated version of the component
    }
  }
</script>
