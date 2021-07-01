# AssetRangeInput

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
