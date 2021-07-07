export interface Coupon {
  type: 'DISCOUNT' | 'VOUCHER';
  amount: number;
  name: string;
  expired_at: string | number;
  [props: string]: any;
}