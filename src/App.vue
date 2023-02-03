<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/SideBar.vue";
import { computed } from "vue";
</script>

<template>
  <div class="app-container">
    <div class="sidebar">
      <SideBar
        msg="Milk Tea Store"
        :displayMode="sideBarDisplayMode"
        @store-changed="storeChangedHandler"
      />
    </div>
    <div class="content-container">
      <div class="content-header">
        <h1 class="page-title">{{ selectedStore?.name }} Menu</h1>
      </div>
      <div class="content-body">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.content-header {
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  background-image: url("@/assets/banner-pattern.jpg");
  border-radius: 25px 25px;
}
.page-title {
  font-weight: 700;
  font-size: 38px;
  margin: auto;
}
.app-container {
  display: flex;
  min-height: 100vh;

  flex-direction: v-bind("appContainerCSS.flexDirection");
}

.sidebar {
  display: flex;
}

.content-body {
  padding: 25px;
  width: 100%;
}

.content-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
</style>

<script>
export default {
  data() {
    return {
      screenSize: null,
      selectedStore: null,
    };
  },
  provide() {
    return {
      screenSize: computed(() => this.screenSize),
      selectedStore: computed(() => this.selectedStore),
    };
  },
  created() {
    window.addEventListener("resize", this.getScreenSize);
    this.getScreenSize();
  },
  computed: {
    sideBarDisplayMode() {
      if (this.screenSize <= this.$bps.md) {
        return "top-collapsible";
      } else if (this.screenSize <= this.$bps.lg) {
        return "compact";
      } else {
        return "default";
      }
    },
    appContainerCSS() {
      let styling = {
        flexDirection: "inherit",
      };
      if (this.screenSize <= this.$bps.md) {
        styling.flexDirection = "column";
      }
      return styling;
    },
  },
  methods: {
    getScreenSize() {
      this.screenSize = window.innerWidth;
    },
    storeChangedHandler(store) {
      this.selectedStore = store;
    },
  },
};
</script>
