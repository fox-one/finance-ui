import {
  Component,
  Vue,
  Prop,
  PropSync,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Bridge from '@foxone/mixin-sdk-jsbridge';
/* import types */
import type { CreateElement, VNode } from 'vue';

@Component
export class SettleAmount extends Vue {
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: String, default: '' }) private subtitle!: string;
  @Prop({ type: String, default: '' }) private client_id!: string;
  @Prop({ type: String, default: '' }) private className!: string;

  @Model('change', { type: Boolean, default: false }) private show!: boolean;

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
              value: this.show
            },
            on: {
              change: (val: any) => {
                this.$emit('change', val);
              }
            }
          },
          [
            !this.loading
              ? [
                this.title ? h(
                  'template',
                  {
                    slot: 'title',
                  },
                  [
                    h('h4', { staticClass: 'f-greyscale-1' }, this.title)
                  ]
                ) : null,
                this.subtitle ? h(
                  'template',
                  {
                    slot: 'subheader',
                  },
                  [
                    h('h5', { staticClass: 'f-greyscale-3 f-caption subtitle text-center' }, this.subtitle)
                  ]
                ) : null,
                h('div', 'test msg123')
              ]
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

export default SettleAmount;