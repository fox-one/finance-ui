# finance-ui

English | [简体中文](./README.zh-CN.md)

## Quick start
### Install dependencies
```shell
yarn
```

### Run project
```shell
yarn start
```
or
```shell
yarn dev
```

### Create a Component
```shell
yarn new
```

*Create a functional Component which name is Button👇*
```shell
yarn new Button -f
```

---

## Build and Release
### Build
```shell
yarn build
```

*Bypass all pre-check before building👇*
```shell
yarn build -n
```

### Release
```shell
yarn release
```

*Ignoring version of iteration👇*
```shell
yarn release -i
```

*Manual specify version of iteration to 0.3.25👇*
```shell
yarn release -m 0.3.25
```

*Bypass all pre-check before release👇*
```shell
yarn release -n
```

**More powerful customizations is in [omni.config.js](https://github.com/omni-door/cli/blob/master/docs/OMNI.md)**
