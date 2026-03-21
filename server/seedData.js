require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const SubCategory = require('./models/SubCategory');
const Service = require('./models/Service');

const seedData = [
  {
    name: "Hair Care",
    description: "Premium hair cuts, styling, coloring, and treatments.",
    subCategories: [
      {
        name: "Hair Cuts",
        services: [
          {
            title: "Haircut (Ladies)",
            has_variants: true,
            variants: [
              { label: "Wash + Simple Dry", amount: 169 },
              { label: "Consultation + Style", amount: 249 },
              { label: "Scalp Ritual + Premium Finish", amount: 329 }
            ]
          },
          {
            title: "Junior Blossom",
            has_variants: true,
            variants: [
              { label: "Introductory Refresh", amount: 149 },
              { label: "Signature Blossom Style", amount: 149 },
              { label: "Luxe Transformation", amount: 219 }
            ]
          }
        ]
      },
      {
        name: "Styling",
        services: [
          { title: "Wash & Blowdry (S/M)", has_variants: false, amount: 120, description: "Entry-level: Basic volume & finish" },
          { title: "Wash & Blowdry (Long)", has_variants: false, amount: 150, description: "Entry-level: Detailed drying for longer lengths" },
          { title: "Simple Straight Style", has_variants: false, amount: 150, description: "Entry-level: Clean, straight finish" },
          { title: "Basic Ponytail / Bun", has_variants: false, amount: 120, description: "Entry-level: Quick, elegant up-style" },
          { title: "Blowout with Volume", has_variants: false, amount: 200, description: "Signature: Volume & movement with expert finish" },
          { title: "Curls / Waves Styling", has_variants: false, amount: 250, description: "Signature: Romantic waves or defined curls" },
          { title: "Sleek Straight (Iron)", has_variants: false, amount: 220, description: "Signature: High-shine precision iron finish" },
          { title: "Simple Updo", has_variants: false, amount: 300, description: "Signature: Sophisticated semi-formal styling" }
        ]
      },
      {
        name: "Hair Coloring",
        services: [
          { title: "Root Retouch", has_variants: true, variants: [{ label: "Essential", amount: 199 }, { label: "Ammonia Free Product", amount: 299 }] },
          { title: "Global Color", has_variants: true, variants: [{ label: "Essential", amount: 349 }, { label: "Luxe Gloss Finish", amount: 599 }] },
          { title: "Highlights Partial", has_variants: true, variants: [{ label: "Essential", amount: 399 }, { label: "Luxe Gloss Finish", amount: 699 }] },
          { title: "Highlight Full Head", has_variants: true, variants: [{ label: "Short/Medium Hair", amount: 749 }, { label: "Long Hair", amount: 979 }] },
          { title: "Balayage / Ombre", has_variants: true, variants: [{ label: "Essential", amount: 599 }, { label: "Luxe Dimensional", amount: 899 }] }
        ]
      },
      {
        name: "Toning",
        services: [
          { title: "Tone & Finish", has_variants: false, amount: 199, description: "Applied with colour, neutralises brassiness" },
          { title: "Tone Refresh", has_variants: false, amount: 299, description: "Standalone toning appointment, wash & blowdry included" },
          { title: "Gloss & Glow", has_variants: false, amount: 349, description: "Toner + gloss treatment + blowdry, full finish" }
        ]
      },
      {
        name: "Hair Treatments",
        services: [
          { title: "Deep Conditioning", has_variants: true, variants: [{ label: "Hydration Boost", amount: 149 }, { label: "Hair Spa Ritual", amount: 249 }] },
          { title: "Hair Botox – Short", has_variants: true, variants: [{ label: "Botox Revive", amount: 549 }, { label: "Botox Transformation", amount: 899 }] },
          { title: "Protein – Short", has_variants: true, variants: [{ label: "Strength Reset", amount: 599 }, { label: "Protein Transformation", amount: 949 }] },
          { title: "Keratin – Short", has_variants: true, variants: [{ label: "Smooth & Shine", amount: 699 }, { label: "Masterclass (GK)", amount: 1199 }] }
        ]
      }
    ]
  },
  {
    name: "Nail Care",
    description: "Flawless Detail & Restorative Hand Therapy",
    subCategories: [
      {
        name: "Manicure",
        services: [
          { title: "Classic Manicure", has_variants: false, amount: 89, description: "Nail shaping + filing + warm soak + cuticle tidy + moisturiser + classic polish (30 mins)" },
          { title: "Gel Manicure", has_variants: false, amount: 159, description: "Nail shaping + filing + warm soak + cuticle care + oil + long-lasting gel + LED (45 mins)" },
          { title: "Russian Manicure", has_variants: false, amount: 219, description: "Electric file precision removal + shaping + surface prep + gel polish + no water (60-75 mins)" }
        ]
      },
      {
        name: "Pedicure",
        services: [
          { title: "Classic Pedicure", has_variants: false, amount: 109, description: "Foot soak + shaping + tidy + callus buff + scrub + massage + classic polish (45 mins)" },
          { title: "Gel Pedicure", has_variants: false, amount: 179, description: "Foot soak + shaping + care + scrub + massage + long-lasting gel + LED (60 mins)" },
          { title: "Russian Pedicure", has_variants: false, amount: 249, description: "E-file precision removal + shaping + surface prep + scrub + massage + gel polish (75-90 mins)" }
        ]
      }
    ]
  },
  {
    name: "Brows & Lashes Atelier",
    description: "Precision. Definition. Lasting Beauty.",
    subCategories: [
      {
        name: "Brow Design & Shaping",
        services: [
          { title: "Brow Shape — Threading", has_variants: false, amount: 69 },
          { title: "Brow Shape — Waxing", has_variants: false, amount: 69 },
          { title: "Brow Shape + Tint", has_variants: false, amount: 119 }
        ]
      },
      {
        name: "Lash Extensions",
        services: [
          { title: "Classic Lash Extensions", has_variants: false, amount: 449 },
          { title: "Hybrid Lash Extensions", has_variants: false, amount: 549 },
          { title: "Volume Lash Extensions", has_variants: false, amount: 649 }
        ]
      }
    ]
  },
  {
    name: "Skin & Glow Atelier",
    description: "Advanced Skin Science. Pure Radiance.",
    subCategories: [
      {
        name: "Facial Treatments",
        services: [
          { title: "Deep Cleansing Facial", has_variants: false, amount: 299, duration: "60 mins" },
          { title: "Brightening & Anti-Tan", has_variants: false, amount: 349, duration: "60 mins" },
          { title: "HydraFacial", has_variants: false, amount: 649, duration: "75 mins" }
        ]
      }
    ]
  },
  {
    name: "Massage & Body Rituals",
    description: "Relaxation. Recovery. Renewal.",
    subCategories: [
      {
        name: "Therapies",
        services: [
          { title: "FULL BODY MASSAGE", has_variants: false, amount: 349, duration: "60 mins" },
          { title: "DEEP TISSUE MASSAGE", has_variants: false, amount: 399, duration: "60 mins" },
          { title: "BACK & SHOULDER MASSAGE", has_variants: false, amount: 249, duration: "45 mins" }
        ]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to DB, starting seed...');
    
    // Optional: clear out existing entries to avoid duplicates during testing
    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Service.deleteMany();
    console.log('Cleared existing catalog data.');

    for (const catData of seedData) {
      const category = await Category.create({
        name: catData.name,
        description: catData.description,
        isActive: true,
        sort_order: 1
      });
      
      console.log(`Created Category: ${category.name}`);

      for (const subCatData of catData.subCategories) {
        const subCategory = await SubCategory.create({
          categoryId: category._id,
          name: subCatData.name,
          is_visible: true,
          sort_order: 1
        });

        for (const srvData of subCatData.services) {
          const servicePayload = {
            subCategoryId: subCategory._id,
            title: srvData.title,
            description: srvData.description || '',
            duration: srvData.duration || '',
            is_visible: true,
            has_variants: srvData.has_variants,
            amount: srvData.amount,
            variants: srvData.variants || []
          };
          await Service.create(servicePayload);
        }
      }
    }
    console.log('====================================');
    console.log('Database successfully seeded!');
    console.log('====================================');
    process.exit(0);
  } catch(e) {
    console.error('Seeding failed:', e);
    process.exit(1);
  }
}

seedDB();
