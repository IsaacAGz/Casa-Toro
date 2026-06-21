<template>
  <section class="py-12 bg-transparent">
    <!-- Navegación de Filtros -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 pb-6 mb-10 gap-4">
      <div>
        <span class="text-xs font-sans tracking-widest uppercase text-stone-400 block mb-1">Estancia Curada</span>
        <h2 class="text-3xl font-serif m-0 text-stone-900 uppercase tracking-wide">La Experiencia del Valle</h2>
      </div>
      
      <!-- Pestañas de Filtro -->
      <div class="flex gap-2 p-1 bg-stone-100 rounded-none border border-stone-200 font-sans">
        <button 
          v-for="tab in ['todos', 'relajación', 'aventura']" 
          :key="tab"
          @click="activeFilter = tab"
          :class="[
            'px-4 py-2 text-xs uppercase tracking-widest transition-all font-medium rounded-none cursor-pointer',
            activeFilter === tab 
              ? 'bg-stone-900 text-stone-50 shadow-sm font-semibold' 
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          ]"
        >
          {{ tab }}
        </button>
      </div>
    </div>

    <!-- Matriz de Cuadrícula Responsiva -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="exp in filteredExperiences" 
        :key="exp.id"
        class="group bg-white border border-stone-100 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-stone-200"
      >
        <!-- Marco de la Imagen -->
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

        <!-- Área de Contenido -->
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

const activeFilter = ref('todos');

const experiences = ref([
  {
    id: 1,
    title: "Cata de Vinos Privada",
    category: "relajación",
    description: "Prueba intensos Nebbiolos de la casa y blancos refrescantes en nuestra terraza de concreto, guiado por un sommelier local privado.",
    highlight: "Recorrido por viñedos incluido",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Senderos de Montaña Off-Road",
    category: "aventura",
    description: "Equípate y recorre caminos de tierra que cruzan la flora desértica directamente hacia las imponentes montañas que flanquean Tecate.",
    highlight: "Motos doble propósito provistas",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Noches Cósmicas de Baja",
    category: "relajación",
    description: "Aíslate bajo cielos oscuros libres de contaminación lumínica. Disfruta de cobijas abrigadoras, una fogata exterior y un telescopio de rastreo profesional.",
    highlight: "Visibilidad óptima de junio a octubre",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Alberca Infinita y Jacuzzi",
    category: "relajación",
    description: "Sumérgete en un jacuzzi de piedra arquitectónica que se desborda sutilmente hacia una vista panorámica frente a interminables líneas de vides.",
    highlight: "Climatizado 24/7 con caldera de leña",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Práctica Tradicional de Tiro con Arco",
    category: "aventura",
    description: "Pon a prueba tu enfoque en nuestro campo de tiro de madera rústica utilizando arcos recurrentes tallados a mano y flechas personalizadas.",
    highlight: "Todos los niveles son bienvenidos",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Campos de Tiro Deportivo",
    category: "aventura",
    description: "Un espacio seguro, aislado y acústicamente amortiguado en el valle para tiro deportivo de precisión, desafíos con rifles de palanca y lanzamiento de platillos.",
    highlight: "Estrictos protocolos de seguridad",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80"
  }
]);

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'todos') return experiences.value;
  // Mapeo interno para asegurar el correcto filtrado lógico usando los tags en español
  return experiences.value.filter(exp => exp.category === activeFilter.value);
});
</script>