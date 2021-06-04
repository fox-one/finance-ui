import { shallowMount, mount } from '@vue/test-utils';
import Coupon from '../';

describe('Coupon', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Coupon);
    expect(wrapper).toMatchSnapshot();
  });
});
