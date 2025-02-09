<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Info',
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
})

const visible = ref(true)
const fadeOut = ref(false)

const type = props.type
const title = props.title
const content = props.content

const close = () => {
  fadeOut.value = true
  setTimeout(() => {
    visible.value = false
  }, 100)
}

defineExpose({
  close,
})
</script>

<template>
  <div
    v-if="visible"
    class="popup popup-styles"
    :class="[
      fadeOut ? 'fade-out' : '',
      type === 'success' ? 'popup-success' : '',
      type === 'error' ? 'popup-error' : '',
      type === 'warning' ? 'popup-warning' : '',
      type === 'info' ? 'popup-info' : '',
    ]"
  >
    <div class="popup-icon">
      <svg
        v-if="type === 'info'"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 10a8 8 0 1 0-16 0 8 8 0 0 0 16 0ZM9.5 8.91a.5.5 0 0 1 1 0V13.6a.5.5 0 0 1-1 0V8.9Zm-.25-2.16a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else-if="type === 'error'"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM7.8 7.11a.5.5 0 0 0-.63.06l-.06.07a.5.5 0 0 0 .06.64L9.3 10l-2.12 2.12-.06.07a.5.5 0 0 0 .06.64l.07.06c.2.13.47.11.64-.06L10 10.7l2.12 2.12.07.06c.2.13.46.11.64-.06l.06-.07a.5.5 0 0 0-.06-.64L10.7 10l2.12-2.12.06-.07a.5.5 0 0 0-.06-.64l-.07-.06a.5.5 0 0 0-.64.06L10 9.3 7.88 7.17l-.07-.06Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else-if="type === 'success'"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm3.36 5.65a.5.5 0 0 0-.64-.06l-.07.06L9 11.3 7.35 9.65l-.07-.06a.5.5 0 0 0-.7.7l.07.07 2 2 .07.06c.17.11.4.11.56 0l.07-.06 4-4 .07-.08a.5.5 0 0 0-.06-.63Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else-if="type === 'warning'"
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.68 2.79a1.5 1.5 0 0 1 2.64 0l6.5 12A1.5 1.5 0 0 1 16.5 17h-13a1.5 1.5 0 0 1-1.32-2.21l6.5-12ZM10.5 7.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0v-4Zm.25 6.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="content-group">
      <span class="content-title">{{ title }}</span>
      {{ content }}
    </div>
    <div class="close-button">
      <button type="button" class="close-button-inside" aria-label="dismiss" @click="close">
        <svg
          fill="currentColor"
          class="close-button-icon-svg"
          aria-hidden="true"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.09 4.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L10 9.29l5.15-5.14a.5.5 0 0 1 .63-.06l.07.06c.18.17.2.44.06.63l-.06.07L10.71 10l5.14 5.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L10 10.71l-5.15 5.14a.5.5 0 0 1-.63.06l-.07-.06a.5.5 0 0 1-.06-.63l.06-.07L9.29 10 4.15 4.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.popup {
  white-space: nowrap;
  display: grid;
  grid-template: 'icon body secondaryActions actions' 1fr / auto 1fr auto auto;
  padding-left: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  align-items: center;
  min-height: 36px;
  box-sizing: border-box;
  margin: 0;
  animation: fadeInDown 200ms var(--amylase-timing-function-main);
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.popup.fade-out {
  animation: fadeOutUp 200ms var(--amylase-timing-function-main);
}

.popup > .popup-icon {
  grid-area: icon;
  font-size: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.popup > .popup-icon svg {
  display: inline;
  line-height: 0;
}

.popup > .content-group {
  grid-area: body;
  padding-right: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.popup > .content-group > .content-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-right: 0.2rem;
}

.popup > .close-button {
  grid-area: actions;
  padding-right: 12px;
}

.popup > .close-button > .close-button-inside {
  max-width: 24px;
  max-height: 24px;
  font-size: 12px;
  color: #424242;
  border-color: transparent;
  background: transparent;
  line-height: 16px;
  font-weight: 400;
  padding: 1px;
  border-radius: 4px;
}

.popup > .close-button > .close-button-inside:hover {
  color: var(--amylase-color-primary-brand-hover);
  cursor: pointer;
}

.popup > .close-button > .close-button-inside > .close-button-icon {
  width: 20px;
  height: 20px;
  font-size: 20px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.popup > .close-button > .close-button-inside > .close-button-icon svg {
  display: inline;
  line-height: 0;
}

/* Specific styles for each type */
.popup-success {
  border-color: #9fd89f;
  background-color: #f1faf1;
}

.popup-success > .popup-icon {
  color: #0e700e;
}

.popup-error {
  border-color: #eeacb2;
  background-color: #fdf3f4;
}

.popup-error > .popup-icon {
  color: #b10e1c;
}

.popup-warning {
  border-color: #fdcfb4;
  background-color: #fff9f5;
}

.popup-warning > .popup-icon {
  color: #bc4b09;
}

.popup-info {
  border-color: #d1d1d1;
  background-color: #f5f5f5;
}

.popup-info > .popup-icon {
  color: #616161;
}

.pop-styles {
  white-space: nowrap;
  display: grid;
  grid-template: 'icon body secondaryActions actions' 1fr / auto 1fr auto auto;
  padding-left: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  align-items: center;
  min-height: 36px;
  box-sizing: border-box;
  margin: 0;
  animation: fadeInDown 200ms var(--amylase-timing-function-main);
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.pop-styles.fade-out {
  animation: fadeOutUp 200ms var(--amylase-timing-function-main);
}
</style>
