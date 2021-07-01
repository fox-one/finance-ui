import { shallowMount, mount } from '@vue/test-utils';
import ConnectWallet from '../';

describe('ConnectWallet', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ConnectWallet);
    expect(wrapper).toMatchSnapshot();
  });
});
