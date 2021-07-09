import {
  Component,
  Vue,
  Prop,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Amount from './Amount';
import Channel from './Channel';
import PayAction from './PayAction';
import { FBottomSheet } from '@foxone/uikit/src/components/FBottomSheet';
/* import types */
import type { CreateElement, VNode } from 'vue';

export interface ChannelType {
  channel: 'mixin' | 'wechat' | 'alipay';
  channel_name: string;
  channel_icon: string;
  asset_id: string;
  asset_icon: string;
  symbol: string;
  percision?: number;
  price_ratio: number;
  [props: string]: any;
}

export interface Fiat {
  symbol: string;
  price_ratio: number;
}

@Component({
  components: {
    Amount,
    Channel,
    PayAction
  }
})
export class CheckOut extends Vue {
  // Data relative
  @Prop({ type: Array, default: () => [] }) private channels!: ChannelType[];
  @Prop({ type: [Number, String], default: 0 }) private amount!: number | string;
  @Prop({ type: [Number, String], default: 0 }) private discount!: number | string;
  @Prop({ type: Number, default: 1 }) private quantity!: number;
  @Prop({ type: Object, default: () => ({ price_ratio: 1, symbol: '$' }) }) private fiat!: Fiat;

  // UI relative
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: String, default: '' }) private subtitle!: string;
  @Prop({ type: String, default: 'checkout' }) private prefixCls!: string;

  @Model('change', { type: Boolean, default: false }) private show!: boolean;


  private loading = false;

  private paychannel: ChannelType = {} as ChannelType;

  private isChannelSelected(channel: ChannelType) {
    return (
      this.paychannel?.channel === channel.channel &&
      this.paychannel.asset_id === channel.asset_id
    );
  }

  public created() {
    this.paychannel = this.channels?.[0];
  }

  public render(h: CreateElement): VNode {
    const classes = classnames(this.prefixCls);
    return h(
      'div',
      {
        staticClass: classes()
      },
      [
        h(
          FBottomSheet,
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
                  'amount',
                  {
                    props: {
                      amount: this.amount,
                      discount: this.discount,
                      quantity: this.quantity,
                      symbol: this.paychannel.symbol,
                      icon: this.paychannel.asset_icon || this.paychannel.channel_icon,
                      channel: this.paychannel,
                      fiat: this.fiat
                    }
                  }
                ),
                this.channels?.map((channel, ind) => h(
                  'channel',
                  {
                    key: ind,
                    props: {
                      channel,
                      selected: this.isChannelSelected(channel)
                    },
                    on: {
                      select: (channel: ChannelType) => {
                        this.paychannel = channel;
                      }
                    }
                  }
                )),
                h(
                  'pay-action',
                  {
                    on: {
                      pay: () => {
                        console.info('pay action!');
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