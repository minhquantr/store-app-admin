<script setup>
defineProps({
  id: {
    type: String,
  },
  productCode: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  toppings: {
    type: String,
  },
  isTrending: {
    type: Boolean,
  },
  displayMode: {
    type: String, // "flex" || "single-column"
    default: "flex",
  },
});
</script>

<template>
  <div class="card">
    <div class="details-section">
      <div class="details code">{{ productCode }}</div>
      <div class="details name">{{ name }}</div>
      <hr />
      <div class="details toppings-label">Toppings:</div>
      <div class="details toppings">{{ toppings }}</div>
    </div>

    <div class="footer-section">
      <div v-if="isTrending" class="badge">⭐ Trending</div>
      <div class="price">${{ price }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  cursor: pointer;
  flex-grow: 0;
  flex-wrap: wrap;
  flex-shrink: 1;
  padding: 15px 20px;
  width: 20%;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0 0px 10px rgba(47, 208, 155, 0.5);
  border: 1px solid transparent;

  width: v-bind("cardCSS.width");
}

.details-section {
  margin-bottom: 50px;
}

.footer-section {
  display: flex;
}

.details {
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
}

.details.code {
  color: #818683;
}
.details.name {
  font-size: 18px;
  /* color: #818683; */
}
.details.toppings-label {
  margin-bottom: 0px;
}
.details.toppings {
  margin-top: 0px;
  font-weight: 400;
  font-size: 14px;
}

.badge {
  background: rgb(255, 42, 42);
  border-radius: 0px 4px 4px 0px;
  color: rgb(255, 255, 255);
  padding: 2px 5px;
  width: 100px;
  font-weight: 600;
  font-size: 13px;
  left: -27px;
}

.price {
  font-weight: 700;
  margin-left: auto;
}
</style>

<script>
export default {
  computed: {
    cardCSS() {
      let styling = {
        width: "200px",
      };
      if (this.displayMode == "single-column") {
        styling.width = "100%";
      }
      return styling;
    },
  },
};
</script>
