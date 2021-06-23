# RiskInfo

## Example

```vue
<template>
  <risk-info
    :asset-left="assetLeft"
    :asset-right="assetRight"
    impact="128 %"
    :countdown="5"
    ref="riskInfo"
  >
    <template #activator="{ on }">
      <f-button color="warning" v-on="on">Swap</f-button>
    </template>
  </risk-info>
</template>
<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data: () => ({
      assetLeft: {
        symbol: 'BTC',
        amount: '$ 7,323,135,026,28'
      },
      assetRight: {
        symbol: 'pUSD',
        amount: '$ 2,64,935,39'
      }
    }),
    method: {
      resetTimer () {
        // You can reset the countdown by call the resetTimer method
        this.$refs.riskInfo.resetTimer();
      }
    }
  })
</script>
```
