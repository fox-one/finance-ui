import type { VueConstructor } from 'vue';

install.installed = false;
function install (Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
}

let GlobalVue;
const win = window ?? global;
if (typeof win !== 'undefined') {
  GlobalVue = win.Vue;
}

if (GlobalVue) install(GlobalVue);

export default {
  install
};
