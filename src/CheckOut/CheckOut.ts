import {
  Component,
  Vue,
  Prop,
  PropSync
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Bridge from '@foxone/mixin-sdk-jsbridge';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class CheckOut extends Vue {
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: String, default: '' }) private subtitle!: string;
  @Prop({ type: String, default: '' }) private client_id!: string;
  @Prop({ type: String, default: '' }) private className!: string;

  @PropSync('show') private bindShow!: boolean;

  private bridge: undefined | Bridge;

  private loading = false;

  public created() {
    if (this.client_id) {
      this.bridge = new Bridge({
        client_id: this.client_id
      });
    }
  }

  public render(h: CreateElement): VNode {
    const classes = classnames({ prefix: 'prefix' });
    return h(
      'div',
      {
        staticClass: classes('checkout'),
        class: this.className
      },
      [
        h(
          'f-bottom-sheet',
          {
            props: {
              value: this.bindShow
            },
            scopedSlots: {
              title: () => {
                return this.title ? h('h4', { staticClass: 'f-greyscale-1' }, this.title) : null;
              },
              subheader: () => {
                return this.subtitle ? h('h5', { staticClass: 'f-greyscale-3 f-caption subtitle text-center' }, this.subtitle) : null;
              }
            },
            on: {
              change: () => {
                console.info('onchange');
              }
            }
          },
          [
            !this.loading
              ? h('div', 'test msg')
              : h(
                'div',
                {
                  staticClass: 'ma-10 text-center'
                },
                'loading'
              )
          ]
        )
      ]
    );
  }
}

export default CheckOut;