<script lang="ts" setup>
import { AppPage } from '../components'
import { Card, Divide } from '@/components'
</script>

<template>
  <AppPage>
    <Card title="无文字">
      <p>“U R MY SPECIAL”</p>
      <Divide />
      <p>今際の際際で踊りましょう</p>
      <p>東京前線興の都</p>
    </Card>
    <Card title="有文字">
      <p>“U R MY SPECIAL”</p>
      <Divide>下一乐段</Divide>
      <p>今際の際際で踊りましょう</p>
      <p>東京前線興の都</p>
    </Card>
  </AppPage>
</template>
