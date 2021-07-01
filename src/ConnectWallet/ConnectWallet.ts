import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class ConnectWallet extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;
  @Prop({ type: [String, Object], default: 'Connect Wallet' }) private text!: string | VNode;

  public render(h: CreateElement): VNode {
    const classes = classnames('connect-wallet');
    return h(
      'div',
      {
        staticClass: classes(),
        class: this.className
      },
      [
        h(
          'span',
          {
            staticClass: classes('text', 'f-greyscale-1 f-caption font-weight-bold pr-4'),
            on: {
              ...this.$listeners
            }
          },
          [this.text]
        )
      ]
    );
  }
}

export default ConnectWallet;