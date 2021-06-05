import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';
import { Fiat } from './CheckOut';

@Component
export class Amount extends Vue {
  @Prop({ type: String, default: '' }) private icon!: string;
  @Prop({ type: Number, default: 0 }) private amount!: number;
  @Prop({ type: Number, default: 0 }) private discount!: number;
  @Prop({ type: String, default: 'CNY' }) private symbol!: string;
  @Prop({ type: Object, default: () => ({ rate: 1, symbol: '$' }) }) private fiat!: Fiat;

  public render(h: CreateElement): VNode {
    const classes = classnames('checkout-amount');
    return h(
      'div',
      {
        staticClass: `text--primary ${classes()}`
      },
      [
        h(
          'v-layout',
          {
            props: {
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
                  'v-img',
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
                      `${this.amount - this.discount}`
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
                  `≈ ${this.fiat.symbol}${this.amount / this.fiat.rate}`
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