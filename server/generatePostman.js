const fs = require('fs');

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
        name: "Hair Treatments",
        services: [
          { title: "Deep Conditioning", has_variants: true, variants: [{ label: "Hydration Boost", amount: 149 }, { label: "Hair Spa Ritual", amount: 249 }] },
          { title: "Hair Botox – Short", has_variants: true, variants: [{ label: "Botox Revive", amount: 549 }, { label: "Botox Transformation", amount: 899 }] }
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
          { title: "Gel Manicure", has_variants: false, amount: 159, description: "Nail shaping + filing + warm soak + cuticle care + oil + long-lasting gel + LED (45 mins)" }
        ]
      },
      {
        name: "Pedicure",
        services: [
          { title: "Classic Pedicure", has_variants: false, amount: 109, description: "Foot soak + shaping + tidy + callus buff + scrub + massage + classic polish (45 mins)" },
          { title: "Gel Pedicure", has_variants: false, amount: 179, description: "Foot soak + shaping + care + scrub + massage + long-lasting gel + LED (60 mins)" }
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

const postmanCollection = {
  info: {
    name: "Nysha Full Test Data APIs",
    description: "Execute these requests one by one to populate your local database using the requested collection data. Requires Authenticated Session.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "1. Categories",
      description: "Run these first. Copy the '_id' from the response to use in the Sub-Categories section.",
      item: []
    },
    {
      name: "2. Sub-Categories",
      description: "Replace 'PASTE_CATEGORY_ID_HERE' with the ID you got from Step 1. Copy the new '_id' for Step 3.",
      item: []
    },
    {
      name: "3. Services",
      description: "Replace 'PASTE_SUB_CATEGORY_ID_HERE' with the ID you got from Step 2.",
      item: []
    }
  ]
};

// Loop through seed data to populate Postman items
seedData.forEach((cat) => {
  postmanCollection.item[0].item.push({
    name: `Add Category: ${cat.name}`,
    request: {
      method: "POST",
      body: {
        mode: "formdata",
        formdata: [
          { key: "name", value: cat.name, type: "text" },
          { key: "description", value: cat.description || "", type: "text" },
          { key: "isActive", value: "true", type: "text" },
          { key: "sort_order", value: "1", type: "text" }
        ]
      },
      url: { raw: "http://localhost:5000/api/categories", protocol: "http", host: ["localhost"], port: "5000", path: ["api", "categories"] }
    }
  });

  cat.subCategories.forEach((sub) => {
    postmanCollection.item[1].item.push({
      name: `Add SubCat: ${sub.name} (Parent: ${cat.name})`,
      request: {
        method: "POST",
        body: {
          mode: "formdata",
          formdata: [
            { key: "categoryId", value: "PASTE_CATEGORY_ID_HERE", type: "text" },
            { key: "name", value: sub.name, type: "text" },
            { key: "is_visible", value: "true", type: "text" },
            { key: "sort_order", value: "1", type: "text" }
          ]
        },
        url: { raw: "http://localhost:5000/api/subcategories", protocol: "http", host: ["localhost"], port: "5000", path: ["api", "subcategories"] }
      }
    });

    sub.services.forEach((srv) => {
      const formdata = [
        { key: "subCategoryId", value: "PASTE_SUB_CATEGORY_ID_HERE", type: "text" },
        { key: "title", value: srv.title, type: "text" },
        { key: "has_variants", value: srv.has_variants ? "true" : "false", type: "text" },
        { key: "is_visible", value: "true", type: "text" }
      ];

      if (srv.description) formdata.push({ key: "description", value: srv.description, type: "text" });
      if (srv.duration) formdata.push({ key: "duration", value: srv.duration, type: "text" });
      if (srv.amount) formdata.push({ key: "amount", value: srv.amount.toString(), type: "text" });

      if (srv.has_variants && srv.variants && srv.variants.length > 0) {
        formdata.push({ 
          key: "variants", 
          value: JSON.stringify(srv.variants, null, 2), 
          type: "text"
        });
      }

      postmanCollection.item[2].item.push({
        name: `Add Service: ${srv.title} (Parent: ${sub.name})`,
        request: {
          method: "POST",
          body: {
            mode: "formdata",
            formdata: formdata
          },
          url: { raw: "http://localhost:5000/api/services", protocol: "http", host: ["localhost"], port: "5000", path: ["api", "services"] }
        }
      });
    });
  });
});

fs.writeFileSync('Nysha_Full_Data.postman_collection.json', JSON.stringify(postmanCollection, null, 2));
console.log('Postman collection generated successfully.');
