<script setup>
import StoreProductItem from "./StoreProductItem.vue";
import CustomButton from "./common/CustomButton.vue";
import CustomSelect from "./common/CustomSelect.vue";
import CustomCheckbox from "./common/CustomCheckbox.vue";
</script>

<template>
  <div class="container">
    <div class="action-section">
      <div class="filter-section">
        <CustomButton text="Filter" @click="openFilterPanelHandler" />
      </div>

      <div class="sort-section">
        <CustomSelect
          text="Filter"
          :options="sortOptions"
          :selected="sortOptions[0].value"
          @change="selectSortOptionHandler"
        />
      </div>

      <div class="filter-panel" :class="{ show: openFilterPanel }">
        <span class="label">Toppings:</span>
        <div class="filter-topping-options">
          <CustomCheckbox label="Aloe" @click="selectFilterHandler" />
          <CustomCheckbox label="Milk" @click="selectFilterHandler" />
          <CustomCheckbox label="Milk Foam" @click="selectFilterHandler" />
          <CustomCheckbox label="Pearl" @click="selectFilterHandler" />
        </div>
      </div>
    </div>
    <hr class="section-break" />
    <img
      v-if="isFetching"
      class="loader"
      src="@/assets/loader.svg"
      width="70"
    />

    <div v-if="storeProducts && !isFetching" class="list-section">
      <StoreProductItem
        v-for="item in storeProducts"
        :id="item.id"
        :productCode="item.productCode"
        :name="item.name"
        :price="item.price"
        :toppings="item.toppings"
        :isTrending="item.isTrending"
        :index="index"
        :key="item.id"
        :displayMode="storeProductItemDisplayMode"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.action-section {
  display: flex;
  flex-wrap: wrap;
}
.action-section .sort-section {
  margin-left: 10px;
}

.section-break {
  border: 1px solid lightgray;
  margin-top: 10px;
  margin-bottom: 25px;
}
.list-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-panel {
  margin-top: 10px;
  border: 1px solid rgb(35, 173, 207);
  border-radius: 4px;
  padding: 10px 10px;
  width: 100%;
  display: none;
}

.filter-panel .label {
  width: 100%;
  font-size: 16px;
  font-weight: 600;
}

.filter-panel.show {
  display: flex;
  flex-direction: column;
}

.filter-topping-options {
  margin-top: 10px;
  width: 100%;
}

.loader {
  margin: auto;
}
</style>

<script>
export default {
  inject: ["screenSize", "selectedStore"],
  data() {
    return {
      isFetching: false,
      storeProducts: null,
      openFilterPanel: false,
      selectedFilterOptions: [],
      selectedSortOption: "name-asc",
      sortOptions: [
        {
          name: "Name (Asc)",
          value: "name-asc",
        },
        {
          name: "Name (Desc)",
          value: "name-desc",
        },
        {
          name: "Price (Asc)",
          value: "price-asc",
        },
        {
          name: "Price (Desc)",
          value: "price-desc",
        },
      ],
    };
  },
  computed: {
    storeProductItemDisplayMode() {
      if (this.screenSize <= this.$bps.sm) {
        return "single-column";
      }
      return "";
    },
  },
  methods: {
    async fetchStoreProducts() {
      const storeId = this.selectedStore?.id;
      if (!storeId) return;
      this.isFetching = true;

      const sortBy = this.selectedSortOption;
      const filterBy = this.selectedFilterOptions.map((option) => {
        return `filterBy[]=${encodeURIComponent(option)}`;
      });

      const response = await fetch(
        `${this.$apiHost}/stores/${storeId}?sortBy=${sortBy}&${filterBy.join(
          "&"
        )}`
      );
      const json = await response.json();
      this.storeProducts = json?.data;
      this.isFetching = false;
    },
    selectSortOptionHandler(event) {
      if (event) {
        this.selectedSortOption = event.target.value;
      }
    },
    openFilterPanelHandler(event) {
      if (event) {
        this.openFilterPanel = !this.openFilterPanel;
      }
    },
    selectFilterHandler(event) {
      if (event) {
        const isChecked = event.target.checked;
        const value = event.target.value;
        if (isChecked) this.selectedFilterOptions.push(value);
        else
          this.selectedFilterOptions = this.selectedFilterOptions.filter(
            (option) => option !== value
          );
      }
    },
  },
  mounted() {
    this.fetchStoreProducts();
  },
  watch: {
    selectedStore: {
      handler(store) {
        this.fetchStoreProducts(store.id);
      },
    },
    selectedFilterOptions: {
      handler() {
        this.fetchStoreProducts(this.selectedStore?.id);
      },
      deep: true,
    },
    selectedSortOption: {
      handler() {
        this.fetchStoreProducts(this.selectedStore?.id);
      },
      deep: true,
    },
  },
};
</script>
