/* AMBER'S ESSENTIAL TOUCH — shared content model
   Extracted from the Claude Design home component (renderVals) +
   03_SPECIFICATION.md. One place to edit services, products, hours. */

const AET = {
  phone: '+15102286657',
  phoneDisplay: '(510) 228-6657',
  email: 'ambersessentialtouch@gmail.com',
  address: '1622 Michael Dr, Pinole, CA 94564',
  mapsUrl: 'https://maps.google.com/?q=1622+Michael+Dr,+Pinole,+CA+94564',
  facebook: 'https://www.facebook.com/aetouch/',

  /* Studio hours per 03_SPECIFICATION.md (Wed–Fri 9:30–7:30, Sat 9:30–5, Sun 11–2).
     day: 0=Sun … 6=Sat. Times are minutes from midnight. */
  hours: {
    0: { open: 11 * 60, close: 14 * 60 },        // Sun 11:00–2:00
    3: { open: 9 * 60 + 30, close: 19 * 60 + 30 }, // Wed 9:30–7:30
    4: { open: 9 * 60 + 30, close: 19 * 60 + 30 }, // Thu
    5: { open: 9 * 60 + 30, close: 19 * 60 + 30 }, // Fri
    6: { open: 9 * 60 + 30, close: 17 * 60 },      // Sat 9:30–5:00
  },
  hoursDisplay: 'Wed–Fri 9:30a–7:30p · Sat 9:30a–5p · Sun 11a–2p · By appointment',

  services: [
    {
      id: 'facial',
      name: 'Consultation Facial',
      desc: 'Consultation-based facials. Extractions, peels, enzyme work — shaped to your skin on the day.',
      meta: '60–90 MIN · FROM $95',
      duration: 90,
      gradient: 'linear-gradient(150deg, #F5EBE6, #EFDFE3)',
    },
    {
      id: 'acne',
      name: 'Acne-Focused Treatment',
      desc: 'Protocol-based, multi-visit care that supports clearer skin. Aftercare included.',
      meta: '60 MIN · FROM $110',
      duration: 60,
      gradient: 'linear-gradient(150deg, #EFDFE3, #D89BAA)',
    },
    {
      id: 'wax',
      name: 'Body Waxing & Brow Care',
      desc: 'Over a decade of precision. Full body, all skin types, unhurried.',
      meta: '15–90 MIN · FROM $25',
      duration: 60,
      gradient: 'linear-gradient(150deg, #F7F1E8, #E8D9C8)',
    },
    {
      id: 'manicure',
      name: 'Manicure',
      desc: 'Clean, unhurried, aftercare-forward hand care.',
      meta: '45 MIN · FROM $45',
      duration: 45,
      gradient: 'linear-gradient(150deg, #EEF0EA, #CFDACB)',
    },
    {
      id: 'ritual',
      name: 'Monthly Ritual Plan',
      desc: 'Build a regimen. Bi-monthly or quarterly visits, planned around your skin’s pace.',
      meta: 'CUSTOM · FROM $180/MO',
      duration: 90,
      gradient: 'linear-gradient(150deg, #EDE7F0, #D7C6E6)',
    },
    {
      id: 'consult',
      name: 'Skin Consultation',
      desc: 'Not sure where to begin? Start with a conversation and a plan.',
      meta: 'INCLUDED WITH EVERY VISIT',
      duration: 30,
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
