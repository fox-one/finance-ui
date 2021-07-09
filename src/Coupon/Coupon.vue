<template>
  <div :class="classes()">
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';

export interface Coupon {
  type: 'DISCOUNT' | 'VOUCHER';
  amount: number;
  name: string;
  expired_at: string | number;
  [props: string]: any;
}

export default defineComponent({
  name: 'Coupon',
  props: {
    coupons: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const classes = classnames('coupon');
    onMounted(() => {
      console.info('Coupon mounted!');
    });

    return { classes };
  }
});
</script>