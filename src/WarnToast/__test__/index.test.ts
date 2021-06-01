import { shallowMount, mount } from '@vue/test-utils';
import WarnToast from '../';

describe('WarnToast', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(WarnToast);
    expect(wrapper).toMatchSnapshot();
  });
});
