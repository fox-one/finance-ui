import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { AssetRangeInput } from '../';
import { RiskSlider } from '../../RiskSlider';
import { ConnectWallet } from '../../ConnectWallet';
import '../style';

const asset = {
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
};

storiesOf('AssetRangeInput', module)
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
      AssetRangeInput
    },
    data: () => ({
      max: 60,
      asset,
      inputTips: {
        amount: 36,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 56456.54',
      }
    }),
    template: `<asset-range-input
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }))
  .add('With V-Model', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        amount: 50,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      amount: 30.21
    }),
    methods: {
      onInput() {
        console.log('this.amount', (this as any).amount);
      }
    },
    template: `<asset-range-input
      v-model="amount"
      @input="onInput"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }))
  .add('With Error', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        amount: 50,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      amount: 30.21
    }),
    methods: {
      onInput() {
        console.log('this.amount', (this as any).amount);
      },
      getErrMsg(val) {
        return `I'm a error message, now the value is ${val}`;
      }
    },
    template: `<asset-range-input
      v-model="amount"
      @input="onInput"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      :error="getErrMsg"
      color="black"
    />`
  }))
  .add('With Disabled', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        amount: 42.67,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 16456.54',
      },
      amount: 33.05
    }),
    template: `<asset-range-input
      v-model="amount"
      :disabled-input="true"
      :disabled-btn="true"
      :disabled-slider="true"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }))
  .add('Exceed Max', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        amount: 100,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 16456.54',
      },
      amount: 50.21
    }),
    methods: {
      onErr() {
        console.error('exceed max', (this as any).amount);
      }
    },
    template: `<asset-range-input
      v-model="amount"
      @error:limit="onErr"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }))
  .add('With Connect Wallet', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        tipLeft: ''
      },
      amount: 30.21
    }),
    created() {
      const self = this as any;
      self.$set(self.inputTips, 'tipLeft', self.$createElement(ConnectWallet))
    },
    methods: {
      onInput() {
        console.log('this.amount', (this as any).amount);
      }
    },
    template: `<asset-range-input
      v-model="amount"
      @input="onInput"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }))
  .add('With RiskSlider', () => ({
    components: {
      AssetRangeInput,
      RiskSlider
    },
    data: () => ({
      max: 50,
      asset,
      amount: 30.21,
      inputTips: {
        amount: 50,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 6456.54',
      },
      percent: 30.21 / 50 * 100,
      tips: {
        tip: 'Collateralization Ration reach',
        highlight: `${(30.21 / 50 * 100).toFixed(2)}%, it’s in low-risk now.`
      },
      scale: {
        low: 65,
        mid: 20,
        high: 15
      }
    }),
    methods: {
      onInput() {
        const self = this as any;
        const amount = self.amount;
        const max = self.max;
        self.percent = amount / max * 100;
        self.$nextTick(() => {
          const slider = self.$refs.slider;
          self.$set(self.tips, 'highlight', `${self.percent.toFixed(2)}%, it’s in ${slider.currentScale}-risk now.`)
        })
      }
    },
    template: `<asset-range-input
      v-model="amount"
      @input="onInput"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    >
      <template v-slot:slider>
        <risk-slider
          v-model="percent"
          :tips="tips"
          :scale="scale"
          ref="slider"
        />
      </template>
    </asset-range-input>`
  }))
  .add('Without Slider', () => ({
    components: {
      AssetRangeInput
    },
    data: () => ({
      max: 50,
      asset,
      inputTips: {
        amount: 36,
        amountSymbol: 'CNB',
        tipLeft: 'Collateral',
        tipRight: '≈ $ 16456.54',
      },
      amount: 12.21
    }),
    template: `<asset-range-input
      v-model="amount"
      :show-slider="false"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
      color="black"
    />`
  }));
