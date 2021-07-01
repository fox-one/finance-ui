# finance-ui

English | [简体中文](./README.zh-CN.md)

[Demo](https://fox-one.github.io/finance-ui/?path=/story)

## Quick start
### Install

```shell
yarn add @foxone/finance-ui
```

### Global Usage
`main.ts`:
```typescript
import Vue from "vue";
import FinanceUI from "@foxone/finance-ui";
import "@foxone/finance-ui/es/index.css";

Vue.use(FinanceUI);

// ……
```

`App.vue`:
```vue
<template>
  <div>
    My Vue App With FinanceUI
    <asset-range-input
      v-model="amount"
      @input="onInput"
      :max="max"
      :inputTips="inputTips"
      :asset="asset"
      :selectable="false"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
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

### Local Usage
`Component.vue`:
```vue
<template>
  <div>
    It's Risk Slider
    <risk-slider
      v-model="precent"
      :tips="tips"
      :scale="scale"
      ref="slider"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { RiskSlider } from '@foxone/finance-ui';
  import "@foxone/finance-ui/es/RiskSlider/style/css";

  @Component(
    components: {
      RiskSlider
    }
  )
  export default class App extends Vue {
    precent = 30;
    tips = {
      tip: 'Collateralization Ration reach',
      highlight: `${(30.21 / 50 * 100).toFixed(2)}%, it’s in low-risk now.`
    };
    scale = {
      low: 0.65,
      mid: 0.2,
      high: 0.15
    };
  }
</script>
```



## Dev
For debugging or maintenance, you can clone the whole git repository and run the project.

```shell
git clone --depth 1 git@github.com:fox-one/finance-ui.git

cd finance-ui

yarn && yarn dev
```

[More Detials](./DEV.md)