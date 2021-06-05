import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
/* import types */
import type { CreateElement, VNode } from 'vue';


export interface Coupon {
  type: 'DISCOUNT' | 'VOUCHER';
  amount: number;
  name: string;
  expired_at: string | number;
  [props: string]: any;
}

@Component
export class Coupon extends Vue {
  @Prop({ type: Array, default: () => [] }) private coupons!: Coupon[];
  @Prop({ type: String, default: '' }) private className!: string;

  public render(h: CreateElement): VNode {
    const content = this.$slots.default;
    const classes = classnames('coupon');
    return h(
      'div',
      {
        staticClass: classes(),
        class: this.className
      },
      content
    );
  }
}

export default Coupon;