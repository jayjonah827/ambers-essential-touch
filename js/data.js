/* AMBER'S ESSENTIAL TOUCH — shared content model.
   Public service details below are limited to the current source-backed menu.
   Appointment hours are intentionally not published until Amber confirms them. */

const AET = {
  phone: '+15102286657',
  phoneDisplay: '(510) 228-6657',
  email: 'ambersessentialtouch@gmail.com',
  address: '1622 Michael Dr, Pinole, CA 94564',
  mapsUrl: 'https://maps.google.com/?q=1622+Michael+Dr,+Pinole,+CA+94564',
  facebook: 'https://www.facebook.com/aetouch/',

  hoursDisplay: 'By appointment · Amber confirms each request directly',

  services: [
    {
      id: 'facial',
      name: 'Customized Facials',
      desc: 'A consultation-led facial shaped to your skin, with basic, customized, and teen options.',
      meta: '70–90 MIN · FROM $85',
      duration: 90,
      gradient: 'linear-gradient(150deg, #F5EBE6, #EFDFE3)',
    },
    {
      id: 'peel',
      name: 'Chemical Peels',
      desc: 'Professional peel care selected for your skin. A peel is included in the $150 customized facial when appropriate.',
      meta: 'PRICE CONFIRMED AFTER CONSULTATION',
      duration: 60,
      gradient: 'linear-gradient(150deg, #EFDFE3, #D89BAA)',
    },
    {
      id: 'wax',
      name: 'Full Body Waxing',
      desc: 'Precision waxing for face and body, with options starting at $10.',
      meta: 'FROM $10',
      duration: 60,
      gradient: 'linear-gradient(150deg, #F7F1E8, #E8D9C8)',
    },
    {
      id: 'lashes',
      name: 'Individual Wispy Lashes',
      desc: 'Fan-cluster D-curl lashes for a soft, wispy finish. Introductory offer; confirm current availability with Amber.',
      meta: '$60 INTRODUCTORY OFFER',
      duration: 90,
      gradient: 'linear-gradient(150deg, #EEF0EA, #CFDACB)',
    },
    {
      id: 'led',
      name: 'LED Light Therapy',
      desc: 'A focused 30-minute LED facial session selected for your skin goals.',
      meta: '30 MIN · $50',
      duration: 30,
      gradient: 'linear-gradient(150deg, #EDE7F0, #D7C6E6)',
    },
    {
      id: 'rf',
      name: 'Radio Frequency Facial',
      desc: 'A consultation-led facial using radio frequency as part of a personalized treatment plan.',
      meta: 'PRICE CONFIRMED AFTER CONSULTATION',
      duration: 60,
      gradient: 'linear-gradient(150deg, #F4E8E2, #D9B8B3)',
    },
    {
      id: 'consult',
      name: 'Skin Consultation',
      desc: 'Not sure where to begin? Start with a conversation and a plan.',
      meta: '20 MIN · $25',
      duration: 20,
      gradient: 'linear-gradient(150deg, #EEF0EA, #A9B8A6)',
    },
  ],

  products: [
    {
      id: 'virgin-oil',
      name: 'Purely Essential Virgin Oil',
      desc: '4 ingredients. Shaving, cleansing, healing. Unscented, Hibiscus, or Mango-Pomegranate.',
      price: '2 oz $18 · 8 oz $50',
      gradient: 'linear-gradient(150deg, #F7F1E8, #E8D9C8)',
    },
    {
      id: 'body-butter',
      name: 'Whipped Body Butter',
      desc: 'Shea, mango, and kokum butters whipped with unscented oil. Dense moisture without weight.',
      price: '4 oz $20 · 8 oz $40 · 12 oz $60',
      gradient: 'linear-gradient(150deg, #F5EBE6, #EFDFE3)',
    },
    {
      id: 'crystal-blends',
      name: 'Crystal-Infused Blends',
      desc: 'Rose quartz, amethyst, pyrite, or peacock ore. Each bottle carries intention.',
      price: '$45',
      gradient: 'linear-gradient(150deg, #EDE7F0, #D7C6E6)',
    },
    {
      id: 'starter-kit',
      name: 'Starter Ritual Kit',
      desc: '2 oz oil, 4 oz butter, and one crystal blend. Save $8.',
      price: '$75',
      gradient: 'linear-gradient(150deg, #EEF0EA, #CFDACB)',
    },
  ],
};
