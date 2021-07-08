import RiskSlider from './RiskSlider.vue';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type RiskSlider = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(RiskSlider as RiskSlider).install = (app: VueConstructor<Vue>): void => {
  if (RiskSlider.name) app.component(RiskSlider.name, RiskSlider);
};

export default RiskSlider;
