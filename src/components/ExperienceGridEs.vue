<template>
  <section class="py-12 bg-transparent">
    <!-- Emcabezado-->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--color-border-main)] pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-[var(--color-text-light)] block mb-1">Estancia Curada</span>
        <h2 class="text-3xl md:text-4xl font-display leading-tight m-0 text-balance border-0 pb-0">La Experiencia del Valle</h2>
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

const activeFilter = ref('todos');

const experiences = ref([
  {
    id: 1,
    title: "Cata de Vinos Privada",
    description: "Prueba intensos Nebbiolos de la casa y blancos refrescantes en nuestra terraza de concreto, guiado por un sommelier local privado.",
    highlight: "Recorrido por viñedos incluido",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Noches Cósmicas de Baja",
    description: "Aíslate bajo cielos oscuros libres de contaminación lumínica. Disfruta de cobijas abrigadoras, una fogata exterior y un telescopio de rastreo profesional.",
    highlight: "Visibilidad óptima de junio a octubre",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Alberca y Jacuzzi Panomárico",
    description: "Sumérgete en un jacuzzi de piedra arquitectónica que se desborda sutilmente hacia una vista panorámica frente a interminables líneas de vides.",
    highlight: "Climatizado 24/7 con caldera de leña",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  }
]);

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'todos') return experiences.value;
  // Mapeo interno para asegurar el correcto filtrado lógico usando los tags en español
  return experiences.value.filter(exp => exp.category === activeFilter.value);
});
</script>