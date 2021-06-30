import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { AssetUpperLimitInput } from '../';
import { RiskSlider } from '../../RiskSlider';
import '../style';

storiesOf('AssetUpperLimitInput', module)
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
  .add('Without V-Model', () => ({
    components: {
      AssetUpperLimitInput
    },
    data: () => ({
      upperLimit: 60,
      inputTips: {
        amount: 36,
        amountSymbol: 'BTC',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      asset: {
        chain: {
          chain: null,
          chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          logo: "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
          name: "Ether",
          price: "2167.89",
          symbol: "ETH"
        },
        chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
        id: "965e5c6e-434c-3fa9-b780-c50f43cd955c",
        logo: "https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
        name: "Chui Niu Bi",
        price: "0",
        symbol: "CNB"
      },
    }),
    template: `<asset-upper-limit-input
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      :upperLimit="upperLimit"
      color="black"
    />`
  }))
  .add('With V-Model', () => ({
    components: {
      AssetUpperLimitInput
    },
    data: () => ({
      upperLimit: 50,
      inputTips: {
        amount: 50,
        amountSymbol: 'BTC',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      asset: {
        chain: {
          chain: null,
          chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          logo: "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
          name: "Ether",
          price: "2167.89",
          symbol: "ETH"
        },
        chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
        id: "965e5c6e-434c-3fa9-b780-c50f43cd955c",
        logo: "https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
        name: "Chui Niu Bi",
        price: "0",
        symbol: "CNB"
      },
      amount: 30.21
    }),
    methods: {
      onInput() {
        console.log('this.amount', (this as any).amount);
      }
    },
    template: `<asset-upper-limit-input
      v-model="amount"
      @input="onInput"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      :upperLimit="upperLimit"
      color="black"
    />`
  }))
  .add('With RiskSlider', () => ({
    components: {
      AssetUpperLimitInput,
      RiskSlider
    },
    data: () => ({
      upperLimit: 50,
      inputTips: {
        amount: 50,
        amountSymbol: 'BTC',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      asset: {
        chain: {
          chain: null,
          chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
          id: "43d61dcd-e413-450d-80b8-101d5e903357",
          logo: "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
          name: "Ether",
          price: "2167.89",
          symbol: "ETH"
        },
        chain_id: "43d61dcd-e413-450d-80b8-101d5e903357",
        id: "965e5c6e-434c-3fa9-b780-c50f43cd955c",
        logo: "https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128",
        name: "Chui Niu Bi",
        price: "0",
        symbol: "CNB"
      },
      amount: 30.21,
      precent: 30.21 / 50 * 100,
      tips: {
        tip: 'Collateralization Ration reach',
        highlight: `${(30.21 / 50 * 100).toFixed(2)}%, it’s in low-risk now.`
      },
      scale: {
        low: 0.65,
        mid: 0.2,
        high: 0.15
      }
    }),
    methods: {
      onInput() {
        const self = this as any;
        const amount = self.amount;
        const upperLimit = self.upperLimit;
        self.precent = amount / upperLimit * 100;
        self.$nextTick(() => {
          const slider = self.$refs.slider;
          self.$set(self.tips, 'highlight', `${self.precent.toFixed(2)}%, it’s in ${slider.currentScale}-risk now.`)
        })
      }
    },
    template: `<asset-upper-limit-input
      v-model="amount"
      @input="onInput"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      :upperLimit="upperLimit"
      color="black"
    >
      <template v-slot:slider>
        <risk-slider
          v-model="precent"
          :tips="tips"
          :scale="scale"
          ref="slider"
        />
      </template>
    </asset-upper-limit-input>`
  }));
