<template>
  <div class="amylase-divide">
    <slot />
  </div>
</template>

<style scoped>
.amylase-divide {
  contain: content;
  display: flex;
  color: #616161;
  margin: 10px 0 10px 0;
}

.amylase-divide::after {
  align-self: center;
  background: color-mix(in srgb, #e0e0e0 50%, gray 50%);
  box-sizing: border-box;
  content: '';
  display: flex;
  flex-grow: 1;
  height: 1px;
  opacity: 0.8;
}

.amylase-divide::before {
  align-self: center;
  background: color-mix(in srgb, #e0e0e0 50%, gray 50%);
  box-sizing: border-box;
  content: '';
  display: flex;
  flex-grow: 1;
  height: 1px;
  opacity: 0.8;
}
</style>
