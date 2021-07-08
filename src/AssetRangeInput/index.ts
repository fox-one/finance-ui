import AssetRangeInput from './AssetRangeInput';
import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type AssetRangeInput = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}

(AssetRangeInput as AssetRangeInput).install = (app: VueConstructor<Vue>): void => {
  if (AssetRangeInput.name) app.component(AssetRangeInput.name, AssetRangeInput);
};

export default AssetRangeInput;
