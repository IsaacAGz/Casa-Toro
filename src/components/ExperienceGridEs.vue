<template>
  <section class="py-12 bg-transparent">
    <!-- Emcabezado-->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--color-border-main)] pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-[var(--color-text-light)] block mb-1">Estancia Curada</span>
        <h2 class="text-3xl font-serif m-0 text-yellow uppercase tracking-wide">La Experiencia del Valle</h2>
      </div>
    </div>

    <!-- Matriz de Cuadrícula Responsiva -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div 
        v-for="exp in filteredExperiences" 
        :key="exp.id"
        class="group bg-[var(--color-bg-datacard)] border border-[var(--color-border-main)] shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-stone-200"
      >
        <!-- Marco de la Imagen -->
        <div class="relative overflow-hidden aspect-[4/3] bg-[var(--color-bg-tint)]">
          <img 
            :src="exp.image" 
            :alt="exp.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <!-- Área de Contenido -->
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