<script setup>
defineProps({
  selected: String,
  options: {
    type: String,
  },
});
</script>

<template>
  <div class="select">
    <select>
      <option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
        :selected="item.value == selected"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  font-size: 15px;
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0px;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  background-color: rgb(241, 241, 241);
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 10em;
  height: 40px;
  border-radius: 0.25em;
  overflow: hidden;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
  background-color: #8be9ff;
  transition: 0.25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #ffffff;
}
</style>
