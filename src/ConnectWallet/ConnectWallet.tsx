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
    className: {
      type: String,
      default: ''
    },
    text: {
      type: [String, Object],
      default: 'Connect Wallet'
    }
  },
  setup() {
    const classes = classnames('connect-wallet');
    onMounted(() => {
      console.info('ConnectWallet mounted!');
    });

    return { classes };
  },
  render(h: CreateElement): VNode {
    return (
      <div class={this.classes(void 0, this.className)}>
        <span class={this.classes('text', 'f-greyscale-1 f-caption font-weight-bold pr-4')}>
          { this.text }
        </span>
      </div>
    );
  }
});