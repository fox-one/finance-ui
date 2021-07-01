# ConnectWallet

## Example

```vue
<template>
  <connect-wallet />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ConnectWallet } from './ConnectWallet';

  @Component(
    components: {
      ConnectWallet
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
