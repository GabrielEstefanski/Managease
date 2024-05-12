<template>
    <Menubar v-if="isUserId" class="full-width " :class="{ 'open': isComponentOpen, 'small': !isComponentOpen }"
        :style="{ left: isComponentOpen ? '0px' : '220px' }">
        <template #start>
            <div class="centered-content">
                <Button class="button" :class="{ 'active': isComponentOpen }" icon="pi pi-bars"
                    @click="toggleStatus"></Button>
                <Button class="button" icon="pi pi-language" @click="openLanguageModal"/>
            </div>
        </template>
        <template #end>
            <Button class="user-field" @click="handleUserClick" severity="info">
                <i class="pi pi-user-edit mr-2" />
                {{ userName }}
            </Button>
        </template>
    </Menubar>
    <LanguageModal v-if="isLanguageModalVisible" v-model:visible="isLanguageModalVisible"></LanguageModal>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import LanguageModal from '../components/modals/LanguageModal.vue';
import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent({
    name: 'NavBar',
    components: {
        Menubar,
        Button,
        LanguageModal
    },
    setup() {
        const store = useStore();

        const isComponentOpen = computed(() => store.state.isComponentOpen);

        const isUserId = computed(() => store.state.userId);

        const userName = computed(() => store.state.userName);

        const toggleStatus = () => {
            store.commit(isComponentOpen.value ? 'closeComponent' : 'openComponent');
        };

        function handleUserClick() {
            router.push('/settings');
        }

        return {
            isComponentOpen,
            isUserId,
            userName,
            handleUserClick,
            toggleStatus
        };
    },
    data() { 
        return {
            isLanguageModalVisible: false
        }
    },
    methods: {
        openLanguageModal(){
            this.isLanguageModalVisible = true;
        }
    }
});
</script>

<style scoped>
.full-width {
    min-width: 100px;
    width: 100%;
    height: auto;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon-with-border {
    border: 1px solid #ffffff;
    padding: 3px;
    border-radius: 50%;
}

.user-field {
    padding-right: 20px;
    width: auto;
    height: 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.small {
    width: calc(100% - 220px);
}

.centered-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.menubar-title {
    margin-left: 1rem;
    font-weight: bold;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
}

@media screen and (max-width: 768px) {
    .menubar-title {
        font-size: 14px;
    }
}
</style>