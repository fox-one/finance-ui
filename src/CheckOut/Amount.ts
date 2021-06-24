import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
import { transfer } from '@utils/checkout';
import { VLayout, VImg } from 'vuetify/lib';
/* import types */
import type { CreateElement, VNode } from 'vue';
import type { ChannelType, Fiat } from './CheckOut';

@Component
export class Amount extends Vue {
  @Prop({ type: String, default: '' }) private icon!: string;
  @Prop({ type: [Number, String], default: 0 }) private amount!: number | string;
  @Prop({ type: [Number, String], default: 0 }) private discount!: number | string;
  @Prop({ type: Number, default: 1 }) private quantity!: number;
  @Prop({ type: String, default: 'CNY' }) private symbol!: string;
  @Prop({ type: Object, default: () => ({}) }) private channel!: ChannelType;
  @Prop({ type: Object, default: () => ({ price_ratio: 1, symbol: '$' }) }) private fiat!: Fiat;

  private get actualAmount() {
    return transfer(
      1,
      this.channel.price_ratio,
      (+this.amount) - (+this.discount),
      this.quantity,
      this.channel.percision ?? 2
    );
  }

  public render(h: CreateElement): VNode {
    const classes = classnames('checkout-amount');
    return h(
      'div',
      {
        staticClass: `text--primary ${classes()}`
      },
      [
        h(
          VLayout,
          {
            attrs: {
              'align-center': true,
              'justify-center': true
            }
          },
          [
            h(
              'div',
              { staticClass: 'mr-3' },
              [
                h(
                  VImg,
                  {
                    props: {
                      width: '38',
                      height: '38',
                      src: this.icon
                    }
                  }
                )
              ]
            ),
            h(
              'div',
              [
                h(
                  'div',
                  { staticClass: 'font-weight-medium' },
                  [
                    h(
                      'span',
                      { staticClass: classes('major') },
                      `${this.actualAmount}`
                    ),
                    h(
                      'span',
                      { staticClass: classes('symbol') },
                      this.symbol
                    )
                  ]
                ),
                this.discount ? h(
                  'div',
                  {
                    staticClass: `text-center ${classes('original')}`
                  },
                  [
                    h(
                      'span',
                      `${this.amount}`
                    ),
                    h(
                      'span',
                      this.symbol
                    )
                  ]
                ) : null,
                h(
                  'div',
                  { staticClass: 'text-subtitle-2 text--secondary' },
                  `≈ ${this.fiat.symbol}${+this.amount / this.fiat.price_ratio}`
                )
              ]
            )
          ]
        )
      ]
    );
  }
}

export default Amount;