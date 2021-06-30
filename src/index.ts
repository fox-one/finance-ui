import AssetUpperLimitInput from './AssetUpperLimitInput';
import CheckOut from './CheckOut';
import RiskInfo from './RiskInfo';
import RiskSlider from './RiskSlider';

import type { VueConstructor } from 'vue';

install.installed = false;
function install(Vue: VueConstructor<Vue>) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('FAssetUpperLimitInput', AssetUpperLimitInput);
  Vue.component('FCheckOut', CheckOut);
  Vue.component('FRiskInfo', RiskInfo);
  Vue.component('FRiskSlider', RiskSlider);
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
