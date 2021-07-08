import RiskInfo from './RiskInfo';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type RiskInfo = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(RiskInfo as RiskInfo).install = (app: VueConstructor<Vue>): void => {
  if (RiskInfo.name) app.component(RiskInfo.name, RiskInfo);
};

export default RiskInfo;
