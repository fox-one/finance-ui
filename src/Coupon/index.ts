import Coupon from './Coupon.vue';
import type { VueConstructor } from 'vue';

Coupon.install = (app: VueConstructor<Vue>): void => {
  app.component(Coupon.name, Coupon);
};

export default Coupon;
