# RiskInfo

## API

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| value(optional) | Controls whether the component is visible or hidden | boolean | `false` |
| prefixCls(optional) | The prefix classname for wholly control the component style | string | `'risk-info'` |
| impact(optional) | The percent impact for UI display | string | `?%` |
| assetLeft(optional) | The component left asset data which above the cancel button | type ASSET | `{}` |
| assetRight(optional) | The component right asset data which above the cancel button | type ASSET | `{}` |
| countdown(optional) | The total countdown for continue button available | number | `0` |
| customText(optional) | The custom text for i18n | type CUSTOM_TEXT | `{ continue: {}, confirm: {} }` |
| customColor(optional) | The custom color theme | type CUSTOM_COLOR | `{ continue: {}, confirm: {} }` |

### Slots
| Name | Description |
| --- | --- |
| activator(optional) | Activate the component when clicked  `{ on: { [eventName]: eventHandler }, value: boolean }` |


## Types

```typescript
interface ASSET {
  symbol: string;
  amount: string;
  name?: string;
  price?: string;
}

interface CUSTOM_TEXT {
  continue?: {
    title?: string;
    highlights?: string[];
    btn_cancel?: string;
    btn_continue?: string;
  };
  confirm?: {
    title?: string;
    content?: string;
    btn_cancel?: string;
    btn_confirm?: string;
  };
}

interface CUSTOM_COLOR {
  continue?: {
    btn_cancel?: string;
    btn_continue?: string;
  };
  confirm?: {
    btn_cancel?: string;
    btn_confirm?: string;
  };
}
```

## Example

### Common Usage
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

### With Custom Text and Color
```vue
<template>
  <risk-info
    :custom-text="customText"
    :custom-color="customColor"
    impact="203.8%"
    :countdown="10"
  >
    <template #activator="{ on }">
      <button v-on="on">Pando</button>
    </template>
  </risk-info>
</template>
<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    data: () => ({
      customText: {
        continue: {
          title: 'Liquidation Warning',
          highlights: ['Collateral rate has reached', 'Liquidation ratio is 150.00%, reach this you will be liquidatioon']
        }
      },
      customColor: {
        continue: {
          btn_cancel: 'f-bg-greyscale-1'
        }
      }
    })
  })
</script>
```