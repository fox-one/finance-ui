import RiskInfo from './RiskInfo.tsx';
import type { VueConstructor } from 'vue';

RiskInfo.install = (app: VueConstructor<Vue>): void => {
  app.component(RiskInfo.name, RiskInfo);
};

export default RiskInfo;
