# RiskSlider
## API

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| value(optional) | The slider’s value | string | `''` |
| prefixCls(optional) | The prefix classname for wholly control the component style | string | `'risk-slider'` |
| disabled(optional) | Disable the slider | boolean | `false` |
| scale(optional) | The color distribution scale | type SCALE | `{ low: 0.7, mid: 0.15, high: 0.15 }` |
| tips(optional) | The tips below the slider | type TIPS | `{}` |


## Types

```typescript
type SCALE = {
  low: number;
  mid: number;
  high: number;
};

type TIPS = {
  tip?: string;
  highlight?: string;
}
```
## Example

```vue
<template>
  <risk-slider
    v-model="percent"
    :tips="tips"
    :scale="scale"
    ref="slider"
  />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export class App extends Vue {
    percent = 30;
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
