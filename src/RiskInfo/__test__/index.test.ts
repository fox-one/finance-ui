import { shallowMount, mount } from '@vue/test-utils';
import RiskInfo from '../';

describe('RiskInfo', () => {
  it('renders correctly', () => {
    const wrapper = mount(RiskInfo);
    expect(wrapper).toMatchSnapshot();
  });
});
