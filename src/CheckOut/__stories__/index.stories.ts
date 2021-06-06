import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { CheckOut } from '../';
import AliPayIcon from './img/ali-pay.png';
import MixinPayIcon from './img/mixin-pay.png';
import WechatPayIcon from './img/wechat-pay.png';
import '../style';

storiesOf('CheckOut', module)
  .addParameters({
    readme: {
      sidebar: require('../README.md').default,
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: { theme: themes.light },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  })
  .add('Simple Example', () => ({
    components: {
      CheckOut
    },
    data() {
      const channels = [
        {
          channel: 'wechat',
          channel_name: 'WeChat Pay',
          channel_icon: WechatPayIcon,
          asset_id: '43d61dcd-e413-450d-80b8-101d5e903357',
          asset_icon: 'https://xuexi-courses.firesbox.com/images/currencies/cny.png',
          symbol: 'CNY',
          percision: 2,
          price_ratio: 1
        },
        {
          channel: 'alipay',
          channel_name: 'Ali Pay',
          channel_icon: AliPayIcon,
          asset_id: '32ccb399-83cc-3663-b67c-175059dd94a0',
          asset_icon: 'https://xuexi-courses.firesbox.com/images/currencies/cny.png',
          symbol: 'CNY',
          percision: 2,
          price_ratio: 1
        },
        {
          channel: 'mixin',
          channel_name: 'BTC',
          channel_icon: MixinPayIcon,
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

      return {
        isShow: false,
        channels,
        fiat
      }
    },
    methods: {
      handleClick() {
        const self = this as any;
        self.isShow = !self.isShow;
      },
      handleChange(val) {
        console.log('onchange value: ', val);
      }
    },
    template: `<section>
        <p class="mt-10 text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">各种信息介绍……</p>
        <p class="text-center">大佬快快入群！！！</p>
        <div style="position: absolute; bottom: 20vh; left: 50%; transform: translate(-50%, 0);">
          <v-btn @click="handleClick" color="primary">点我入群</v-btn>
          <CheckOut
            v-model="isShow"
            :channels="channels"
            :fiat="fiat"
            :amount="2521.73"
            title="支付入群费"
            subtitle="超级便宜，只要1999.99个BTC"
            @change="handleChange"
          >
            {{'Hello CheckOut'}}
          </CheckOut>
        </div>
      </section>`
  }));
