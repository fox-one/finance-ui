import AssetRangeInput from './AssetRangeInput';
import CheckOut from './CheckOut';
import RiskInfo from './RiskInfo';
import RiskSlider from './RiskSlider';

import type { VueConstructor } from 'vue';

install.installed = false;
function install(Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('AssetRangeInput', AssetRangeInput);
  Vue.component('CheckOut', CheckOut);
  Vue.component('RiskInfo', RiskInfo);
  Vue.component('RiskSlider', RiskSlider);
}

let GlobalVue;
const win = window ?? global;
if (typeof win !== 'undefined') {
  GlobalVue = win.Vue;
}

if (GlobalVue) install(GlobalVue);

export * from './AssetRangeInput';
export * from './CheckOut';
export * from './RiskInfo';
export * from './RiskSlider';

export default {
  install
};
