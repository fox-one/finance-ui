import { shallowMount, mount } from '@vue/test-utils';
import RiskInfo from '../';

describe('RiskInfo', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(RiskInfo);
    expect(wrapper).toMatchSnapshot();
  });
});
