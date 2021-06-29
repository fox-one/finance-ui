import { shallowMount, mount } from '@vue/test-utils';
import AssetUpperLimitInput from '../';

describe('AssetUpperLimitInput', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AssetUpperLimitInput);
    expect(wrapper).toMatchSnapshot();
  });
});
