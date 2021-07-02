# RiskSlider

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
