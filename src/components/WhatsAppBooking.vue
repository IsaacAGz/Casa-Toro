<template>
  <div class="max-w-xl mx-auto my-12 bg-white border border-stone-200/80 p-8 shadow-sm rounded-none font-sans">
    <div class="text-center mb-8">
      <span class="text-[10px] tracking-widest uppercase text-stone-400 block mb-1">Direct Reservations</span>
      <h3 class="font-serif text-2xl font-normal text-stone-900 tracking-wide mt-0 mb-2">Book Your Escape</h3>
      <p class="text-xs text-stone-500 m-0 max-w-sm mx-auto leading-relaxed">
        Select your preferences below to message our on-site concierge directly via WhatsApp to finalize your stay.
      </p>
    </div>

    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">Arrival Date</label>
          <input type="date" v-model="form.arrival" class="w-full text-xs p-3 border border-stone-200 rounded-none bg-stone-50/50 focus:outline-none focus:border-stone-800" />
        </div>
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">Departure Date</label>
          <input type="date" v-model="form.departure" class="w-full text-xs p-3 border border-stone-200 rounded-none bg-stone-50/50 focus:outline-none focus:border-stone-800" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">Number of Guests</label>
          <select v-model="form.guests" class="w-full text-xs p-3 border border-stone-200 rounded-none bg-stone-50/50 focus:outline-none focus:border-stone-800">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="4">4 Guests Max</option>
          </select>
        </div>
        <div>
          <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">Primary Interest</label>
          <select v-model="form.interest" class="w-full text-xs p-3 border border-stone-200 rounded-none bg-stone-50/50 focus:outline-none focus:border-stone-800">
            <option value="Wine Tasting & Relaxation">Wine Tasting & Relaxation</option>
            <option value="Off-Road Motorcycling">Off-Road Motorcycling</option>
            <option value="Archery & Target Practice">Archery & Target Practice</option>
            <option value="Stargazing Retreat">Stargazing Retreat</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-[10px] uppercase tracking-wider text-stone-500 mb-1.5 font-medium">Notes / Special Requests</label>
        <textarea v-model="form.notes" rows="3" placeholder="e.g., Arranging a private sommelier or requesting motorcycle rentals..." class="w-full text-xs p-3 border border-stone-200 rounded-none bg-stone-50/50 focus:outline-none focus:border-stone-800 resize-none"></textarea>
      </div>

      <button 
        @click="sendWhatsAppMessage"
        class="w-full mt-2 bg-stone-900 text-stone-50 py-3.5 text-xs uppercase tracking-widest font-semibold border border-stone-900 transition-all hover:bg-transparent hover:text-stone-900 cursor-pointer"
      >
        Inquire via WhatsApp
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Replace this placeholder phone string strictly with your real property WhatsApp number 
// Format: Country Code (52 for MX) + Area Code + Mobile Number. No spaces or plus signs.
const WHATSAPP_NUMBER = "16196001137"; 

const form = ref({
  arrival: '',
  departure: '',
  guests: '2',
  interest: 'Wine Tasting & Relaxation',
  notes: ''
});

const sendWhatsAppMessage = () => {
  // Construct a polished, clean message format for the booking agent to read
  let message = `Hola Valle Cabin! 👋\n\nI would like to check availability and inquire about a reservation:\n\n`;
  
  if (form.value.arrival) message += `📅 Arrival: ${form.value.arrival}\n`;
  if (form.value.departure) message += `📅 Departure: ${form.value.departure}\n`;
  message += `👥 Guests: ${form.value.guests}\n`;
  message += `🍷 Primary Focus: ${form.value.interest}\n`;
  
  if (form.value.notes.trim()) {
    message += `📝 Special Requests: ${form.value.notes.trim()}\n`;
  }
  
  message += `\nThank you! Looking forward to finalizing my stay.`;

  // Safe encoding of characters to standard URL string formatting
  const encodedMessage = encodeURIComponent(message);
  const targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Smoothly open up the browser tab directly pointing to WhatsApp desktop/mobile application
  window.open(targetUrl, '_blank');
};
</script>