import { shallowMount, mount } from '@vue/test-utils';
import RiskSlider from '../';

describe('RiskSlider', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(RiskSlider);
    expect(wrapper).toMatchSnapshot();
  });
});
