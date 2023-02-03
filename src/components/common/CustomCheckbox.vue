<script setup>
defineProps({
  label: {
    type: String,
  },
});
</script>

<template>
  <label class="label">
    <input class="checkbox" type="checkbox" :value="label" />
    {{ label }}
  </label>
</template>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
}
.label {
  margin: 5px;
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}
</style>
