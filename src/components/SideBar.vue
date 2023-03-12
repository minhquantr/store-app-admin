<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  displayMode: {
    type: String,
    default: "default", // "default" || "compact" || "top-collapsible"
  },
});
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img alt="Store logo" class="logo" src="@/assets/logo.png" />
      <h1 class="title">{{ msg }}</h1>
    </div>
    <div class="sidebar-body">
      <div
        v-if="displayMode == 'top-collapsible' ? !isCollapsedColumn : stores"
        class="store-nav"
      >
        <span
          href="#"
          class="store-link"
          v-for="item in stores"
          :class="{ active: item.id == selectedStoreId }"
          :id="item.id"
          :name="item.name"
          :key="item.id"
          @click="selectStore"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div
      class="collapse-action"
      v-if="displayMode == 'top-collapsible'"
      @click="collapseHandler"
    >
      <img
        v-if="isCollapsedColumn"
        src="@/assets/downward-arrow-icon.jpg"
        width="50"
      />
      <img
        v-if="!isCollapsedColumn"
        src="@/assets/upward-arrow-icon.jpg"
        width="50"
      />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}

.sidebar {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  background-color: #fde38d;
  box-shadow: 0 0px 10px rgba(47, 208, 155, 0.5);

  padding: v-bind("sideBarCSS.padding");
  min-width: v-bind("sideBarCSS.minWidth");
  width: v-bind("sideBarCSS.width");
  border-radius: v-bind("sideBarCSS.borderRadius");
  flex-grow: v-bind("sideBarCSS.flexGrow");
}

.sidebar-header {
  display: flex;
  align-items: center;
  height: 100px;
}
.sidebar-body {
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
}

.sidebar .logo {
  width: 100px;
  height: 100px;
}

.sidebar .title {
  font-size: 25px;
  font-weight: 700;
  margin-left: 10px;
  display: v-bind("sideBarTitleCSS.display");
}

.store-nav {
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
}

.store-link {
  cursor: pointer;
  font-size: 20px;
  padding: 10px 10px;
  text-align: center;
  border-bottom: 1px solid;
}
.store-link:first-of-type {
  border-top: 1px solid;
}
.store-link:hover {
  background-color: #fff8df;
}
.store-link.active {
  background-color: #fff8df;
}
.collapse-action {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>

<script>
export default {
  data() {
    return {
      stores: null,
      selectedStoreId: null,
      isCollapsedColumn: false,
    };
  },
  computed: {
    sideBarCSS() {
      let styling = {
        minWidth: "325px",
        width: "inherit",
        borderRadius: "0px 25px 25px 0px",
        padding: "20px 20px",
      };

      if (this.displayMode == "compact") {
        styling.minWidth = "100px";
        styling.width = "100px";
        styling.padding = "20px 0px";
      } else if (this.displayMode == "top-collapsible") {
        styling.borderRadius = "0px 0px 25px 25px";
        styling.flexGrow = "1";
      }
      return styling;
    },
    sideBarTitleCSS() {
      let styling = {
        display: "flex",
      };
      if (this.displayMode == "compact") {
        styling.display = "none";
      }
      return styling;
    },
  },
  methods: {
    async fetchStores() {
      return;
      const response = await fetch(`${this.$apiHost}/stores`);
      const json = await response.json();
      this.stores = json?.data;
    },
    selectStore(event) {
      if (event) {
        this.selectedStoreId = event.currentTarget.id;
        const storeInfo = {
          id: event.currentTarget.id,
          name: event.currentTarget.innerHTML,
        };
        this.$emit("store-changed", storeInfo);
      }
    },
    collapseHandler(event) {
      if (event) {
        this.isCollapsedColumn = !this.isCollapsedColumn;
      }
    },
  },
  async mounted() {
    await this.fetchStores();
    if (this.stores && this.stores[0]) {
      this.selectedStoreId = this.stores[0].id;
      const storeInfo = {
        id: this.stores[0].id,
        name: this.stores[0].name,
      };
      this.$emit("store-changed", storeInfo);
    }
  },
};
</script>
