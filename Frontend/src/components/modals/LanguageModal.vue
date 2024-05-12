<template>
    <Dialog v-model:visible="innerVisible" :modal="true" :header="$t('language_modal.header')"
        :style="{ width: '100%', maxWidth: '25rem' }">
        <div class="grid-container">
            <div class="grid-item">
                <RadioButton v-model="lang" class="mr-2" id="br" name="br" value="br"> </RadioButton>
                <label>Português</label>
            </div>
            <div class="grid-item">
                <RadioButton v-model="lang" class="mr-2" id="en" name="en" value="en"> </RadioButton>
                <label>English</label>
            </div>
        </div>
        <template v-slot:footer>
            <Button :label="$t('language_modal.button_cancel')" severity="secondary" @click="onCancel"></Button>
            <Button icon="pi pi-check" severity="success" :label="$t('language_modal.button_save')"
                @click="onSave"></Button>
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'LanguageModal',
    props: {
        visible: Boolean
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
        }
    },
    setup() {
        const store = useStore()
        const language = store.state.locale;

        const updateLanguage = async (lang: string) => {
            store.commit('setLocale', { locale: lang });
            window.location.reload();
        };

        return {
            updateLanguage,
            language,
            store,
        }
    },
    data() {
        return {
            lang: ''
        }
    },
    mounted() {
        this.lang = this.language;
    },
    methods: {
        onSave() {
            this.updateLanguage(this.lang);
        },
        onCancel() {
            this.innerVisible = false;
        }
    }
})

</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr 1fr;
    }
}
</style>