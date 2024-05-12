<template>
    <div class="container">
        <h1>{{ $t('description_page.title') }}</h1>
        <div class="photo-display">
            <img src="../png/me-photo.jpg" class="rounded-image">
            <div class="text-section">
                <h2>GABRIEL BRAGA ESTEFANSKI</h2>
                <p>Full Stack Jr.</p>
                <div class="text-field">
                    <p>
                        {{ $t('description_page.paragraph1') }}
                    </p>
                    <br>
                    <p>
                        {{ $t('description_page.paragraph2') }}
                    </p>
                    <br>
                    <p>
                        {{ $t('description_page.paragraph3') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AboutmePage'
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin: 15px;
}

.text-field {
    margin-top: 40px;
    display: grid;
    width: 100%;
    column-gap: 20px;
}

.rounded-image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
}

.text-section {
    display: flex;
    flex-direction: column;
    padding: 40px;
}

.text-section h2 {
    margin: 0;
    font-size: 2rem;
}

.text-section p {
    margin: 0;
    font-size: 1.2rem;
    color: gray;
    word-wrap: break-word;
}

.photo-display {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 20px;
}

@media (min-width: 768px) {
    .container {
        height: auto;
    }

    .photo-display {
        flex-direction: row;
        height: auto;
        padding: 40px;
    }

    .text-section {
        padding: 0 40px;
    }
}
</style>
