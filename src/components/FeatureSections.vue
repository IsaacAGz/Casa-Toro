<template>
  <div class="feature-bleed" ref="rootRef">
    <section
      v-for="(block, i) in blocks"
      :key="block.eyebrow"
      class="feature-block"
      :class="{ 'feature-block--reverse': i % 2 === 1 }"
    >
      <div class="feature-media">
        <img :src="block.image" :alt="block.headline" loading="lazy" />
      </div>
      <div class="feature-copy">
        <span class="feature-eyebrow">{{ block.eyebrow }}</span>
        <h2 class="feature-headline">{{ block.headline }}</h2>
        <p class="feature-body">{{ block.body }}</p>
        <a :href="block.href" class="feature-cta">{{ block.cta }}</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  locale: {
    type: String,
    default: 'en',
  },
})

const rootRef = ref(null)
let observer

const content = {
  en: [
    {
      eyebrow: 'Stay',
      headline: 'Modern comforts, immersed in wilderness',
      body: 'A thoughtfully designed concrete and timber haven perched above the valley—space to simply be, rest, and take in the ridgelines beyond.',
      cta: 'Explore the cabin',
      href: '/en/about',
      image: '/images/placeholders/cabin-golden-hour.jpg',
    },
    {
      eyebrow: 'Pool',
      headline: 'Unwind overlooking the valley',
      body: 'Sun on your skin and still water against stone—our private pool and infinity hot tub frame the desert hills in every season.',
      cta: 'View the sanctuary',
      href: '/en/about',
      image: '/images/placeholders/pool-ridge.jpg',
    },
    {
      eyebrow: 'Inside',
      headline: 'Quiet rooms of concrete and timber',
      body: 'Raw walls, soft linen, and wide glass that frames the valley—an interior designed for slow mornings and unhurried evenings.',
      cta: 'Explore the cabin',
      href: '/en/about',
      image: '/images/placeholders/cabin-interior.jpg',
    },
    {
      eyebrow: 'Deck',
      headline: 'Panoramic skies that invite stillness',
      body: 'Step onto the viewing deck for vineyard horizons by day and dark-sky stargazing by night—blankets, firelight, and quiet air.',
      cta: 'Discover the deck',
      href: '/en/experiences',
      image: '/images/placeholders/vineyard-deck.jpg',
    },
    {
      eyebrow: 'Experience',
      headline: 'Wine, fire, and open trails',
      body: 'From estate tastings to cosmic nights by the firepit and dusty ridge runs—curated moments that reconnect you with Baja’s wild edge.',
      cta: 'See experiences',
      href: '/en/experiences',
      image: '/images/placeholders/fireside-night.jpg',
    },
    {
      eyebrow: 'Discover',
      headline: 'A sanctuary in Mexico’s wine country',
      body: 'Nestled between Tecate and Ensenada in Valle de Guadalupe—two hours south of San Diego, surrounded by award-winning wineries and open land.',
      cta: 'Find your way',
      href: '/en/location',
      image: '/images/placeholders/trail-dust.jpg',
    },
  ],
  es: [
    {
      eyebrow: 'Estadía',
      headline: 'Comodidades modernas, inmersas en la naturaleza',
      body: 'Un refugio de concreto y madera cuidadosamente diseñado sobre el valle—espacio para simplemente estar, descansar y contemplar las crestas del horizonte.',
      cta: 'Conoce la cabaña',
      href: '/es/about',
      image: '/images/placeholders/cabin-golden-hour.jpg',
    },
    {
      eyebrow: 'Alberca',
      headline: 'Relájate con vista al valle',
      body: 'Sol sobre la piel y agua quieta contra la piedra—nuestra alberca privada y jacuzzi infinito enmarcan las colinas del desierto en cada temporada.',
      cta: 'Ver el santuario',
      href: '/es/about',
      image: '/images/placeholders/pool-ridge.jpg',
    },
    {
      eyebrow: 'Interior',
      headline: 'Espacios serenos de concreto y madera',
      body: 'Muros en bruto, lino suave y amplios ventanales hacia el valle—un interior pensado para mañanas lentas y noches sin prisa.',
      cta: 'Conoce la cabaña',
      href: '/es/about',
      image: '/images/placeholders/cabin-interior.jpg',
    },
    {
      eyebrow: 'Terraza',
      headline: 'Cielos panorámicos que invitan a la calma',
      body: 'Sube a la terraza de observación: viñedos de día y estrellas sin contaminación lumínica de noche—mantas, fuego y aire quieto.',
      cta: 'Descubre la terraza',
      href: '/es/experiences',
      image: '/images/placeholders/vineyard-deck.jpg',
    },
    {
      eyebrow: 'Experiencia',
      headline: 'Vino, fuego y senderos abiertos',
      body: 'Desde catas de viñedo hasta noches cósmicas junto al fogón y rutas por la cresta—momentos pensados para reconectar con el lado salvaje de Baja.',
      cta: 'Ver experiencias',
      href: '/es/experiences',
      image: '/images/placeholders/fireside-night.jpg',
    },
    {
      eyebrow: 'Descubre',
      headline: 'Un santuario en la región vinícola de México',
      body: 'Entre Tecate y Ensenada en el Valle de Guadalupe—a dos horas al sur de San Diego, rodeado de viñedos premiados y paisaje abierto.',
      cta: 'Cómo llegar',
      href: '/es/location',
      image: '/images/placeholders/trail-dust.jpg',
    },
  ],
}

const blocks = computed(() => content[props.locale] || content.en)

onMounted(() => {
  const els = rootRef.value?.querySelectorAll('.feature-block')
  if (!els?.length) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.18, rootMargin: '0px 0px -48px 0px' }
  )

  els.forEach((el) => observer.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.feature-bleed {
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
}

.feature-block {
  display: grid;
  grid-template-columns: 1fr;
  min-height: min(72vh, 640px);
  border-bottom: 1px solid var(--color-border-main);
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.feature-media {
  position: relative;
  min-height: 260px;
  overflow: hidden;
  background-color: var(--color-bg-tint);
}

.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s ease;
}

.feature-block:hover .feature-media img {
  transform: scale(1.03);
}

.feature-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 1.5rem 3rem;
  background-color: var(--color-bg-surface);
  color: var(--color-text-main);
}

.feature-eyebrow {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.feature-headline {
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.15;
  text-transform: uppercase;
  color: var(--color-text-title);
  margin: 0 0 1.25rem;
  border: none !important;
  padding: 0 !important;
}

.feature-body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text-muted);
  margin: 0 0 1.75rem;
  max-width: 28rem;
}

.feature-cta {
  align-self: flex-start;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent) !important;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 0.2rem;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.feature-cta:hover {
  color: var(--color-accent-hover) !important;
  border-color: var(--color-accent-hover);
}

@media (min-width: 900px) {
  .feature-block {
    grid-template-columns: 1.15fr 1fr;
  }

  .feature-block--reverse {
    grid-template-columns: 1fr 1.15fr;
  }

  .feature-block--reverse .feature-media {
    order: 2;
  }

  .feature-block--reverse .feature-copy {
    order: 1;
  }

  .feature-copy {
    padding: 3.5rem 4rem;
  }

  .feature-media {
    min-height: 100%;
  }
}

@media (max-width: 899px) {
  /* Always image then copy on mobile, even for reverse blocks */
  .feature-block--reverse .feature-media,
  .feature-block--reverse .feature-copy {
    order: initial;
  }

  .feature-media {
    aspect-ratio: 16 / 10;
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-block {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .feature-media img {
    transition: none;
  }

  .feature-block:hover .feature-media img {
    transform: none;
  }
}
</style>
