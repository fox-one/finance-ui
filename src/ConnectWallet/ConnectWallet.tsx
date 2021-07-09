import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';

export default defineComponent({
  name: 'ConnectWallet',
  props: {
    prefixCls: {
      type: String,
      default: 'connect-wallet'
    },
    text: {
      type: [String, Object],
      default: 'Connect Wallet'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('ConnectWallet mounted!');
    });

    return { classes };
  },
  render(h: CreateElement): VNode {
    return (
      <div class={this.classes()}>
        <span class={this.classes('text', 'f-greyscale-1 f-caption font-weight-bold pr-4')}>
          { this.text }
        </span>
      </div>
    );
  }
});