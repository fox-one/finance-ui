import {
  addDecorator,
  configure
} from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';
import { setConsoleOptions } from '@storybook/addon-console';
import { addReadme } from 'storybook-readme/vue';
import useVuetify from './vuetify';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
addDecorator(addReadme);
addDecorator(() => ({
  vuetify: useVuetify(),
  created: function () {
    const locale = navigator.language;
    const lang = locale.includes('zh')
      ? 'zh'
      : locale.includes('ja')
      ? 'ja'
      : 'en';
    this.$vuetify.lang.current = lang;
  },
  template:
    '<v-app><v-main><v-container><story/></v-container></v-main></v-app>'
}));

setConsoleOptions({
  panelExclude: [],
  info: 'info'
});
withOptions({
  name: 'finance-ui'
});

const req = require.context('../src/', true, /.stories.(ts|js)$/);
function loadStories() {
  const keys = req.keys();
  keys.forEach(filename => req(filename));
};
configure(loadStories, module);
