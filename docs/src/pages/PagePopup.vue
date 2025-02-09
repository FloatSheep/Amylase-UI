<script lang="ts" setup>
import { AppPage } from '../components'
import { Button, Card, Popup } from '@/components'

const showPopup = Popup()
</script>

<template>
  <AppPage>
    <Card>
      <div class="flex flex-wrap gap-2">
        <Button type="standard" @click="showPopup({ title: 'Info', type: 'info', content: 'This is a info popup' })">
          Info
        </Button>
        <Button type="standard" @click="showPopup({ title: 'Warning', type: 'warning', content: 'This is a warning popup' })">
          Warning
        </Button>
        <Button type="standard" @click="showPopup({ title: 'Error', type: 'error', content: 'This is a error popup' })">
          Error
        </Button>
        <Button type="standard" @click="showPopup({ title: 'Success', type: 'success', content: 'This is a success popup' })">
          Success
        </Button>
      </div>
    </Card>
  </AppPage>
</template>
