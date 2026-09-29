export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: 'Men' | 'Women' | 'Children';
  subcategory: string;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  description: string;
  details: string[];
  care: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export const initialProducts: Product[] = [
  // --- MEN'S COLLECTION ---
  {
    id: 1,
    name: "Classic Wool Overcoat",
    price: 24999,
    originalPrice: 32999,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subcategory: "Outerwear",
    isOnSale: true,
    isBestSeller: true,
    description: "Crafted from double-faced Italian virgin wool, this tailored overcoat offers structured elegance with unmatched warmth. Features notched lapels and horn buttons.",
    details: [
      "100% Italian Virgin Wool outer",
      "Bemberg cupro satin lining",
      "Single-breasted 3-button closure",
      "Internal passport & phone pockets",
      "Single back vent for ease of motion"
    ],
    care: ["Specialist dry clean only", "Warm iron with pressing cloth", "Do not bleach or tumble dry"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Midnight Navy", hex: "#001F3F" }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: "r1",
        author: "Devendra Mehta",
        rating: 5,
        date: "2 weeks ago",
        comment: "Exceptional craftsmanship. The drape of the wool is heavy and regal. Perfect fit for formal evenings.",
        verified: true
      },
      {
        id: "r2",
        author: "Vikram Singhania",
        rating: 5,
        date: "1 month ago",
        comment: "Worth every rupee. The camel shade is deeply saturated and looks luxurious in daylight.",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "Architectural Tailored Blazer",
    price: 16599,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subcategory: "Suits & Tailoring",
    isNewArrival: true,
    isBestSeller: true,
    description: "A precision-cut modern blazer built for high-stakes meetings and black-tie dinners. Structured shoulder pads with modern taper.",
    details: [
      "Super 130s Merino Wool blend",
      "Double vents and peak lapels",
      "Working cuff buttonholes",
      "Tailored slim modern cut"
    ],
    care: ["Dry clean only", "Steam press to remove creases"],
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Obsidian Black", hex: "#0B0B0B" },
      { name: "Royal Navy", hex: "#1B263B" }
    ],
    stock: 9,
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      {
        id: "r3",
        author: "Aarav Kapoor",
        rating: 5,
        date: "3 weeks ago",
        comment: "Fits like it was made bespoke. Pair it with black trousers and you command any room.",
        verified: true
      }
    ]
  },
  {
    id: 3,
    name: "Supima Cotton Oxford Shirt",
    price: 6599,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subcategory: "Shirts",
    isBestSeller: true,
    description: "Woven from 100% extra-long staple Supima cotton with a breathable pinpoint weave. Finished with genuine mother-of-pearl buttons.",
    details: [
      "100% American Supima Cotton",
      "Semi-spread reinforced collar",
      "Hand-sewn mother-of-pearl buttons",
      "Wrinkle-resistant easy care finish"
    ],
    care: ["Machine wash gentle 30°C", "Hang dry in shade", "Medium iron"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Ice Blue", hex: "#D0E0EB" },
      { name: "Soft Pink", hex: "#FADADD" }
    ],
    stock: 25,
    rating: 4.7,
    reviewCount: 42,
    reviews: [
      {
        id: "r4",
        author: "Karan Johar",
        rating: 5,
        date: "Just now",
        comment: "The cotton softness is immediately noticeable compared to regular high-street shirts.",
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: "Pleated Tapered Formal Trousers",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subcategory: "Trousers",
    isNewArrival: true,
    description: "Relaxed through the thigh with a crisp forward pleat and sharp modern taper at the ankle. Includes side adjuster tabs.",
    details: [
      "Wool & breathable linen blend",
      "Adjustable brass waist buckles",
      "Concealed hook and zipper fly",
      "Turned-up 1.75 inch cuff"
    ],
    care: ["Dry clean or gentle hand wash", "Low iron"],
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Olive Taupe", hex: "#8A7968" },
      { name: "Jet Black", hex: "#1C1C1C" },
      { name: "Slate Grey", hex: "#708090" }
    ],
    stock: 12,
    rating: 4.6,
    reviewCount: 19,
    reviews: []
  },
  {
    id: 5,
    name: "Silk-Blend Knit Polo",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subcategory: "Polos & Knitwear",
    isOnSale: true,
    description: "An ultra-soft knitted polo combining mulberry silk sheen with organic cotton breathability. Johnny collar with rib-knit borders.",
    details: [
      "55% Silk, 45% Organic Cotton",
      "Buttonless retro Johnny collar",
      "Fine 16-gauge knit",
      "Ribbed hem and armbands"
    ],
    care: ["Hand wash in cold water", "Dry flat", "Do not wring"],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Sage Green", hex: "#9CAF88" },
      { name: "Ivory White", hex: "#FFFFF0" }
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 29,
    reviews: []
  },

  // --- WOMEN'S COLLECTION ---
  {
    id: 6,
    name: "Ethereal Mulberry Silk Evening Gown",
    price: 20799,
    originalPrice: 25999,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subcategory: "Dresses",
    isNewArrival: true,
    isBestSeller: true,
    description: "A head-turning gown cut on the bias in grade 6A mulberry silk. Drapes effortlessly along the body with an alluring cowl back neckline.",
    details: [
      "100% 22 Momme Mulberry Silk",
      "Bias-cut silhouette with subtle side split",
      "Adjustable delicate spaghetti straps",
      "Full silk lining for modesty and weight"
    ],
    care: ["Dry clean recommended", "Cool iron inside-out"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Emerald Glaze", hex: "#046307" },
      { name: "Champagne Gold", hex: "#F7E7CE" },
      { name: "Crimson Velvet", hex: "#990000" }
    ],
    stock: 8,
    rating: 5.0,
    reviewCount: 51,
    reviews: [
      {
        id: "w1",
        author: "Ananya Sharma",
        rating: 5,
        date: "4 days ago",
        comment: "Wore this to a gala and received compliments all night. The silk weight and drape are sublime.",
        verified: true
      }
    ]
  },
  {
    id: 7,
    name: "Cashmere-Linen Pleated Midi Skirt",
    price: 10799,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subcategory: "Skirts",
    description: "Permanent knife pleats give this midi skirt fluid movement with every step. Perfect paired with tall leather boots or minimalist heels.",
    details: [
      "Cashmere & Belgian linen weave",
      "Elasticated grosgrain inner waistband",
      "Mid-calf length with flowing hem"
    ],
    care: ["Dry clean only"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Caramel", hex: "#AF6E4D" },
      { name: "Oatmeal", hex: "#E3DAC9" },
      { name: "Deep Black", hex: "#000000" }
    ],
    stock: 15,
    rating: 4.8,
    reviewCount: 22,
    reviews: []
  },
  {
    id: 8,
    name: "Sculpted Organza Designer Blouse",
    price: 7999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subcategory: "Tops & Blouses",
    isOnSale: true,
    description: "Voluminous statement bishop sleeves paired with structured corset-inspired darting. Made with featherweight silk organza.",
    details: [
      "Silk organza exterior with soft viscose camisole",
      "Concealed side zipper",
      "Covered button cuffs"
    ],
    care: ["Delicate hand wash", "Steam only"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory Pearl", hex: "#FDFBF7" },
      { name: "Rose Quartz", hex: "#F7CAC9" }
    ],
    stock: 11,
    rating: 4.7,
    reviewCount: 16,
    reviews: []
  },
  {
    id: 9,
    name: "Tiered Botanical Summer Sundress",
    price: 12999,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subcategory: "Dresses",
    isNewArrival: true,
    description: "Hand-painted floral motifs on breathable woven poplin. Features tiered ruffle tiers and a flattering sweetheart neckline.",
    details: [
      "100% Certified Organic Cotton Poplin",
      "Smocked elastic back bodice for flexible fit",
      "Side seam discreet pockets",
      "Fully lined"
    ],
    care: ["Machine wash cold", "Line dry in shade"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cornflower Blue", hex: "#6495ED" },
      { name: "Blush Garden", hex: "#DE5D83" }
    ],
    stock: 20,
    rating: 4.9,
    reviewCount: 34,
    reviews: []
  },
  {
    id: 10,
    name: "Signature Double-Breasted Power Blazer",
    price: 18999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subcategory: "Suits & Tailoring",
    isBestSeller: true,
    description: "An empowering wardrobe cornerstone cut with authoritative shoulders, gold crest buttons, and a tapered waistline.",
    details: [
      "Heavyweight wool-crepe blend",
      "Gold-embossed military crest buttons",
      "Chest welt pocket and flap hip pockets",
      "Lined in monogram silk"
    ],
    care: ["Dry clean only"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Onyx Black", hex: "#0A0A0A" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Camel", hex: "#C19A6B" }
    ],
    stock: 7,
    rating: 4.9,
    reviewCount: 47,
    reviews: []
  },

  // --- CHILDREN'S COLLECTION ---
  {
    id: 11,
    name: "Heritage Sherpa-Lined Denim Jacket",
    price: 7499,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a5?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Children",
    subcategory: "Outerwear",
    isBestSeller: true,
    description: "Heavy-duty stonewashed denim insulated with plush sherpa fleece. Built with reinforced double stitching to withstand active playtime.",
    details: [
      "100% durable cotton denim shell",
      "Plush thermal sherpa lining",
      "Snap button front for little hands",
      "Two chest snap pockets"
    ],
    care: ["Machine wash warm", "Tumble dry low"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"],
    colors: [
      { name: "Vintage Indigo", hex: "#2E5894" },
      { name: "Washed Black", hex: "#2B2B2B" }
    ],
    stock: 16,
    rating: 4.9,
    reviewCount: 28,
    reviews: []
  },
  {
    id: 12,
    name: "Organic Combed Cotton Tee Trio",
    price: 3999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Children",
    subcategory: "T-Shirts",
    isOnSale: true,
    description: "A bundle of three hypoallergenic, super-soft GOTS certified organic tees designed for non-irritating comfort all day long.",
    details: [
      "100% GOTS Certified Organic Cotton",
      "Tagless itch-free printed labels",
      "Durable rib collar that holds shape"
    ],
    care: ["Machine wash gentle", "Warm iron"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: [
      { name: "Pastel Mix", hex: "#B5D0E8" },
      { name: "Primary Trio", hex: "#E85D75" }
    ],
    stock: 30,
    rating: 4.8,
    reviewCount: 45,
    reviews: []
  },
  {
    id: 13,
    name: "Smart Oxford Prep Button-Down",
    price: 2999,
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Children",
    subcategory: "Shirts",
    description: "Crisp yet gentle woven cotton Oxford shirt tailored for ceremonies, festive events, and school formal days.",
    details: [
      "Breathable pure combed cotton",
      "Button-down collar",
      "Embroidered chest crest"
    ],
    care: ["Machine wash cold", "Medium iron"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Bright White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" }
    ],
    stock: 22,
    rating: 4.7,
    reviewCount: 15,
    reviews: []
  },
  {
    id: 14,
    name: "Tulle & Sequin Gala Princess Dress",
    price: 14899,
    originalPrice: 18999,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Children",
    subcategory: "Dresses",
    isNewArrival: true,
    description: "Enchanting multi-layered French tulle skirt featuring hand-stitched starburst sequins and a satin sash bow.",
    details: [
      "Multi-layered soft nylon tulle",
      "100% gentle cotton underskirt lining",
      "Satin bow back closure",
      "Zero scratchy seam finishes"
    ],
    care: ["Delicate hand wash cold", "Hang dry only"],
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Starry Navy", hex: "#1A2A44" }
    ],
    stock: 10,
    rating: 5.0,
    reviewCount: 31,
    reviews: []
  },
  {
    id: 15,
    name: "Performance Fleece Tracksuit Set",
    price: 6999,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Children",
    subcategory: "Sportswear",
    description: "Two-piece premium fleece hoodie and jogger pants set. Built for maximum flexibility, playground agility, and warmth.",
    details: [
      "Heavy cotton-poly brushed fleece",
      "Ribbed cuffs and adjustable elastic drawstring waist",
      "Kangaroo pocket and deep side pockets"
    ],
    care: ["Machine wash cold with like colors"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: [
      { name: "Heather Grey", hex: "#D3D3D3" },
      { name: "Olive Green", hex: "#556B2F" }
    ],
    stock: 19,
    rating: 4.8,
    reviewCount: 20,
    reviews: []
  }
];

export const products = initialProducts;

export const getProductsByCategory = (category: string) => 
  products.filter(product => product.category === category);

export const getNewArrivals = () => 
  products.filter(product => product.isNewArrival);

export const getSaleItems = () => 
  products.filter(product => product.isOnSale);

export const getBestSellers = () => 
  products.filter(product => product.isBestSeller);

export const searchProducts = (query: string) => 
  products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(query.toLowerCase())
  );
