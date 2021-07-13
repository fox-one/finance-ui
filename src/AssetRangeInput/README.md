# AssetRangeInput
Based On **[@foxone/uikit - AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput)**

## API

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| value(optional) | Controls whether the component is visible or hidden | boolean | `false` |
| prefixCls(optional) | The prefix classname for wholly control the component style | string | `'asset-range-input'` |
| min(optional) | Sets the minimum allowed value | number | `0` |
| max(optional) | Sets the maximum allowed value | number | `100` |
| color(optional) | The color theme for button | string | `primary` |
| disabledInput(optional) | Disable the [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | boolean | `false` |
| disabledSlider(optional) | Disable the slider | boolean | `false` |
| disabledBtn(optional) | Disable the button | boolean | `false` |
| selectable(optional) | Pass to [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | boolean | `true` |
| border(optional) | Pass to [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | boolean | `false` |
| loading(optional) | Pass to [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | boolean | `false` |
| assets(optional) | Pass to [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | type MixinAsset[] | `[]` |
| asset(optional) | Pass to [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | type MixinAsset | `{}` |
| inputTips(optional) | The tips which below the [AssetAmountInput](https://fox-one.github.io/uikit/#/components/AssetAmountInput) | type INPUT_TIPS | `{}` |
| error(optional) | The error message which below the inputTips | type ERROR | `''` |
| ratioText(optional) | The custom text for slider ratio which above the slider | string | `Ratio` |
| showSlider(optional) | Whether show the slider | boolean | `true` |
| btnText(optional) | The custom text for button | string | `Confirm` |
| showBtn(optional) | Whether show the button | boolean | `true` |

### Slots
| Name | Description |
| --- | --- |
| activator(optional) | Activate the component when clicked  `{ on: { [eventName]: eventHandler }, value: boolean }` |
| button(optional) | Replaces the default button |
| slider(optional) | Replaces the default slider |
| inputTips(optional) | Replaces the default inputTips |
| sliderTips(optional) | Replaces the default sliderTips |


## Types

```typescript
interface MixinAsset {
  id: string;
  symbol: string;
  name?: string;
  logo: string;
  chainLogo?: string;
  label?: string;
  select_symbol?: string;
}

interface INPUT_TIPS {
  amount?: number;
  amountSymbol?: string;
  tipLeft?: string;
  tipRight: string;
}

type ERROR = string | ((value: number | string) => string | VNode) | VNode;
```

## Example

```vue
<template>
  <asset-range-input
    v-model="amount"
    @input="onInput"
    :max="max"
    :inputTips="inputTips"
    :asset="asset"
    :selectable="false"
    color="black"
  />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export class App extends Vue {
    max = 50;
    asset = {
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
    }；
    inputTips = {
      amount: 50,
      amountSymbol: 'CNB',
      tipLeft: 'Collateral',
      tipRight: '≈ $ 6456.54',
    }；
    amount = 30.21;

    onInput() {
      console.log('this.amount', this.amount);
    }
  }
</script>
```
