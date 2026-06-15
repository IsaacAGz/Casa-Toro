<template>
  <section class="py-12 bg-transparent">
    <!-- Filter Navigation Bars -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-stone-400 block mb-1">Curated Stay</span>
        <h2 class="text-3xl font-serif m-0 text-stone-900">The Valle Experience</h2>
      </div>
      
      <!-- Filter Tabs -->
      <div class="flex gap-2 p-1 bg-stone-100 rounded-none border border-stone-200 font-sans">
        <button 
          v-for="tab in ['all', 'relaxation', 'adventure']" 
          :key="tab"
          @click="activeFilter = tab"
          :class="[
            'px-4 py-2 text-xs uppercase tracking-widest transition-all font-medium rounded-none',
            activeFilter === tab 
              ? 'bg-stone-900 text-stone-50 shadow-sm font-semibold' 
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Responsive Layout Grid Matrix -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="exp in filteredExperiences" 
        :key="exp.id"
        class="group bg-white border border-stone-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-stone-200"
      >
        <!-- Card Cover Frame Layout -->
        <div class="relative overflow-hidden aspect-[4/3] bg-stone-100">
          <img 
            :src="exp.image" 
            :alt="exp.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span class="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-sm text-[10px] text-stone-100 tracking-widest uppercase px-2.5 py-1 font-sans">
            {{ exp.category }}
          </span>
        </div>

        <!-- Content Area -->
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-serif font-normal text-stone-900 tracking-wide mt-0 mb-2">
              {{ exp.title }}
            </h3>
            <p class="text-sm leading-relaxed text-stone-600 font-sans m-0">
              {{ exp.description }}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span class="text-xs font-sans tracking-wider text-stone-400 italic">
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
    category: "relaxation",
    description: "Sample bold, estate-grown Nebbiolos and crisp whites right on our concrete viewing deck, curated by a private local sommelier.",
    highlight: "Private vineyard tour included",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Off-Road Mountain Trails",
    category: "adventure",
    description: "Gear up and ride dirt paths slicing directly through old-growth desert fauna up into the rustic mountains flanking Tecate.",
    highlight: "Dual-sport motorbikes provided",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Baja Cosmic Nights",
    category: "relaxation",
    description: "Isolate under dark skies completely free of city glow. Enjoy heavy blankets, a concrete crackling fire pit, and a massive tracking telescope.",
    highlight: "Optimal viewing between June-Oct",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Infinity Pool & Hot Tub",
    category: "relaxation",
    description: "Soak inside an architectural stone hot tub seamlessly overflowing directly into an elegant vista facing endless lines of vines.",
    highlight: "Heated 24/7 via local wood boiler",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Traditional Archery Target Practice",
    category: "adventure",
    description: "Test your focus on our raw wood field range using custom hand-carved recurve bows and arrows alongside specialized instructions.",
    highlight: "All skill levels welcome",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Tactical Target Ranges",
    category: "adventure",
    description: "An isolated, sound-buffered open valley safe space for sports shooting, precise lever-action rifle challenges, and clay throwing.",
    highlight: "Strict safety protocols enforced",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80"
  }
]);

// Dynamic runtime computing filtering
const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') return experiences.value;
  return experiences.value.filter(exp => exp.category === activeFilter.value);
});
</script>