<template>
    <Dialog v-model:visible="innerVisible" :modal="true" header="Danger Zone"
        :style="{ width: '90%', maxWidth: '25rem' }">
        <span class="pi pi-info-circle mr-2"></span>
        <span>Do you want to delete this record?</span>
        <template v-slot:footer>
            <Button label="Cancel" severity="secondary" class="p-button-text p-button-outlined"
                @click="onCancel"></Button>
            <Button severity="danger" label="Delete" @click="onSave"></Button>
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import axiosInstance from '@/http/index';
export default defineComponent({
    name: 'DeleteModal',
    props: {
        id: String,
        visible: Boolean,
        items: String
    },
    data() {
        return {
        }
    },
    computed: {
        innerVisible: {
            get(): boolean {
                return this.visible;
            },
            set(value: boolean) {
                if (!value) {
                    this.$emit('update:visible', value)
                }
            }
        },
    },
    methods: {
        async deleteItem() {
            try {
                await axiosInstance.delete(`/${this.items}/${this.id}`);
            } catch (error) {
                console.error('Error deleting item', error);
            }
        },
        onCancel() {
            this.innerVisible = false;
        },
        onSave() {
            this.deleteItem();
            this.innerVisible = false;
            this.$emit('itemDeleted', this.id);
        }
    },
});
</script>

<style scoped>
.p-button-outlined {
    border-color: rgba(190, 190, 190, 0.534);
}
</style>