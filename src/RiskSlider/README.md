# RiskSlider

## Example

```vue
<template>
  <RiskSlider>
    {{ 'Hello RiskSlider' }}
  </RiskSlider>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { RiskSlider } from './RiskSlider';

  @Component(
    components: {
      RiskSlider
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
