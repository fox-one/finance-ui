import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import { $t } from '@utils/t';
import { FButton } from '@foxone/uikit/src/components/FButton';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class PayAction extends Vue {
  @Prop({ type: Function, default: () => { } }) private onPay!: () => any;

  private loading = false;

  private get disabled() {
    return this.loading;
  }

  private async handlePay() {
    this.$emit('pay');
    this.loading = true;
    try {
      await this.onPay?.();
    } catch (error) {
      this.$emit('error', error);
    }
    this.loading = false;
  }

  public render(h: CreateElement): VNode {
    return h(
      'div',
      {
        staticClass: 'ma-4 mt-8'
      },
      [
        h(
          FButton,
          {
            props: {
              block: true,
              type: 'primary',
              disabled: this.disabled,
              loading: this.loading
            },
            on: {
              click: () => this.handlePay()
            }
          },
          $t(this, 'pay')
        )
      ]
    );
  }
}

export default PayAction;