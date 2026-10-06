<template>
  <section class="py-12 bg-transparent">
    <!-- Header Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--color-border-main)] pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-[var(--color-text-light)] block mb-1">Curated Stay</span>
        <h2 class="text-3xl md:text-4xl font-display leading-tight m-0 text-balance border-0 pb-0">The Valle Experience</h2>
      </div>
    </div>

    <div class="experience-grid">
      <article
        v-for="(exp, index) in filteredExperiences"
        :key="exp.id"
        class="experience-panel"
        :class="{ 'experience-panel--lift': index === 1 }"
      >
        <div class="experience-panel-media">
          <img
            :src="exp.image"
            :alt="exp.title"
          />
        </div>
        <div class="experience-panel-copy">
          <div>
            <h3>{{ exp.title }}</h3>
            <p>{{ exp.description }}</p>
          </div>
          <span class="experience-highlight">{{ exp.highlight }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Filter state tracking
const activeFilter = ref('all');

// Curated data set tailored strictly for luxury modern rustic Baja property vibes
const experiences = ref([
  {
    id: 1,
    title: "Estate Wine Tasting",
    description: "Sample bold, estate-grown Nebbiolos and crisp whites right on our concrete viewing deck, curated by a private local sommelier.",
    highlight: "Private vineyard tour included",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Baja Cosmic Nights",
    description: "Isolate under dark skies completely free of city glow. Enjoy heavy blankets, a concrete crackling fire pit, and a massive tracking telescope.",
    highlight: "Optimal viewing between June-Oct",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Panoramic Pool and Jacuzzi",
    description: "A private, heated pool with a panoramic view of the surrounding desert and mountains, perfect for sunbathing or romantic evenings.",
    highlight: "Heating available year-round",
    image: "/images/pool.jpeg"
  }
]);

// Dynamic runtime computing filtering
const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') return experiences.value;
  return experiences.value.filter(exp => exp.category === activeFilter.value);
});
</script>