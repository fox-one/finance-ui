import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { VSlider, VLayout } from 'vuetify/lib';
import { FAssetAmountInput } from '@foxone/uikit/src/components/FAssetAmountInput';
import { FButton } from '@foxone/uikit/src/components/FButton';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class AssetUpperLimitInput extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;

  public render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const classes = classnames('asset-upper-limit-input');
    return h(
      VLayout,
      {
        staticClass: classes(),
        class: this.className,
        props: {
          column: true,
          'align-center': true
        }
      },
      []
    );
  }
}

export default AssetUpperLimitInput;