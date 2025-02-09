## Amylase-UI

Windows 11 风格的 Vue 组件库，基本符合 [Fluent 2 Design System][1]，样式以移植 [Fluent UI React v9][2] 为主，部分设计参考 [Fluent UI Web Components][3]

在 [Altermoe/WinUI-Vue][4] 的项目基础上创建，并进行小修改

大多数组件由 [Altermoe][5] 创建

## Usage

通过原作者 [docs][6] 调用得出

与 Fluent UI React v9 类似，命名导入 `ThemeProvider`，将它放置在根组件中

需要调用组件时，手动导入

## Example

```vue
// App.vue

<script setup lang="ts">
import { ThemeProvider } from '@floatsheep/amylase-ui' // or is winui-vue
import TestPage from './components/TestPage.vue'
</script>

<template>
  <ThemeProvider>
    <TestPage />
  </ThemeProvider>
</template>
```

```vue
// TestPage.vue
<script setup lang="ts">
import { Button, Card } from '@floatsheep/amylase-ui'
</script>

<template>
  <Card>
    <p>Hi, there!</p>
    <Button type="accent">
      Click Me!
    </Button>
  </Card>
</template>
```

[1]: https://fluent2.microsoft.design
[2]: https://www.npmjs.com/package/@fluentui/react-components
[3]: https://www.npmjs.com/package/@fluentui/web-components
[4]: https://github.com/Altermoe/WinUI-Vue
[5]: https://github.com/Altermoe
[6]: docs
