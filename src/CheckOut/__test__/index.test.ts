import { shallowMount, mount } from '@vue/test-utils';
import CheckOut from '../';

const channels = [
  {
    channel: 'wechat',
    channel_name: 'WeChat Pay',
    channel_icon: '',
    asset_id: '43d61dcd-e413-450d-80b8-101d5e903357',
    asset_icon: 'https://xuexi-courses.firesbox.com/images/currencies/cny.png',
    symbol: 'CNY',
    percision: 2,
    price_ratio: 1
  },
  {
    channel: 'alipay',
    channel_name: 'Ali Pay',
    channel_icon: '',
    asset_id: '32ccb399-83cc-3663-b67c-175059dd94a0',
    asset_icon: 'https://xuexi-courses.firesbox.com/images/currencies/cny.png',
    symbol: 'CNY',
    percision: 2,
    price_ratio: 1
  },
  {
    channel: 'mixin',
    channel_name: 'BTC',
    channel_icon: '',
    asset_id: 'c6d0c728-2624-429b-8e0d-d9d19b6592fa',
    asset_icon: 'https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128',
    symbol: 'BTC',
    percision: 8,
    price_ratio: 230028.8
  }
];

const fiat = {
  symbol: '$',
  price_ratio: 6.35
};

describe('CheckOut', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CheckOut, {
      propsData: {
        channels,
        fiat,
        amount: "2521.73",
        title: "支付入群费",
        subtitle: "超级便宜，只要1999.99个BTC"
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
