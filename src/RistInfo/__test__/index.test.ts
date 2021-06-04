import { shallowMount, mount } from '@vue/test-utils';
import RistInfo from '../';

describe('RistInfo', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(RistInfo);
    expect(wrapper).toMatchSnapshot();
  });
});
