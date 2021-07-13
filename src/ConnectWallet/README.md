# ConnectWallet
## API

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The prefix classname for wholly control the component style | string | `'connect-wallet'` |
| text(optional) | The custom text for i18n | string \| VNode | `'Connect Wallet'` |


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
