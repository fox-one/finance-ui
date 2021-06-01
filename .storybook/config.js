import Vue from 'vue';
import Vuetify from "vuetify/lib";
import Uikit from "@foxone/uikit";
import { addDecorator, configure } from '@storybook/vue';
import { withOptions } from '@storybook/addon-options';
import { setConsoleOptions } from '@storybook/addon-console';
import { addReadme } from 'storybook-readme/vue';

Vue.use(Vuetify);
Vue.use(Uikit);

addDecorator(addReadme);
setConsoleOptions({
  panelExclude: []
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
