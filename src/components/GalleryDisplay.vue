<template>
    <div class="gallery" ref="galleryRef">
      <div
        v-for="(src, i) in images"
        :key="src"
        class="gallery-item"
        :style="{ transitionDelay: `${(i % 6) * 80}ms` }"
      >
        <img :src="src" :alt="`Casa Toro gallery ${i + 1}`" loading="lazy" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const galleryRef = ref(null)
  let observer
  
  const images = [
    '/images/Jeep-Front_1.jpg',
    '/images/El-Toro_1.jpg',
    '/images/Entrance.jpg',
    '/images/Camping.jpg',
    '/images/David.jpg',
    '/images/Cabin-Bottom.jpg',
    '/images/Cabin-TopView.jpg',
    '/images/Cabin-Indoor.jpg',
    '/images/Night-Cabin.jpg',
    '/images/Cabin-Indoor_1.jpg',
  ]
  
  onMounted(() => {
    const items = galleryRef.value?.querySelectorAll('.gallery-item')
    if (!items?.length) return
  
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
  
    items.forEach((el) => observer.observe(el))
  })
  
  onUnmounted(() => observer?.disconnect())
  </script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 180px;
  gap: 0.75rem;
  padding: 0;
}

.gallery-item {
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s ease;
}

.gallery-item:hover img {
  transform: scale(1.04);
}

/* Feature some cells — adjust nth-child to taste */
.gallery-item:nth-child(1) { grid-column: span 4; grid-row: span 2; }
.gallery-item:nth-child(2) { grid-column: span 2; grid-row: span 2; }
.gallery-item:nth-child(3) { grid-column: span 2; grid-row: span 1; }
.gallery-item:nth-child(4) { grid-column: span 2; }
.gallery-item:nth-child(5) { grid-column: span 2; }
.gallery-item:nth-child(6) { grid-column: span 3; grid-row: span 2; }
.gallery-item:nth-child(7) { grid-column: span 3; grid-row: span 2; }
.gallery-item:nth-child(n+8) { grid-column: span 2; grid-row: span 1; }

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 160px;
  }
  .gallery-item,
  .gallery-item:nth-child(n) {
    grid-column: span 1;
    grid-row: span 1;
  }
  .gallery-item:nth-child(1) {
    grid-column: span 2;
    grid-row: span 2;
  }
}
</style>