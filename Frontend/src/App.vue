<template>
  <div  class="layout">
    <div  class="navbar">
      <Navbar></Navbar>
    </div>
    <div  >
      <Sidebar></Sidebar>
    </div>
    <div class="content" :style="{ 'padding-left': isComponentOpen || !isUserId ? '0' : '220px' }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Sidebar
  },
  data() {
    const store = useStore();

    const isComponentOpen = computed(() => store.state.isComponentOpen);

    const isUserId = computed(() => store.state.userId);

    const toggleStatus = () => {
      store.commit(isComponentOpen.value ? 'closeComponent' : 'openComponent');
    };

    return {
      isComponentOpen,
      isUserId,
      toggleStatus
    };
  }
});
</script>


<style>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  transition: padding-left 0.3s ease; 
}

.content-wrapper {
  display: flex;
  flex: 1;
  padding-left: 225px !important;
}

.sidebar {
  flex: 0 0 210px;
  background-color: #f0f0f0;
}

.p-menubar {
  left: 225px;
}

.content {
  position: relative !important;
  padding-top: 4vh;
  width: 100%;
  flex: 1;
}
</style>