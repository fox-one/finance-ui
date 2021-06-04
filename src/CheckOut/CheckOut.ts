import {
  Component,
  Vue,
  Prop,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Bridge from '@foxone/mixin-sdk-jsbridge';
import PayAction from './PayAction';
/* import types */
import type { CreateElement, VNode } from 'vue';

export interface Channel {
  channel: 'mixin' | 'wechat' | 'alipay';
  channel_icon: string;
  asset_id: string;
  asset_icon: string;
  [props: string]: any;
}

@Component({
  components: {
    PayAction
  }
})
export class CheckOut extends Vue {
  // Data relative
  @Prop({ type: Array, default: () => [] }) private channels!: Channel[];
  @Prop({ type: Number, default: 0 }) private amount!: number;
  @Prop({ type: String, default: '' }) private client_id!: string;

  // UI relative
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: String, default: '' }) private subtitle!: string;
  @Prop({ type: String, default: '' }) private className!: string;

  @Model('change', { type: Boolean, default: false }) private show!: boolean;

  private bridge: undefined | Bridge;

  private loading = false;

  private payway: Channel = {} as Channel;

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
            attrs: {
              persistent: true
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
                h(
                  'pay-action',
                  {
                    on: {
                      pay: () => {
                        console.info(123555);
                        this.$emit('pay');
                      }
                    }
                  }
                )
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

export default CheckOut;