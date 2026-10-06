<template>
  <div class="gallery" ref="galleryRef">
    <div
      v-for="(band, bandIndex) in bands"
      :key="`band-${bandIndex}`"
      class="gallery-band"
      :class="{ 'gallery-band--reverse': band.reverse }"
    >
      <figure class="gallery-feature gallery-item">
        <img
          :src="band.large"
          :alt="`Casa Toro gallery feature ${bandIndex + 1}`"
          loading="lazy"
        />
      </figure>

      <div class="gallery-side">
        <figure
          v-for="(src, sideIndex) in band.sides"
          :key="src"
          class="gallery-thumb gallery-item"
          :style="{ transitionDelay: `${(sideIndex + 1) * 90}ms` }"
        >
          <img
            :src="src"
            :alt="`Casa Toro gallery detail ${bandIndex + 1}-${sideIndex + 1}`"
            loading="lazy"
          />
        </figure>
      </div>
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

// Mosaic bands: one large (full/uncropped) + 2–3 smaller side images
const bands = [
  {
    large: images[0],
    sides: [images[1], images[2]],
    reverse: false,
  },
  {
    large: images[3],
    sides: [images[4], images[5], images[6]],
    reverse: true,
  },
  {
    large: images[7],
    sides: [images[8], images[9]],
    reverse: false,
  },
]

onMounted(() => {
  const items = galleryRef.value?.querySelectorAll('.gallery-item')
  if (!items?.length) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  items.forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0;
}

.gallery-band {
  display: grid;
  grid-template-columns: minmax(0, 2.4fr) minmax(140px, 1fr);
  gap: 0.6rem;
  min-height: clamp(280px, 42vw, 520px);
}

.gallery-band--reverse {
  grid-template-columns: minmax(140px, 1fr) minmax(0, 2.4fr);
}

.gallery-band--reverse .gallery-feature {
  order: 2;
}

.gallery-band--reverse .gallery-side {
  order: 1;
}

.gallery-item {
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  background-color: var(--color-bg-tint);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Large feature: show the full image, no crop */
.gallery-feature {
  display: grid;
  place-items: center;
  overflow: hidden;
  height: 100%;
  min-height: inherit;
}

.gallery-feature img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.7s ease;
}

.gallery-feature:hover img {
  transform: scale(1.02);
}

/* Side stack: 2–3 smaller images */
.gallery-side {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-height: 100%;
}

.gallery-thumb {
  flex: 1 1 0;
  overflow: hidden;
  min-height: 0;
}

.gallery-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.gallery-thumb:hover img {
  transform: scale(1.04);
}

@media (max-width: 768px) {
  .gallery-band,
  .gallery-band--reverse {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .gallery-band--reverse .gallery-feature,
  .gallery-band--reverse .gallery-side {
    order: initial;
  }

  .gallery-feature {
    min-height: 240px;
    aspect-ratio: 4 / 3;
  }

  .gallery-side {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .gallery-side .gallery-thumb:nth-child(3) {
    grid-column: 1 / -1;
    min-height: 140px;
  }

  .gallery-thumb {
    aspect-ratio: 4 / 3;
    flex: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-item {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .gallery-feature:hover img,
  .gallery-thumb:hover img {
    transform: none;
  }
}
</style>
