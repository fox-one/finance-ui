import { shallowMount, mount } from '@vue/test-utils';
import CheckOut from '../';

describe('CheckOut', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CheckOut);
    expect(wrapper).toMatchSnapshot();
  });
});
