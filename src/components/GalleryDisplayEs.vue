<template>

    <div class="gallery">
        <div class="gallery-item">
            <img src="/public/images/Jeep-Front_1.jpg">
        </div>
        <div class="gallery-item">
            <img src="/public/images/El-Toro_1.jpg">
        </div>
        <div class="gallery-item">
            <img src="/public/images/Entrance.jpg">
        </div>
        <div class="gallery-item">
            <img src="/public/images/Camping.jpg">
        </div>
        <div class="gallery-item">
            <img src="/public/images/David.jpg">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive data using Composition API
const message = ref('Hello from Vue!')
const count = ref(0)

function increment() {
  count.value++
}

</script>

<style scoped>
.example {
  font-family: sans-serif;
  text-align: center;
  margin-top: 20px;
}
h1 {
  color: #42b883;
}

.gallery{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.gallery-item img {
    width:100%
}
</style>