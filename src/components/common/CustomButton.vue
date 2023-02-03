<script setup>
defineProps({
  text: {
    type: String,
  },
});
</script>

<template>
  <Button>{{ text }}</Button>
</template>

<style scoped>
button {
  background-color: #8be9ff;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
  padding: 12px 25px;
  height: 40px;
  text-align: center;
  transition: 200ms;
  box-sizing: border-box;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:not(:disabled):hover,
button:not(:disabled):focus {
  color: white;
}

button:disabled {
  filter: saturate(0.2) opacity(0.5);
  -webkit-filter: saturate(0.2) opacity(0.5);
  cursor: not-allowed;
}
</style>
