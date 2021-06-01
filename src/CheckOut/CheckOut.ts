import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Bridge from '@foxone/mixin-sdk-jsbridge';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class CheckOut extends Vue {
  @Prop({ type: String, default: '' }) private client_id!: string;
  @Prop({ type: Boolean, default: false }) private show!: boolean;
  @Prop({ type: String, default: '' }) private className!: string;

  private bridge: undefined | Bridge;

  public created() {
    if (this.client_id) {
      this.bridge = new Bridge({
        client_id: this.client_id
      });
    }
  }

  public render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const classes = classnames({ prefix: 'prefix' });
    return h(
      'div',
      {
        staticClass: classes('checkout'),
        class: this.className
      },
      [
        h('f-bottom-sheet', {
          props: {
            value: this.show
          }
        }),
      ]
    );
  }
}

export default CheckOut;