import { newArrivals } from "./homeData";
import livingRoomCategories from "./livingRoomData";
export const searchProducts = [
  
// =========================
  // ARMCHAIRS
  // =========================
  {
    id: "armchair-01",
    name: "Modern Upholstered Armchair",
    price: 18999,
    image: "/images/furniture/seating/armchairs/armchair-1/beige.jpeg",
    category: "Armchairs",
    href:"/furniture/seating/armchairs",
  },
  {
    id: "armchair-02",
    name: "Modern Swivel Armchair",
    price: 21999,
    image: "/images/furniture/seating/armchairs/armchair-2/beige.jpeg",
    category: "Armchairs",
    href: "/furniture/seating/armchairs",
  },
  {
    id: "armchair-03",
    name: "Modern Wingback Armchair",
    price: 24999,
    image: "/images/furniture/seating/armchairs/armchair-3/beige.jpeg",
    category: "Armchairs",
    href: "/furniture/seating/armchairs",
  
  },
  {
    id: "armchair-04",
    name: "Modern Wooden Frame Armchair",
    price: 26999,
    image: "/images/furniture/seating/armchairs/armchair-4/beige.jpeg",
    category: "Armchairs",
    href: "/furniture/seating/armchairs",
  },

  // =========================
  // ACCENT CHAIRS
  // =========================
  {
    id: "accent-1",
    name: "Modern Upholstered Accent Chair",
    price: 18999,
    image: "/images/furniture/seating/accent-chairs/accent-1/beige.jpeg",
    category: "Accent Chairs",
    href: "/furniture/seating/accent-chairs",
  },
  {
    id: "accent-2",
    name: "Modern Swivel Accent Chair",
    price: 22999,
    image: "/images/furniture/seating/accent-chairs/accent-2/beige.jpeg",
    category: "Accent Chairs",
    href:"/furniture/seating/accent-chairs",
  },
  {
    id: "accent-3",
    name: "Modern Wingback Accent Chair",
    price: 24999,
    image: "/images/furniture/seating/accent-chairs/accent-3/beige.jpeg",
    category: "Accent Chairs",
    href: "/furniture/seating/accent-chairs",
  },
  {
    id: "accent-4",
    name: "Modern Wooden Frame Accent Chair",
    price: 27999,
    image: "/images/furniture/seating/accent-chairs/accent-4/beige.jpeg",
    category: "Accent Chairs",
    href: "/furniture/seating/accent-chairs",
  },

  // =========================
  // BEDS
  // =========================
  {
    id: "bed-01",
    name: "Modern Upholstered King Size Bed",
    price: 42990,
    image: "/images/furniture/bedroom/beds/bed-01/beige.jpeg",
    category: "Beds",
    href: "/furniture/bedroom/beds",
  },
  {
    id: "bed-02",
    name: "Modern Wooden Platform Bed",
    price: 36990,
    image: "/images/furniture/bedroom/beds/bed-02/natural-oak.jpeg",
    category: "Beds",
    href: "/furniture/bedroom/beds",
  },
  {
    id: "bed-03",
    name: "Modern Wingback Upholstered Bed",
    price: 54990,
    image: "/images/furniture/bedroom/beds/bed-03/ivory.jpeg",
    category: "Beds",
    href: "/furniture/bedroom/beds",
  },
  {
    id: "bed-04",
    name: "Modern Sleigh Bed",
    price: 48990,
    image: "/images/furniture/bedroom/beds/bed-04/natural-oak.jpeg",
    category: "Beds",
    href: "/furniture/bedroom/beds",
  },
  {
    id: "bed-05",
    name: "Modern Hydraulic Storage Bed",
    price: 59990,
    image: "/images/furniture/bedroom/beds/bed-05/beige.jpeg",
    category: "Beds",
    href: "/furniture/bedroom/beds",
  },

  // =========================
  // BEDSIDE TABLES
  // =========================
  {
    id: "bedside-01",
    name: "Modern 2-Drawer Bedside Table",
    price: 8999,
    image: "/images/furniture/bedroom/bedside-tables/bedside-01/natural-oak.jpeg",
    category: "Bedside Tables",
    href: "/furniture/bedroom/bedside-tables",
  },
  {
    id: "bedside-02",
    name: "Modern 1-Drawer Bedside Table",
    price: 7499,
    image: "/images/furniture/bedroom/bedside-tables/bedside-02/natural-oak.jpeg",
    category: "Bedside Tables",
    href: "/furniture/bedroom/bedside-tables",
  },
  {
    id: "bedside-03",
    name: "Modern Floating Bedside Table",
    price: 6999,
    image: "/images/furniture/bedroom/bedside-tables/bedside-03/natural-oak.jpeg",
    category: "Bedside Tables",
    href: "/furniture/bedroom/bedside-tables",
  },
  {
    id: "bedside-04",
    name: "Modern Fluted Bedside Table",
    price: 9499,
    image: "/images/furniture/bedroom/bedside-tables/bedside-04/natural-oak.jpeg",
    category: "Bedside Tables",
    href: "/furniture/bedroom/bedside-tables",
  },
  {
    id: "bedside-05",
    name: "Premium Round Bedside Table",
    price: 10999,
    image: "/images/furniture/bedroom/bedside-tables/bedside-05/natural-oak.jpeg",
    category: "Bedside Tables",
    href: "/furniture/bedroom/bedside-tables",
  },

  // =========================
  // DRESSING TABLES
  // =========================
  {
    id: "dressing-01",
    name: "Modern Minimalist Dressing Table",
    price: 14999,
    image: "/images/furniture/bedroom/dressing-tables/dressing-01/natural-oak.jpeg",
    category: "Dressing Tables",
    href: "/furniture/bedroom/dressing-tables",
  },
  {
    id: "dressing-02",
    name: "Modern Round Mirror Dressing Table",
    price: 16499,
    image: "/images/furniture/bedroom/dressing-tables/dressing-02/natural-oak.jpeg",
    category: "Dressing Tables",
    href: "/furniture/bedroom/dressing-tables",
  },
  {
    id: "dressing-03",
    name: "Modern Floating Dressing Table",
    price: 18999,
    image: "/images/furniture/bedroom/dressing-tables/dressing-03/natural-oak.jpeg",
    category: "Dressing Tables",
    href: "/furniture/bedroom/dressing-tables",
  },
  {
    id: "dressing-04",
    name: "Premium Vanity Dressing Table",
    price: 21999,
    image: "/images/furniture/bedroom/dressing-tables/dressing-04/natural-oak.jpeg",
    category: "Dressing Tables",
    href: "/furniture/bedroom/dressing-tables",
  },
  {
    id: "dressing-05",
    name: "Fluted Dressing Table with Oval Mirror",
    price: 23999,
    image: "/images/furniture/bedroom/dressing-tables/dressing-05/natural-oak.jpeg",
    category: "Dressing Tables",
    href: "/furniture/bedroom/dressing-tables",
  },

  // =========================
  // BENCHES
  // =========================
  {
    id: "bench-1",
    name: "Modern Upholstered Bedroom Bench",
    price: 16999,
    image: "/images/furniture/seating/benches/bench-1/beige.jpeg",
    category: "Benches",
    href: "/furniture/seating/benches",
  },
  {
    id: "bench-2",
    name: "Modern Storage Bench",
    price: 19999,
    image: "/images/furniture/seating/benches/bench-2/beige.jpeg",
    category: "Benches",
    href: "/furniture/seating/benches",
  },
  {
    id: "bench-3",
    name: "Modern Tufted Upholstered Bench",
    price: 21999,
    image: "/images/furniture/seating/benches/bench-3/beige.jpeg",
    category: "Benches",
    href: "/furniture/seating/benches",
  },
  {
    id: "bench-4",
    name: "Modern Wooden Slatted Bench",
    price: 24999,
    image: "/images/furniture/seating/benches/bench-4/beige.jpeg",
    category: "Benches",
    href: "/furniture/seating/benches",
  },

  // =========================
  // BOOKSHELVES
  // =========================
  {
    id: "bookshelf-1",
    name: "Modern Minimalist Open Bookshelf",
    price: 12999,
    image: "/images/furniture/tables-storage/bookshelves/bookshelf-1/natural-oak.jpeg",
    category: "Bookshelves",
    href: "/furniture/tables-storage/bookshelves",
  },
  {
    id: "bookshelf-2",
    name: "Modern Bookshelf with Closed Storage",
    price: 18999,
    image: "/images/furniture/tables-storage/bookshelves/bookshelf-2/natural-oak.jpeg",
    category: "Bookshelves",
    href: "/furniture/tables-storage/bookshelves",
  },
  {
    id: "bookshelf-3",
    name: "Modern Ladder Bookshelf",
    price: 14999,
    image: "/images/furniture/tables-storage/bookshelves/bookshelf-3/natural-oak.jpeg",
    category: "Bookshelves",
    href: "/furniture/tables-storage/bookshelves",
  },
  {
    id: "bookshelf-4",
    name: "Modern Geometric Bookshelf",
    price: 19999,
    image: "/images/furniture/tables-storage/bookshelves/bookshelf-4/natural-oak.jpeg",
    category: "Bookshelves",
    href: "/furniture/tables-storage/bookshelves",
  },

  // =========================
  // CABINETS
  // =========================
  {
    id: "cabinet-1",
    name: "Modern Minimalist Storage Cabinet",
    price: 16999,
    image: "/images/furniture/tables-storage/cabinets/cabinet-1/natural-oak.jpeg",
    category: "Cabinets",
    href: "/furniture/tables-storage/cabinets",
  },
  {
    id: "cabinet-2",
    name: "Modern Display Cabinet with Glass Doors",
    price: 24999,
    image: "/images/furniture/tables-storage/cabinets/cabinet-2/natural-oak.jpeg",
    category: "Cabinets",
    href: "/furniture/tables-storage/cabinets",
  },
  {
    id: "cabinet-3",
    name: "Modern Fluted Storage Cabinet",
    price: 21999,
    image: "/images/furniture/tables-storage/cabinets/cabinet-3/natural-oak.jpeg",
    category: "Cabinets",
    href: "/furniture/tables-storage/cabinets",
  },
  {
    id: "cabinet-4",
    name: "Modern Multi-Compartment Storage Cabinet",
    price: 27999,
    image: "/images/furniture/tables-storage/cabinets/cabinet-4/natural-oak.jpeg",
    category: "Cabinets",
    href: "/furniture/tables-storage/cabinets",
  },

  // =========================
  // CONSOLE TABLES
  // =========================
  {
    id: "console-01",
    name: "Modern Minimalist Console Table",
    price: 14999,
    image: "/images/furniture/tables-storage/console-tables/console-1/natural-oak.jpeg",
    category: "Console Tables",
    href: "/furniture/tables-storage/console-tables",
  },
  {
    id: "console-02",
    name: "Modern Drawer Console Table",
    price: 18999,
    image: "/images/furniture/tables-storage/console-tables/console-2/natural-oak.jpeg",
    category: "Console Tables",
    href: "/furniture/tables-storage/console-tables",
  },
  {
    id: "console-03",
    name: "Modern Half-Moon Console Table",
    price: 16999,
    image: "/images/furniture/tables-storage/console-tables/console-3/natural-oak.jpeg",
    category: "Console Tables",
    href: "/furniture/tables-storage/console-tables",
  },
  {
    id: "console-04",
    name: "Modern Console Table with Lower Shelf",
    price: 21999,
    image: "/images/furniture/tables-storage/console-tables/console-4/natural-oak.jpeg",
    category: "Console Tables",
    href: "/furniture/tables-storage/console-tables",
  },

  // =========================
  // DINING CHAIRS
  // =========================
  {
    id: "chair-1",
    name: "Modern Upholstered Dining Chair",
    price: 8999,
    image: "/images/furniture/dining/dining-chairs/chair-1/beige.jpeg",
    category: "Dining Chairs",
    href: "/furniture/dining/dining-chairs",
  },
  {
    id: "chair-2",
    name: "Modern Wooden Dining Chair",
    price: 10999,
    image: "/images/furniture/dining/dining-chairs/chair-2/natural-oak.jpeg",
    category: "Dining Chairs",
    href: "/furniture/dining/dining-chairs",
  },
  {
    id: "chair-3",
    name: "Modern Leather Dining Chair",
    price: 12999,
    image: "/images/furniture/dining/dining-chairs/chair-3/tan-brown.jpeg",
    category: "Dining Chairs",
    href: "/furniture/dining/dining-chairs",
  },
  {
    id: "chair-4",
    name: "Modern Curved Back Dining Chair",
    price: 11999,
    image: "/images/furniture/dining/dining-chairs/chair-4/beige.jpeg",
    category: "Dining Chairs",
    href: "/furniture/dining/dining-chairs",
  },

  // =========================
  // DINING SETS
  // =========================
  {
    id: "set-1",
    name: "Modern 4 Seater Dining Set",
    price: 34999,
    image: "/images/furniture/dining/dining-sets/set-1/natural-oak.jpeg",
    category: "Dining Sets",
    href: "/furniture/dining/dining-sets",
  },
  {
    id: "set-2",
    name: "Modern 6 Seater Dining Set",
    price: 49999,
    image: "/images/furniture/dining/dining-sets/set-2/natural-oak.jpeg",
    category: "Dining Sets",
    href: "/furniture/dining/dining-sets",
  },
  {
    id: "set-3",
    name: "Premium Upholstered Dining Set",
    price: 58999,
    image: "/images/furniture/dining/dining-sets/set-3/natural-oak.jpeg",
    category: "Dining Sets",
    href: "/furniture/dining/dining-sets",
  },
  {
    id: "set-4",
    name: "Modern Compact Dining Set",
    price: 29999,
    image: "/images/furniture/dining/dining-sets/set-4/natural-oak.jpeg",
    category: "Dining Sets",
    href: "/furniture/dining/dining-sets",
  },

  // =========================
  // DINING TABLES
  // =========================
  {
    id: "dining-1",
    name: "Modern 6 Seater Dining Table",
    price: 34999,
    image: "/images/furniture/dining/dining-tables/dining-1/natural-oak.jpeg",
    category: "Dining Tables",
    href: "/furniture/dining/dining-tables",
  },
  {
    id: "dining-2",
    name: "Modern Round Dining Table",
    price: 28999,
    image: "/images/furniture/dining/dining-tables/dining-2/natural-oak.jpeg",
    category: "Dining Tables",
    href: "/furniture/dining/dining-tables",
  },
  {
    id: "dining-3",
    name: "Modern Extendable Dining Table",
    price: 42999,
    image: "/images/furniture/dining/dining-tables/dining-3/natural-oak.jpeg",
    category: "Dining Tables",
    href: "/furniture/dining/dining-tables",
  },
  {
    id: "dining-4",
    name: "Modern Pedestal Dining Table",
    price: 38999,
    image: "/images/furniture/dining/dining-tables/dining-4/natural-oak.jpeg",
    category: "Dining Tables",
    href: "/furniture/dining/dining-tables",
  },

  // =========================
  // COFFEE TABLES
  // =========================
  {
    id: "coffee-table-01",
    name: "Modern Round Coffee Table",
    price: 18990,
    image: "/images/furniture/living-room/coffee-tables/coffee-table-01/natural-oak.jpeg",
    category: "Coffee Tables",
    href: "/furniture/living-room/coffee-tables",
  },
  {
    id: "coffee-table-02",
    name: "Modern Rectangular Coffee Table",
    price: 22990,
    image: "/images/furniture/living-room/coffee-tables/coffee-table-02/natural-oak.jpeg",
    category: "Coffee Tables",
    href: "/furniture/living-room/coffee-tables",
  },
  {
    id: "coffee-table-03",
    name: "Oval Wooden Coffee Table",
    price: 24990,
    image: "/images/furniture/living-room/coffee-tables/coffee-table-03/natural-oak.jpeg",
    category: "Coffee Tables",
    href: "/furniture/living-room/coffee-tables",
  },
  {
    id: "coffee-table-04",
    name: "Nesting Coffee Table Set",
    price: 29990,
    image: "/images/furniture/living-room/coffee-tables/coffee-table-04/natural-oak.jpeg",
    category: "Coffee Tables",
    href: "/furniture/living-room/coffee-tables",
  },
  {
    id: "coffee-table-05",
    name: "Modern Storage Coffee Table",
    price: 34990,
    image: "/images/furniture/living-room/coffee-tables/coffee-table-05/natural-oak.jpeg",
    category: "Coffee Tables",
    href: "/furniture/living-room/coffee-tables",
  },
  // =========================
  // RECLINERS
  // =========================
  {
    id: "recliner-01",
    name: "Single Seater Recliner",
    price: 35990,
    image: "/images/furniture/living-room/recliners/recliner-01/beige.jpeg",
    category: "Recliners",
    href: "/furniture/living-room/recliners",
  },
  {
    id: "recliner-02",
    name: "Modern 2 Seater Recliner",
    price: 58990,
    image: "/images/furniture/living-room/recliners/recliner-02/cream.jpeg",
    category: "Recliners",
    href: "/furniture/living-room/recliners",
  },
  {
    id: "recliner-03",
    name: "Modern 3 Seater Recliner",
    price: 72990,
    image: "/images/furniture/living-room/recliners/recliner-03/tan.jpeg",
    category: "Recliners",
    href: "/furniture/living-room/recliners",
  },
  {
    id: "recliner-04",
    name: "Premium Leather Recliner",
    price: 64990,
    image: "/images/furniture/living-room/recliners/recliner-04/black.jpeg",
    category: "Recliners",
    href: "/furniture/living-room/recliners",
  },
  {
    id: "recliner-05",
    name: "Power Recliner",
    price: 79990,
    image: "/images/furniture/living-room/recliners/recliner-05/ivory.jpeg",
    category: "Recliners",
    href: "/furniture/living-room/recliners",
  },
  // =========================
  // SIDE TABLES
  // =========================
  {
    id: "side-table-01",
    name: "Modern Round Side Table",
    price: 12990,
    image: "/images/furniture/living-room/side-tables/side-table-01/natural-oak.jpeg",
    category: "Side Tables",
    href: "/furniture/living-room/side-tables",
  },
  {
    id: "side-table-02",
    name: "Modern Square Side Table",
    price: 14990,
    image: "/images/furniture/living-room/side-tables/side-table-02/natural-oak.jpeg",
    category: "Side Tables",
    href: "/furniture/living-room/side-tables",
  },
  {
    id: "side-table-03",
    name: "Modern Pedestal Side Table",
    price: 17990,
    image: "/images/furniture/living-room/side-tables/side-table-03/natural-oak.jpeg",
    category: "Side Tables",
    href: "/furniture/living-room/side-tables",
  },
  {
    id: "side-table-04",
    name: "Modern Drawer Side Table",
    price: 19990,
    image: "/images/furniture/living-room/side-tables/side-table-04/natural-oak.jpeg",
    category: "Side Tables",
    href: "/furniture/living-room/side-tables",
  },
  {
    id: "side-table-05",
    name: "C-Shaped Sofa Side Table",
    price: 9990,
    image: "/images/furniture/living-room/side-tables/side-table-05/natural-oak.jpeg",
    category: "Side Tables",
    href: "/furniture/living-room/side-tables",
  },
  // =========================
  // SOFA BEDS
  // =========================
  {
    id: "sofa-bed-01",
    name: "Modern Pull Out Sofa Bed",
    price: 42990,
    image:
      "/images/furniture/living-room/sofa-beds/sofa-bed-01/beige.jpeg",
    category: "Sofa Beds",
    href: "/furniture/living-room/sofa-beds",
  },
  {
    id: "sofa-bed-02",
    name: "L Shape Sofa Bed",
    price: 78990,
    image:
      "/images/furniture/living-room/sofa-beds/sofa-bed-02/cream.jpeg",
    category: "Sofa Beds",
    href: "/furniture/living-room/sofa-beds",
  },
  {
    id: "sofa-bed-03",
    name: "Compact 2 Seater Sofa Bed",
    price: 29990,
    image:
      "/images/furniture/living-room/sofa-beds/sofa-bed-03/ivory.jpeg",
    category: "Sofa Beds",
    href: "/furniture/living-room/sofa-beds",
  },
  {
    id: "sofa-bed-04",
    name: "Premium 3 Seater Sofa Bed",
    price: 64990,
    image:
      "/images/furniture/living-room/sofa-beds/sofa-bed-04/tan.jpeg",
    category: "Sofa Beds",
    href: "/furniture/living-room/sofa-beds",
  },
  {
    id: "sofa-bed-05",
    name: "Convertible Futon Sofa Bed",
    price: 24990,
    image:
      "/images/furniture/living-room/sofa-beds/sofa-bed-05/cream.jpeg",
    category: "Sofa Beds",
    href: "/furniture/living-room/sofa-beds",
  },
  // =========================
  // SOFAS
  // =========================
  {
    id: "sofa-01",
    name: "Modern 3 Seater Sofa",
    price: 45990,
    image: "/images/furniture/living-room/sofas/sofa-01/beige.jpeg",
    category: "Sofas",
    href: "/furniture/living-room/sofas",
  },
  {
    id: "sofa-02",
    name: "L Shape Sofa",
    price: 68990,
    image: "/images/furniture/living-room/sofas/sofa-02/cream.jpeg",
    category: "Sofas",
    href: "/furniture/living-room/sofas",
  },
  {
    id: "sofa-03",
    name: "Modern 2 Seater Sofa",
    price: 32990,
    image: "/images/furniture/living-room/sofas/sofa-03/dusty-pink.jpeg",
    category: "Sofas",
    href: "/furniture/living-room/sofas",
  },
  {
    id: "sofa-04",
    name: "Luxury 4 Seater Sofa",
    price: 75990,
    image: "/images/furniture/living-room/sofas/sofa-04/tan.jpeg",
    category: "Sofas",
    href: "/furniture/living-room/sofas",
  },
  {
    id: "sofa-05",
    name: "Premium Sectional Sofa",
    price: 89990,
    image: "/images/furniture/living-room/sofas/sofa-05/rust.jpeg",
    category: "Sofas",
    href: "/furniture/living-room/sofas",
  },
  // =========================
  // TV UNITS
  // =========================
  {
    id: "tv-unit-01",
    name: "Modern Floating TV Unit",
    price: 0,
    image:
      "/images/furniture/living-room/tv-units/tv-unit-01/natural-oak.jpeg",
    category: "TV Units",
    href: "/furniture/living-room/tv-units",
  },
  {
    id: "tv-unit-02",
    name: "Modern Floor Standing TV Unit",
    price: 0,
    image:
      "/images/furniture/living-room/tv-units/tv-unit-02/natural-oak.jpeg",
    category: "TV Units",
    href: "/furniture/living-room/tv-units",
  },
  {
    id: "tv-unit-03",
    name: "TV Unit with Open Shelves",
    price: 0,
    image:
      "/images/furniture/living-room/tv-units/tv-unit-03/natural-oak.jpeg",
    category: "TV Units",
    href: "/furniture/living-room/tv-units",
  },
  {
    id: "tv-unit-04",
    name: "Fluted Panel TV Unit",
    price: 0,
    image:
      "/images/furniture/living-room/tv-units/tv-unit-04/natural-oak.jpeg",
    category: "TV Units",
    href: "/furniture/living-room/tv-units",
  },
  {
    id: "tv-unit-05",
    name: "Premium Entertainment TV Unit",
    price: 0,
    image:
      "/images/furniture/living-room/tv-units/tv-unit-05/natural-oak.jpeg",
    category: "TV Units",
    href: "/furniture/living-room/tv-units",
  },
  // =========================
  // LOUNGE CHAIRS
  // =========================
  {
    id: "lounge-1",
    name: "Modern Reclining Lounge Chair",
    price: 28999,
    image:
      "/images/furniture/seating/lounge-chairs/lounge-1/beige.jpeg",
    category: "Lounge Chairs",
    href: "/furniture/seating/lounge-chairs",
  },
  {
    id: "lounge-2",
    name: "Modern Barrel Lounge Chair",
    price: 18999,
    image:
      "/images/furniture/seating/lounge-chairs/lounge-2/beige.jpeg",
    category: "Lounge Chairs",
    href: "/furniture/seating/lounge-chairs",
  },
  {
    id: "lounge-3",
    name: "Modern Wingback Lounge Chair",
    price: 22999,
    image:
      "/images/furniture/seating/lounge-chairs/lounge-3/beige.jpeg",
    category: "Lounge Chairs",
    href: "/furniture/seating/lounge-chairs",
  },
  {
    id: "lounge-4",
    name: "Modern Wooden Frame Lounge Chair",
    price: 26999,
    image:
      "/images/furniture/seating/lounge-chairs/lounge-4/beige.jpeg",
    category: "Lounge Chairs",
    href: "/furniture/seating/lounge-chairs",
  },
  // =========================
  // SIDEBOARDS
  // =========================
  {
    id: "sideboard-1",
    name: "Modern Wooden Sideboard",
    price: 29999,
    image:
      "/images/furniture/dining/sideboards/sideboard-1/natural-oak.jpeg",
    category: "Sideboards",
    href: "/furniture/dining/sideboards",
  },
  {
    id: "sideboard-2",
    name: "Modern Fluted Sideboard",
    price: 34999,
    image:
      "/images/furniture/dining/sideboards/sideboard-2/natural-oak.jpeg",
    category: "Sideboards",
    href: "/furniture/dining/sideboards",
  },
  {
    id: "sideboard-3",
    name: "Modern Glass Door Sideboard",
    price: 39999,
    image:
      "/images/furniture/dining/sideboards/sideboard-3/natural-oak.jpeg",
    category: "Sideboards",
    href: "/furniture/dining/sideboards",
  },
  {
    id: "sideboard-4",
    name: "Modern Floating Sideboard",
    price: 42999,
    image:
      "/images/furniture/dining/sideboards/sideboard-4/natural-oak.jpeg",
    category: "Sideboards",
    href: "/furniture/dining/sideboards",
  },
  // =========================
  // STUDY TABLES
  // =========================
  {
    id: "study-1",
    name: "Modern Minimalist Study Table",
    price: 14999,
    image:
      "/images/furniture/tables-storage/study-tables/study-1/natural-oak.jpeg",
    category: "Study Tables",
    href: "/furniture/tables-storage/study-tables",
  },
  {
    id: "study-2",
    name: "Modern Study Table with Drawers",
    price: 18999,
    image:
      "/images/furniture/tables-storage/study-tables/study-2/natural-oak.jpeg",
    category: "Study Tables",
    href: "/furniture/tables-storage/study-tables",
  },
  {
    id: "study-3",
    name: "L-Shaped Corner Study Table",
    price: 24999,
    image:
      "/images/furniture/tables-storage/study-tables/study-3/natural-oak.jpeg",
    category: "Study Tables",
    href: "/furniture/tables-storage/study-tables",
  },
  {
    id: "study-4",
    name: "Modern Study Table with Bookshelf",
    price: 21999,
    image:
      "/images/furniture/tables-storage/study-tables/study-4/natural-oak.jpeg",
    category: "Study Tables",
    href: "/furniture/tables-storage/study-tables",
  },
];
// =========================
// LIVING ROOM PRODUCTS
// =========================

const livingRoomSearchProducts = livingRoomCategories.flatMap(
  (category) =>
    category.models.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image,
      category: category.name,
      href: `/furniture/living-room/${category.slug}`,
    }))
);

// =========================
// NEW ARRIVALS
// =========================

const newArrivalSearchProducts = newArrivals.map((product, index) => ({
  id: `new-arrival-${index + 1}`,
  name: product.name,
  price: Number(product.price.replace(/[₹,]/g, "")),
  image: product.variants[0].image,
  category: "New Arrivals",
  href: product.href,
}));

// =========================
// REMOVE DUPLICATES
// =========================

const existingProducts = searchProducts.filter(
  (product) =>
    !livingRoomSearchProducts.some(
      (livingProduct) => livingProduct.id === product.id
    )
);

// =========================
// ALL SEARCH PRODUCTS
// =========================

export const allSearchProducts = [
  ...existingProducts,
  ...livingRoomSearchProducts,
  ...newArrivalSearchProducts,
];