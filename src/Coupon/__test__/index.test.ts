import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import Coupon from '../';

Vue.use(VueCompositionAPI);

describe('Coupon', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Coupon);
    expect(wrapper).toMatchSnapshot();
  });
});
