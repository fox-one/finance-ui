# AssetRangeInput

## Example

```vue
<template>
  <AssetRangeInput>
    {{ 'Hello AssetRangeInput' }}
  </AssetRangeInput>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { AssetRangeInput } from './AssetRangeInput';

  @Component(
    components: {
      AssetRangeInput
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
