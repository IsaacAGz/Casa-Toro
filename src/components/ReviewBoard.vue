<template>
  <div class="max-w-4xl mx-auto py-8 font-sans">
    
    <!-- Header Summary Strip -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200/80 pb-8 mb-12 gap-4">
      <div>
        <span class="text-[10px] tracking-widest uppercase text-stone-400 block mb-1">Guest Journal</span>
        <h2 class="text-3xl font-serif font-normal m-0 text-stone-900 tracking-wide uppercase">Stories & Reviews</h2>
      </div>
      <button 
        @click="showForm = !showForm"
        class="bg-stone-900 text-stone-50 px-5 py-2.5 text-xs uppercase tracking-widest font-semibold border border-stone-900 transition-all hover:bg-transparent hover:text-stone-900 cursor-pointer rounded-none"
      >
        {{ showForm ? 'Close Form' : 'Share Your Experience' }}
      </button>
    </div>

    <!-- Interactive Review Form Dropdown Drawer -->
    <Transition name="fade">
      <div v-if="showForm" class="bg-white border border-stone-200/80 p-6 mb-12 shadow-sm">
        <h3 class="text-xs uppercase tracking-widest font-semibold text-stone-800 mt-0 mb-4">Write a Review</h3>
        
        <form @submit.prevent="submitReview" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">Your Name</label>
              <input type="text" v-model="newReview.author" required placeholder="e.g., Isaac A." class="w-full text-xs p-3 border border-stone-200 bg-stone-50/50 focus:outline-none focus:border-stone-800" />
            </div>
            <div>
              <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">Highlight Activity</label>
              <select v-model="newReview.activity" class="w-full text-xs p-3 border border-stone-200 bg-stone-50/50 focus:outline-none focus:border-stone-800">
                <option value="Wine Tasting">Wine Tasting & Relaxation</option>
                <option value="Off-Road Trails">Off-Road Motorcycling</option>
                <option value="Target Practice">Archery & Rifle Lines</option>
                <option value="Stargazing">Stargazing Retreat</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1">Your Story</label>
            <textarea v-model="newReview.text" required rows="4" placeholder="Describe your morning fog views, motorcycle trailing, or nights under the stars..." class="w-full text-xs p-3 border border-stone-200 bg-stone-50/50 focus:outline-none focus:border-stone-800 resize-none"></textarea>
          </div>

          <button type="submit" class="bg-stone-900 text-stone-50 px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-stone-900 transition-all hover:bg-transparent hover:text-stone-900 cursor-pointer">
            Post to Journal
          </button>
        </form>
      </div>
    </Transition>

    <!-- Review Feed Matrix -->
    <div class="space-y-8">
      <div 
        v-for="review in reviews" 
        :key="review.id" 
        class="border-b border-stone-100 pb-8 last:border-none"
      >
        <div class="flex items-center justify-between gap-4 mb-2">
          <h4 class="font-serif text-lg font-normal text-stone-900 m-0 tracking-wide">{{ review.author }}</h4>
          <span class="text-[10px] bg-stone-100 text-stone-500 tracking-wider uppercase px-2 py-0.5 font-medium border border-stone-200/40">
            {{ review.activity }}
          </span>
        </div>
        <p class="text-sm text-stone-600 leading-relaxed m-0 italic font-serif">
          "{ { review.text } }"
        </p>
        <span class="text-[10px] uppercase tracking-wider text-stone-400 block mt-2.5">
          Verified Guest &bull; {{ review.date }}
        </span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const showForm = ref(false);

// Precompiled Luxury Sample Data Feed to populate the list out of the box
const reviews = ref([
  {
    id: 1,
    author: "Elena & Marcus R.",
    activity: "Wine Tasting",
    text: "Waking up to the vineyard fog creeping through the valley canyon was breathtaking. We sat on the concrete deck with coffee, and spent the afternoon tasting incredible local Nebbiolos arranged directly by the concierge.",
    date: "June 2026"
  },
  {
    id: 2,
    author: "Diego T.",
    activity: "Off-Road Trails",
    text: "The dual-sport motorcycle tracks directly out of the back of the property up into the rocky mountains towards Tecate are phenomenal. Rugged, dusty, and completely thrilling. Coming back down to soak in that hot tub was perfection.",
    date: "May 2026"
  },
  {
    id: 3,
    author: "Sophia L.",
    activity: "Stargazing",
    text: "Absolute quietude. The night sky visibility out here is unreal. We could clearly see the band of the Milky Way using the tracking telescope provided on the wooden observation deck. A true architectural masterpiece.",
    date: "April 2026"
  }
]);

const newReview = ref({
  author: '',
  activity: 'Wine Tasting',
  text: ''
});

const submitReview = () => {
  // Push the newly written object directly into local memory state to update user feed view instantly
  reviews.value.unshift({
    id: Date.now(),
    author: newReview.value.author,
    activity: newReview.value.activity,
    text: newReview.value.text,
    date: "Just Now"
  });

  // Reset form inputs and slide the selector drawer shut safely
  newReview.value = { author: '', activity: 'Wine Tasting', text: '' };
  showForm.value = false;
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>