<template>
  <section class="py-12 bg-transparent">
    <!-- Header Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--color-border-main)] pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-[var(--color-text-light)] block mb-1">Curated Stay</span>
        <h2 class="text-3xl font-serif m-0 text-yellow uppercase tracking-wide">The Valle Experience</h2>
      </div>
    </div>

    <!-- Responsive Layout Grid Matrix -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div 
        v-for="exp in filteredExperiences" 
        :key="exp.id"
        class="group bg-[var(--color-bg-datacard)] border border-[var(--color-border-main)] shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-stone-200"
      >
        <!-- Card Cover Frame Layout -->
        <div class="relative overflow-hidden aspect-[4/3] bg-[var(--color-bg-tint)]">
          <img 
            :src="exp.image" 
            :alt="exp.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <!-- Content Area -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-serif font-normal text-[var(--color-text-main)] tracking-wide mt-0 mb-2">
              {{ exp.title }}
            </h3>
            <p class="text-sm leading-relaxed text-[var(--color-text-muted)] font-sans m-0">
              {{ exp.description }}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span class="text-xs font-sans tracking-wider text-[var(--color-text-light)] italic">
              {{ exp.highlight }}
            </span>
          </div>
        </div>
      </div>
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