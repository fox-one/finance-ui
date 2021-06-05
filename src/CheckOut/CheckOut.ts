import {
  Component,
  Vue,
  Prop,
  Model
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import Amount from './Amount';
import PayAction from './PayAction';
/* import types */
import type { CreateElement, VNode } from 'vue';

export interface Channel {
  channel: 'mixin' | 'wechat' | 'alipay';
  channel_icon: string;
  asset_id: string;
  asset_icon: string;
  symbol: string;
  rate: number;
  [props: string]: any;
}

export interface Fiat {
  symbol: string;
  rate: number;
}

@Component({
  components: {
    Amount,
    PayAction
  }
})
export class CheckOut extends Vue {
  // Data relative
  @Prop({ type: Array, default: () => [] }) private channels!: Channel[];
  @Prop({ type: Number, default: 0 }) private amount!: number;
  @Prop({ type: Number, default: 0 }) private discount!: number;
  @Prop({ type: Number, default: 1 }) private quantity!: number;
  @Prop({ type: Number, default: 2 }) private percision!: number;
  @Prop({ type: Object, default: () => ({ rate: 1, symbol: '$' }) }) private fiat!: Fiat;

  // UI relative
  @Prop({ type: String, default: '' }) private title!: string;
  @Prop({ type: String, default: '' }) private subtitle!: string;
  @Prop({ type: String, default: '' }) private className!: string;

  @Model('change', { type: Boolean, default: false }) private show!: boolean;


  private loading = false;

  private paychanel: Channel = {} as Channel;

  public render(h: CreateElement): VNode {
    const classes = classnames('checkout');
    return h(
      'div',
      {
        staticClass: classes(),
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
                  'amount',
                  {
                    props: {
                      icon: this.paychanel.asset_icon,

                    }
                  }
                ),
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