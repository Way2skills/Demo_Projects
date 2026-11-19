import { Product, ColorVariant } from "@/types";

const productRows = [
  // BABY CLOTHING - EXISTING
  [1, "Little Sunshine Romper", "Baby Clothing", 599, 799, "/images/sunshine.jpg", "Bestseller", "Soft and comfortable cotton romper for babies."],
  [5, "Cotton Cloud Bodysuit", "Baby Clothing", 399, 549, "/images/cloud.jpg", "New", "Gentle cotton bodysuit for everyday comfort."],
  [6, "Blossom Baby Frock", "Baby Clothing", 749, 999, "/images/blossom.jpg", "Popular", "A beautiful lightweight frock for little girls."],
  [7, "Tiny Explorer T-Shirt", "Baby Clothing", 349, 449, "/images/tiny.jpg", "Trending", "Cute everyday cotton T-shirt for babies."],
  [8, "Dreamy Baby Nightwear", "Baby Clothing", 649, 799, "/images/nightwear.jpg", "Comfort Pick", "Soft nightwear designed for peaceful sleep."],
  [9, "Mini Star Dungaree", "Baby Clothing", 799, 999, "/images/mini.jpeg", "Popular", "Adorable dungaree for playful little explorers."],
  [10, "Pastel Party Dress", "Baby Clothing", 899, 1199, "/images/party.jpg", "Special Offer", "A lovely pastel dress for special occasions."],
  [11, "Little Buddy Shorts Set", "Baby Clothing", 549, 699, "/images/little.jpg", "New", "Matching top and shorts for everyday adventures."],
  [12, "Cozy Winter Sweater", "Baby Clothing", 699, 899, "/images/sweater.jpg", "Winter Pick", "A warm and cozy sweater for cooler days."],
  [13, "Newborn Welcome Outfit", "Baby Clothing", 999, 1299, "/images/welcome.jpg", "Gift Pick", "A sweet clothing set for a newborn baby."],

  // BABY TOYS - EXISTING
  [2, "Cuddly Teddy Bear", "Baby Toys", 449, 599, "/images/teddy.jpg", "Popular", "A soft and adorable teddy bear for your little one."],
  [14, "Rainbow Stacking Rings", "Baby Toys", 299, 399, "/images/stack.jpg", "Bestseller", "Colorful stacking rings for playful learning."],
  [15, "Little Bunny Soft Toy", "Baby Toys", 499, 649, "/images/bunny.jpg", "New", "A cuddly bunny friend for your little one."],
  [16, "Musical Elephant Toy", "Baby Toys", 699, 899, "/images/ele.jpg", "Popular", "A musical elephant toy for little playtime moments."],
  [17, "Wooden Shape Puzzle", "Baby Toys", 349, 449, "/images/shape.jpg", "Learning Pick", "A fun shape puzzle for early learning."],
  [18, "Baby Rattle Set", "Baby Toys", 249, 349, "/images/rat.jpg", "New", "A colorful set of baby rattles."],
  [19, "Ocean Bath Toys", "Baby Toys", 399, 499, "/images/oce.jpg", "Popular", "Cute floating toys for enjoyable bath time."],
  [20, "Activity Play Cube", "Baby Toys", 799, 999, "/images/cube.jpg", "Trending", "An activity cube with multiple play features."],
  [21, "Soft Baby Doll", "Baby Toys", 549, 699, "/images/doll.jpg", "Gift Pick", "A soft and lovable doll for little hands."],
  [22, "Animal Sensory Book", "Baby Toys", 329, 429, "/images/ani.jpg", "Learning Pick", "A colorful sensory book with adorable animals."],

  // BABY CARE - EXISTING
  [3, "Baby Care Essentials", "Baby Care", 699, 899, "/images/ess3.jpg", "New", "Everyday baby care essentials in one set."],
  [23, "Gentle Baby Lotion", "Baby Care", 299, 399, "/images/lotion.jpg", "Popular", "Gentle daily moisturizing lotion for babies."],
  [24, "Baby Bath Wash", "Baby Care", 249, 329, "/images/bath.jpg", "Bestseller", "A gentle bath wash for everyday baby care."],
  [25, "Soft Baby Wipes Pack", "Baby Care", 199, 249, "/images/baby-wipes.jpg", "Essential", "Soft wipes for convenient everyday cleaning."],
  [26, "Baby Grooming Kit", "Baby Care", 449, 599, "/images/groom.jpg", "New", "A handy collection of baby grooming essentials."],
  [27, "Baby Shampoo", "Baby Care", 279, 349, "/images/shampoo.jpg", "Popular", "A gentle shampoo for your baby's bath routine."],
  [28, "Baby Massage Oil", "Baby Care", 349, 449, "/images/oil.jpg", "Care Pick", "Baby massage oil for a gentle care routine."],
  [29, "Baby Diaper Changing Mat", "Baby Care", 499, 649, "/images/change.jpg", "Essential", "A practical mat for convenient diaper changes."],
  [30, "Baby Nail Care Set", "Baby Care", 299, 399, "/images/nail.jpg", "New", "Compact grooming essentials for little ones."],
  [31, "Baby Bath Gift Kit", "Baby Care", 899, 1099, "/images/gift3.jpg", "Gift Pick", "A lovely bath-time essentials gift collection."],

  // FEEDING ESSENTIALS - EXISTING
  [32, "Premium Feeding Bottle", "Feeding Essentials", 399, 499, "/images/bottle.jpg", "Popular", "A practical feeding bottle for everyday use."],
  [33, "Silicone Baby Bib", "Feeding Essentials", 249, 329, "/images/bib.jpg", "Bestseller", "An easy-to-clean silicone bib for mealtime."],
  [34, "Little Diner Feeding Set", "Feeding Essentials", 599, 749, "/images/diner.jpg", "New", "A coordinated baby feeding set."],
  [35, "Baby Suction Bowl", "Feeding Essentials", 299, 399, "/images/bowl.jpg", "Popular", "A practical bowl for baby mealtimes."],
  [36, "Soft Tip Baby Spoons", "Feeding Essentials", 199, 279, "/images/spoons.jpg", "Essential", "Soft-tip spoons for comfortable feeding."],
  [37, "Baby Sipper Cup", "Feeding Essentials", 349, 449, "/images/sipper.jpg", "Trending", "A handy sipper cup for little learners."],
  [38, "Milk Storage Containers", "Feeding Essentials", 449, 599, "/images/milk.jpg", "New", "Convenient containers for feeding essentials."],
  [39, "Baby Snack Box", "Feeding Essentials", 279, 369, "/images/snack.jpg", "Popular", "A compact snack box for little outings."],
  [40, "Bottle Cleaning Brush Set", "Feeding Essentials", 229, 299, "/images/brush.jpg", "Essential", "A handy brush set for cleaning feeding bottles."],
  [41, "Baby Food Storage Set", "Feeding Essentials", 499, 649, "/images/food.jpg", "Gift Pick", "A useful storage set for baby food."],

  // BABY ACCESSORIES - EXISTING
  [4, "Dreamy Nursery Set", "Baby Accessories", 899, 1099, "/images/nursery-set2.jpg", "Special Offer", "Beautiful essentials for your baby's nursery."],
  [42, "Little Star Baby Cap", "Baby Accessories", 199, 279, "/images/cap.jpg", "New", "A cute and comfortable cap for little ones."],
  [43, "Cotton Mittens Set", "Baby Accessories", 149, 199, "/images/mit.jpg", "Essential", "Soft cotton mittens for tiny hands."],
  [44, "Tiny Steps Booties", "Baby Accessories", 249, 329, "/images/boot.jpg", "Popular", "Adorable soft booties for little feet."],
  [45, "Baby Cotton Towel", "Baby Accessories", 349, 449, "/images/towel.jpg", "Bestseller", "A soft cotton towel for after bath time."],
  [46, "Cute Baby Socks Pack", "Baby Accessories", 199, 279, "/images/socks.jpg", "New", "A collection of adorable baby socks."],
  [47, "Pastel Hairband Set", "Baby Accessories", 249, 349, "/images/band.jpg", "Popular", "Beautiful pastel hair accessories."],
  [48, "Everyday Diaper Bag", "Baby Accessories", 999, 1299, "/images/bag.jpg", "Trending", "A spacious bag for baby essentials on the go."],
  [49, "Soft Muslin Swaddle", "Baby Accessories", 399, 499, "/images/muslin.jpg", "Comfort Pick", "A lightweight muslin wrap for your baby."],
  [50, "Baby Accessories Gift Set", "Baby Accessories", 699, 899, "/images/gift.jpg", "Gift Pick", "A lovely collection of everyday baby accessories."],

  // BEDDING & NURSERY - EXISTING
  [51, "Cloud Soft Baby Blanket", "Bedding & Nursery", 699, 899, "/images/blanket.webp", "Bestseller", "A soft blanket for cozy little moments."],
  [52, "Pastel Crib Bedsheet", "Bedding & Nursery", 549, 699, "/images/bedsheet.jpg", "New", "A lovely pastel bedsheet for baby's crib."],
  [53, "Baby Pillow Set", "Bedding & Nursery", 499, 649, "/images/pillow.jpg", "Popular", "A coordinated pillow set for the nursery."],
  [54, "Cozy Swaddle Wrap", "Bedding & Nursery", 399, 549, "/images/wrap.jpg", "Comfort Pick", "A soft swaddle wrap for comfortable cuddles."],
  [55, "Dreamy Sleep Sack", "Bedding & Nursery", 799, 999, "/images/sack.jpg", "New", "A cozy sleeping sack for little ones."],
  [56, "Nursery Cushion Set", "Bedding & Nursery", 649, 849, "/images/cushion.jpg", "Popular", "Decorative cushions for a cozy nursery."],
  [57, "Baby Cot Organizer", "Bedding & Nursery", 449, 599, "/images/cot.jpg", "Essential", "A practical organizer for nursery essentials."],
  [58, "Soft Play Mat", "Bedding & Nursery", 899, 1199, "/images/mat.jpg", "Trending", "A comfortable play mat for supervised playtime."],
  [59, "Nursery Mosquito Net", "Bedding & Nursery", 599, 799, "/images/net.jpg", "Essential", "A protective net for your baby's sleeping space."],
  [60, "Baby Nursery Decor Set", "Bedding & Nursery", 999, 1299, "/images/decor.jpg", "Gift Pick", "A beautiful decor collection for the nursery."],

  // NEWBORN & GIFT SETS - EXISTING
  [61, "Newborn Welcome Kit", "Newborn & Gift Sets", 1299, 1599, "/images/newwel.jpg", "Bestseller", "A thoughtful starter kit for a newborn baby."],
  [62, "Little Princess Gift Box", "Newborn & Gift Sets", 1499, 1899, "/images/baby-princess.jpg", "Gift Pick", "A charming gift collection for a little princess."],
  [63, "Little Prince Gift Box", "Newborn & Gift Sets", 1499, 1899, "/images/prince.jpg", "Popular", "A special gift collection for a little prince."],
  [64, "Newborn Clothing Hamper", "Newborn & Gift Sets", 1199, 1499, "/images/hamper.jpg", "New", "A curated hamper of newborn clothing essentials."],
  [65, "Baby Shower Gift Hamper", "Newborn & Gift Sets", 1799, 2199, "/images/shower.jpg", "Trending", "A thoughtful hamper for a baby shower celebration."],
  [66, "Hospital Essentials Kit", "Newborn & Gift Sets", 999, 1299, "/images/ess.jpg", "Essential", "A practical collection of newborn hospital essentials."],
  [67, "First Month Baby Set", "Newborn & Gift Sets", 1399, 1699, "/images/first.jpg", "Popular", "Everyday essentials for a baby's first month."],
  [68, "Baby Keepsake Gift Box", "Newborn & Gift Sets", 899, 1199, "/images/keep.jpg", "Gift Pick", "A special keepsake box for precious baby memories."],
  [69, "Welcome Baby Hamper", "Newborn & Gift Sets", 1999, 2499, "/images/babyham.jpg", "Special Offer", "A premium welcome hamper for a new arrival."],
  [70, "Baby Gift Essentials Set", "Newborn & Gift Sets", 1099, 1399, "/images/gift2.jpg", "New", "A lovely gift set for newborn celebrations."],

  // BABY GEAR - EXISTING
  [71, "Everyday Baby Stroller", "Baby Gear", 3999, 4999, "/images/stroll.jpg", "Popular", "A practical stroller for family outings."],
  [72, "Comfort Baby Carrier", "Baby Gear", 1499, 1899, "/images/carrier.jpg", "Bestseller", "A comfortable carrier for hands-free baby travel."],
  [73, "Baby Travel Organizer", "Baby Gear", 699, 899, "/images/travel.jpg", "New", "A handy organizer for baby travel essentials."],
  [74, "Portable Baby High Chair", "Baby Gear", 2499, 2999, "/images/chair.jpg", "Trending", "A practical high chair for supervised mealtimes."],
  [75, "Baby Rocker Seat", "Baby Gear", 2999, 3699, "/images/seat.jpg", "Popular", "A comfortable rocker seat for supervised use."],
  [76, "Compact Diaper Backpack", "Baby Gear", 1199, 1499, "/images/diaper-bag.jpg", "New", "A spacious backpack for outings with your baby."],
  [77, "Baby Car Seat", "Baby Gear", 4999, 5999, "/images/car.jpg", "Premium", "A baby car seat; check vehicle compatibility and safety certification before purchase."],
  [78, "Foldable Travel Cot", "Baby Gear", 3499, 4299, "/images/cot2.jpg", "Trending", "A convenient foldable cot for travel."],
  [79, "Baby Stroller Organizer", "Baby Gear", 549, 699, "/images/organ.jpg", "Essential", "A handy organizer for stroller essentials."],
  [80, "Baby Travel Essentials Kit", "Baby Gear", 999, 1299, "/images/ess2.jpg", "Gift Pick", "A convenient collection of baby travel accessories."],

  // BABY CLOTHING - 5 NEW
  [81, "Little Panda Pajama Set", "Baby Clothing", 549, 699, "/images/little-panda-pajama.jpg", "New", "A cute printed pajama set for everyday comfort.", "BH-BC-081"],
  [82, "Mini Denim Dungaree", "Baby Clothing", 699, 899, "/images/mini-denim-dungaree.jpg", "Trending", "A stylish denim dungaree for little adventures.", "BH-BC-082"],
  [83, "Floral Princess Frock", "Baby Clothing", 649, 849, "/images/floral-princess-frock.jpg", "Popular", "A lovely floral frock for special little moments.", "BH-BC-083"],
  [84, "Little Champ Shirt Set", "Baby Clothing", 749, 949, "/images/little-champ-shirt-set.jpg", "New", "A matching shirt and shorts outfit.", "BH-BC-084"],
  [85, "Cozy Cotton Leggings Set", "Baby Clothing", 499, 649, "/images/cozy-cotton-leggings-set.jpg", "Essential", "Soft cotton leggings for everyday outfits.", "BH-BC-085"],

  // BABY TOYS - 5 NEW
  [86, "Silicone Baby Teether Set", "Baby Toys", 299, 399, "/images/silicone-baby-teether-set.jpg", "New", "A set of textured teethers for little hands.", "BH-BT-086"],
  [87, "Soft Building Blocks", "Baby Toys", 499, 649, "/images/soft-building-blocks.jpg", "Learning Pick", "Soft colorful blocks for supervised play.", "BH-BT-087"],
  [88, "Baby Activity Play Gym", "Baby Toys", 1499, 1899, "/images/baby-activity-play-gym.jpg", "Trending", "An activity gym with hanging play elements.", "BH-BT-088"],
  [89, "Musical Crib Mobile", "Baby Toys", 899, 1199, "/images/musical-crib-mobile.jpg", "Popular", "A musical mobile designed for a nursery.", "BH-BT-089"],
  [90, "Color Shape Sorter Toy", "Baby Toys", 399, 549, "/images/color-shape-sorter.jpg", "Learning Pick", "A shape sorter for playful discovery.", "BH-BT-090"],

  // BABY CARE - 5 NEW
  [91, "Baby Bath Thermometer", "Baby Care", 349, 449, "/images/baby-bath-thermometer.jpg", "New", "A bath thermometer for checking water temperature.", "BH-CARE-091"],
  [92, "Hooded Baby Towel Set", "Baby Care", 499, 649, "/images/hooded-baby-towel-set.jpg", "Popular", "A soft hooded towel set for bath time.", "BH-CARE-092"],
  [93, "Baby Hair Brush Set", "Baby Care", 299, 399, "/images/baby-hair-brush-set.jpg", "Essential", "A gentle grooming brush and comb set.", "BH-CARE-093"],
  [94, "Diaper Caddy Organizer", "Baby Care", 599, 799, "/images/diaper-caddy-organizer.jpg", "Trending", "A handy organizer for diaper changing essentials.", "BH-CARE-094"],
  [95, "Baby Laundry Wash", "Baby Care", 349, 449, "/images/baby-laundry-wash.jpg", "New", "A laundry wash product for baby clothing.", "BH-CARE-095"],

  // FEEDING ESSENTIALS - 5 NEW
  [96, "Divided Suction Feeding Plate", "Feeding Essentials", 399, 499, "/images/divided-suction-plate.jpg", "Popular", "A divided plate for organized mealtimes.", "BH-FE-096"],
  [97, "Training Sipper Cup", "Feeding Essentials", 349, 449, "/images/training-sipper-cup.jpg", "New", "A training cup for little learners.", "BH-FE-097"],
  [98, "Silicone Snack Cup", "Feeding Essentials", 299, 399, "/images/silicone-snack-cup.jpg", "Trending", "A reusable snack cup for family outings.", "BH-FE-098"],
  [99, "Baby Food Masher", "Feeding Essentials", 449, 599, "/images/baby-food-masher.jpg", "Essential", "A manual food masher for preparing soft foods.", "BH-FE-099"],
  [100, "Bottle Drying Rack", "Feeding Essentials", 549, 699, "/images/bottle-drying-rack.jpg", "New", "A rack for air-drying cleaned feeding items.", "BH-FE-100"],

  // BABY ACCESSORIES - 5 NEW
  [101, "Baby Sun Hat", "Baby Accessories", 249, 349, "/images/baby-sun-hat.jpg", "New", "A lightweight hat for outdoor outings.", "BH-BA-101"],
  [102, "Soft Sole Baby Shoes", "Baby Accessories", 399, 499, "/images/soft-sole-baby-shoes.jpg", "Popular", "Soft baby shoes for little feet.", "BH-BA-102"],
  [103, "Pastel Bow Hair Clip Set", "Baby Accessories", 199, 299, "/images/pastel-bow-hair-clips.jpg", "Trending", "A cute set of pastel hair clips.", "BH-BA-103"],
  [104, "Adjustable Baby Bib Set", "Baby Accessories", 299, 399, "/images/adjustable-baby-bib-set.jpg", "Essential", "A set of adjustable everyday bibs.", "BH-BA-104"],
  [105, "Mini Baby Backpack", "Baby Accessories", 499, 699, "/images/mini-baby-backpack.jpg", "New", "A small backpack for carrying little essentials.", "BH-BA-105"],

  // BEDDING & NURSERY - 5 NEW
  [106, "Quilted Baby Blanket", "Bedding & Nursery", 799, 999, "/images/quilted-baby-blanket.jpg", "Popular", "A quilted blanket for nursery use.", "BH-BN-106"],
  [107, "Waterproof Mattress Protector", "Bedding & Nursery", 599, 799, "/images/waterproof-mattress-protector.jpg", "Essential", "A mattress protector for nursery bedding.", "BH-BN-107"],
  [108, "Nursery Storage Basket", "Bedding & Nursery", 449, 599, "/images/nursery-storage-basket.jpg", "New", "A storage basket for nursery organization.", "BH-BN-108"],
  [109, "Printed Crib Sheet Set", "Bedding & Nursery", 649, 849, "/images/printed-crib-sheet-set.jpg", "Trending", "A coordinated printed crib sheet set.", "BH-BN-109"],
  [110, "Nursery Wall Decor Set", "Bedding & Nursery", 699, 899, "/images/nursery-wall-decor-set.jpg", "Gift Pick", "A decorative wall set for a nursery.", "BH-BN-110"],

  // NEWBORN & GIFT SETS - 5 NEW
  [111, "Naming Ceremony Gift Set", "Newborn & Gift Sets", 1499, 1899, "/images/naming-ceremony-gift-set.jpg", "Festive Pick", "A gift collection for a baby's naming ceremony.", "BH-NG-111"],
  [112, "First Birthday Gift Box", "Newborn & Gift Sets", 1299, 1599, "/images/first-birthday-gift-box.jpg", "Gift Pick", "A special gift box for a first birthday.", "BH-NG-112"],
  [113, "Baby Shower Clothing Hamper", "Newborn & Gift Sets", 1699, 2099, "/images/baby-shower-clothing-hamper.jpg", "Popular", "A clothing hamper for a baby shower gift.", "BH-NG-113"],
  [114, "Newborn Swaddle Gift Set", "Newborn & Gift Sets", 999, 1299, "/images/newborn-swaddle-gift-set.jpg", "New", "A coordinated swaddle gift collection.", "BH-NG-114"],
  [115, "Welcome Home Keepsake Set", "Newborn & Gift Sets", 899, 1199, "/images/welcome-home-keepsake-set.jpg", "Gift Pick", "A keepsake collection to celebrate a new arrival.", "BH-NG-115"],

  // BABY GEAR - 5 NEW
  [116, "Lightweight Travel Stroller", "Baby Gear", 4499, 5499, "/images/lightweight-travel-stroller.jpg", "Trending", "A lightweight stroller for family travel.", "BH-BG-116"],
  [117, "Stroller Rain Cover", "Baby Gear", 599, 799, "/images/stroller-rain-cover.jpg", "Essential", "A rain cover designed for compatible strollers.", "BH-BG-117"],
  [118, "Portable Booster Seat", "Baby Gear", 1999, 2499, "/images/portable-booster-seat.jpg", "New", "A portable booster seat for suitable supervised use.", "BH-BG-118"],
  [119, "Travel Changing Station", "Baby Gear", 799, 999, "/images/travel-changing-station.jpg", "Popular", "A foldable changing station for outings.", "BH-BG-119"],
  [120, "Baby Safety Gate", "Baby Gear", 2499, 2999, "/images/baby-safety-gate.jpg", "Essential", "A safety gate for suitable home spaces.", "BH-BG-120"],
];

// PRODUCT COLOR VARIANTS
// These are visual color choices. Confirm actual variants and stock before publishing.
export const COLOR_VARIANTS: Record<number, ColorVariant[]> = {
  1: [{ name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }, { name: "White", hex: "#FFFFFF" }, { name: "Lavender", hex: "#C5A7E8" }, { name: "Mint Green", hex: "#A8DEC5" }],
  5: [{ name: "White", hex: "#FFFFFF" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Pink", hex: "#9eaf98" }, { name: "Cream", hex: "#F2E5C8" }],
  6: [{ name: "Pink", hex: "#9eaf98" }, { name: "Lavender", hex: "#C5A7E8" }, { name: "Peach", hex: "#FFC1A6" }, { name: "Yellow", hex: "#F8DC75" }],
  7: [{ name: "White", hex: "#FFFFFF" }, { name: "Red", hex: "#E85D65" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }, { name: "Navy Blue", hex: "#263B70" }, { name: "Black", hex: "#292929" }],
  8: [{ name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Mint Green", hex: "#A8DEC5" }, { name: "Cream", hex: "#F2E5C8" }],
  9: [{ name: "Navy Blue", hex: "#263B70" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Grey", hex: "#999999" }, { name: "Black", hex: "#292929" }],
  10: [{ name: "Pink", hex: "#9eaf98" }, { name: "Lavender", hex: "#C5A7E8" }, { name: "Peach", hex: "#FFC1A6" }, { name: "Yellow", hex: "#F8DC75" }],
  11: [{ name: "Baby Blue", hex: "#9CCEF5" }, { name: "Pink", hex: "#9eaf98" }, { name: "Yellow", hex: "#F8DC75" }, { name: "Mint Green", hex: "#A8DEC5" }],
  12: [{ name: "Red", hex: "#E85D65" }, { name: "Navy Blue", hex: "#263B70" }, { name: "Cream", hex: "#F2E5C8" }, { name: "Grey", hex: "#999999" }],
  13: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Cream", hex: "#F2E5C8" }],
  81: [{ name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }, { name: "Mint Green", hex: "#A8DEC5" }],
  82: [{ name: "Blue", hex: "#527DAA" }, { name: "Navy Blue", hex: "#263B70" }, { name: "Grey", hex: "#999999" }],
  83: [{ name: "Pink", hex: "#9eaf98" }, { name: "Peach", hex: "#FFC1A6" }, { name: "Lavender", hex: "#C5A7E8" }],
  84: [{ name: "White", hex: "#FFFFFF" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Navy Blue", hex: "#263B70" }],
  85: [{ name: "Pink", hex: "#9eaf98" }, { name: "White", hex: "#FFFFFF" }, { name: "Grey", hex: "#999999" }, { name: "Black", hex: "#292929" }],

  // Toys
  2: [{ name: "Brown", hex: "#A8754F" }, { name: "Cream", hex: "#F2E5C8" }, { name: "Pink", hex: "#9eaf98" }],
  14: [{ name: "Rainbow", hex: "#E9A2B5" }, { name: "Pastel", hex: "#C5A7E8" }, { name: "Yellow", hex: "#F8DC75" }],
  15: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Grey", hex: "#999999" }],
  18: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }],
  21: [{ name: "Pink", hex: "#9eaf98" }, { name: "Peach", hex: "#FFC1A6" }, { name: "Lavender", hex: "#C5A7E8" }],
  87: [{ name: "Pastel", hex: "#C5A7E8" }, { name: "Rainbow", hex: "#E9A2B5" }, { name: "Primary", hex: "#E85D65" }],

  // Accessories
  42: [{ name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Cream", hex: "#F2E5C8" }],
  43: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }],
  44: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Brown", hex: "#A8754F" }],
  46: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Grey", hex: "#999999" }],
  47: [{ name: "Pink", hex: "#9eaf98" }, { name: "Lavender", hex: "#C5A7E8" }, { name: "Peach", hex: "#FFC1A6" }],
  48: [{ name: "Pink", hex: "#9eaf98" }, { name: "Black", hex: "#292929" }, { name: "Navy Blue", hex: "#263B70" }, { name: "Grey", hex: "#999999" }],
  49: [{ name: "White", hex: "#FFFFFF" }, { name: "Mint Green", hex: "#A8DEC5" }, { name: "Peach", hex: "#FFC1A6" }],
  101: [{ name: "Pink", hex: "#9eaf98" }, { name: "Yellow", hex: "#F8DC75" }, { name: "Baby Blue", hex: "#9CCEF5" }],
  102: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Brown", hex: "#A8754F" }],
  103: [{ name: "Pink", hex: "#9eaf98" }, { name: "Lavender", hex: "#C5A7E8" }, { name: "Peach", hex: "#FFC1A6" }],
  105: [{ name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Navy Blue", hex: "#263B70" }],

  // Bedding & nursery
  51: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }, { name: "Mint Green", hex: "#A8DEC5" }],
  52: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }],
  54: [{ name: "White", hex: "#FFFFFF" }, { name: "Cream", hex: "#F2E5C8" }, { name: "Sage Green", hex: "#A8B99A" }],
  55: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Grey", hex: "#999999" }],
  58: [{ name: "Pink", hex: "#9eaf98" }, { name: "Mint Green", hex: "#A8DEC5" }, { name: "Lavender", hex: "#C5A7E8" }],
  106: [{ name: "White", hex: "#FFFFFF" }, { name: "Pink", hex: "#9eaf98" }, { name: "Baby Blue", hex: "#9CCEF5" }],
  109: [{ name: "Pink", hex: "#9eaf98" }, { name: "Yellow", hex: "#F8DC75" }, { name: "Mint Green", hex: "#A8DEC5" }],

  // Selected feeding and gear products
  33: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Sage Green", hex: "#A8B99A" }],
  34: [{ name: "Pink", hex: "#9eaf98" }, { name: "Mint Green", hex: "#A8DEC5" }, { name: "Yellow", hex: "#F8DC75" }],
  35: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }],
  37: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Mint Green", hex: "#A8DEC5" }],
  96: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Sage Green", hex: "#A8B99A" }],
  97: [{ name: "Pink", hex: "#9eaf98" }, { name: "Blue", hex: "#9CCEF5" }, { name: "Yellow", hex: "#F8DC75" }],
  116: [{ name: "Black", hex: "#292929" }, { name: "Grey", hex: "#999999" }, { name: "Navy Blue", hex: "#263B70" }],
};

// Convert product rows into objects
const rawProducts: Product[] = productRows.map((row: any) => {
  const [id, name, category, price, oldPrice, image, badge, description, sku] = row;
  const numId = Number(id);
  return {
    id: numId,
    name: String(name),
    category: String(category),
    price: Number(price),
    oldPrice: oldPrice ? Number(oldPrice) : undefined,
    image: String(image),
    badge: badge ? String(badge) : undefined,
    description: String(description),
    ...(sku ? { sku: String(sku) } : {}),
    ...(COLOR_VARIANTS[numId] ? { colorVariants: COLOR_VARIANTS[numId] } : {}),
  };
});
const products = rawProducts;

// PRODUCT SUBCATEGORY MAPPING
const subcategoryMap = {
  1: "Rompers & Bodysuits",
  5: "Rompers & Bodysuits",
  6: "Baby Frocks",
  7: "T-Shirts & Tops",
  8: "Nightwear",
  9: "Dungarees",
  10: "Baby Frocks",
  11: "Pants & Shorts",
  12: "T-Shirts & Tops",
  13: "Newborn Clothing",
  81: "Nightwear",
  82: "Dungarees",
  83: "Baby Frocks",
  84: "Shirts & Sets",
  85: "Pants & Shorts",
  2: "Soft Toys",
  14: "Activity Toys",
  15: "Soft Toys",
  16: "Musical Toys",
  17: "Wooden Toys",
  18: "Rattles",
  19: "Bath Toys",
  20: "Activity Toys",
  21: "Soft Toys",
  22: "Educational Toys",
  86: "Teethers",
  87: "Building Blocks",
  88: "Activity Toys",
  89: "Musical Toys",
  90: "Educational Toys",
  3: "Grooming Kits",
  23: "Baby Skincare",
  24: "Baby Bath",
  25: "Baby Wipes",
  26: "Grooming Kits",
  27: "Baby Shampoo",
  28: "Baby Skincare",
  29: "Baby Hygiene",
  30: "Grooming Kits",
  31: "Baby Bath",
  91: "Baby Bath",
  92: "Baby Towels",
  93: "Grooming Kits",
  94: "Baby Hygiene",
  95: "Baby Laundry",
  32: "Feeding Bottles",
  33: "Bibs",
  34: "Feeding Sets",
  35: "Bowls & Plates",
  36: "Baby Spoons",
  37: "Sippers & Cups",
  38: "Food Storage",
  39: "Food Storage",
  40: "Feeding Sets",
  41: "Food Storage",
  96: "Bowls & Plates",
  97: "Sippers & Cups",
  98: "Food Storage",
  99: "Feeding Accessories",
  100: "Feeding Accessories",
  4: "Accessories Sets",
  42: "Caps & Hats",
  43: "Mittens & Booties",
  44: "Mittens & Booties",
  45: "Baby Towels",
  46: "Socks",
  47: "Hair Accessories",
  48: "Diaper Bags",
  49: "Baby Blankets",
  50: "Accessories Sets",
  101: "Caps & Hats",
  102: "Mittens & Booties",
  103: "Hair Accessories",
  104: "Bibs",
  105: "Bags & Backpacks",
  51: "Blankets",
  52: "Baby Bedsheets",
  53: "Baby Pillows",
  54: "Swaddles",
  55: "Sleeping Bags",
  56: "Nursery Decor",
  57: "Crib Accessories",
  58: "Nursery Decor",
  59: "Mosquito Nets",
  60: "Nursery Decor",
  106: "Blankets",
  107: "Crib Accessories",
  108: "Nursery Storage",
  109: "Baby Bedsheets",
  110: "Nursery Decor",
  61: "Newborn Starter Kits",
  62: "Baby Gift Hampers",
  63: "Baby Gift Hampers",
  64: "Newborn Clothing Sets",
  65: "Baby Gift Hampers",
  66: "Hospital Kits",
  67: "Newborn Starter Kits",
  68: "Gift Boxes",
  69: "Baby Gift Hampers",
  70: "Welcome Baby Gifts",
  111: "Baby Gift Hampers",
  112: "Gift Boxes",
  113: "Baby Gift Hampers",
  114: "Newborn Clothing Sets",
  115: "Welcome Baby Gifts",
  71: "Baby Strollers",
  72: "Baby Carriers",
  73: "Travel Accessories",
  74: "High Chairs",
  75: "Baby Rockers",
  76: "Travel Accessories",
  77: "Car Seats",
  78: "Travel Accessories",
  79: "Travel Accessories",
  80: "Travel Accessories",
  116: "Baby Strollers",
  117: "Stroller Accessories",
  118: "High Chairs",
  119: "Travel Accessories",
  120: "Safety Accessories",
};

// PRODUCT GENDER METADATA
const genderMap = {
  6: "girl",
  10: "girl",
  47: "girl",
  62: "girl",
  63: "boy",
  83: "girl",
};

// AGE GROUPS
export const AGE_GROUPS = [
  "0-3 Months",
  "3-6 Months",
  "6-12 Months",
  "1-2 Years",
  "2-3 Years",
  "3-5 Years",
];

// Initial catalog age filters.
// Confirm exact clothing sizes and manufacturer age guidance before publishing.
const ageRangeMap = {
  // Existing clothing
  1: ["0-3 Months", "3-6 Months"],
  5: ["0-3 Months", "3-6 Months", "6-12 Months"],
  6: ["6-12 Months", "1-2 Years", "2-3 Years"],
  7: ["1-2 Years", "2-3 Years", "3-5 Years"],
  8: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  9: ["6-12 Months", "1-2 Years", "2-3 Years"],
  10: ["1-2 Years", "2-3 Years", "3-5 Years"],
  11: ["1-2 Years", "2-3 Years", "3-5 Years"],
  12: ["1-2 Years", "2-3 Years", "3-5 Years"],
  13: ["0-3 Months", "3-6 Months"],
  // Existing toys
  2: ["3-6 Months", "6-12 Months", "1-2 Years", "2-3 Years"],
  14: ["6-12 Months", "1-2 Years"],
  15: ["3-6 Months", "6-12 Months", "1-2 Years"],
  16: ["6-12 Months", "1-2 Years", "2-3 Years"],
  17: ["1-2 Years", "2-3 Years", "3-5 Years"],
  18: ["0-3 Months", "3-6 Months", "6-12 Months"],
  19: ["6-12 Months", "1-2 Years", "2-3 Years"],
  20: ["1-2 Years", "2-3 Years", "3-5 Years"],
  21: ["1-2 Years", "2-3 Years", "3-5 Years"],
  22: ["6-12 Months", "1-2 Years", "2-3 Years"],
  // Existing care products
  3: ["0-3 Months", "3-6 Months", "6-12 Months"],
  23: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  24: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  25: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  26: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  27: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  28: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  29: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  30: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  31: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  // Existing feeding products
  32: ["0-3 Months", "3-6 Months", "6-12 Months"],
  33: ["6-12 Months", "1-2 Years"],
  34: ["6-12 Months", "1-2 Years"],
  35: ["6-12 Months", "1-2 Years"],
  36: ["6-12 Months", "1-2 Years"],
  37: ["6-12 Months", "1-2 Years", "2-3 Years"],
  38: ["0-3 Months", "3-6 Months", "6-12 Months"],
  39: ["6-12 Months", "1-2 Years", "2-3 Years"],
  40: ["0-3 Months", "3-6 Months", "6-12 Months"],
  41: ["6-12 Months", "1-2 Years"],
  // Existing accessories
  4: ["0-3 Months", "3-6 Months", "6-12 Months"],
  42: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  43: ["0-3 Months", "3-6 Months", "6-12 Months"],
  44: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  45: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  46: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  47: ["6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"],
  48: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"],
  49: ["0-3 Months", "3-6 Months"],
  50: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // Existing bedding
  51: ["0-3 Months", "3-6 Months", "6-12 Months"],
  52: ["0-3 Months", "3-6 Months", "6-12 Months"],
  53: ["0-3 Months", "3-6 Months", "6-12 Months"],
  54: ["0-3 Months", "3-6 Months"],
  55: ["0-3 Months", "3-6 Months", "6-12 Months"],
  56: ["0-3 Months", "3-6 Months", "6-12 Months"],
  57: ["0-3 Months", "3-6 Months", "6-12 Months"],
  58: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  59: ["0-3 Months", "3-6 Months", "6-12 Months"],
  60: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // Existing gift sets
  61: ["0-3 Months", "3-6 Months"],
  62: ["0-3 Months", "3-6 Months", "6-12 Months"],
  63: ["0-3 Months", "3-6 Months", "6-12 Months"],
  64: ["0-3 Months", "3-6 Months"],
  65: ["0-3 Months", "3-6 Months", "6-12 Months"],
  66: ["0-3 Months", "3-6 Months"],
  67: ["0-3 Months", "3-6 Months"],
  68: ["0-3 Months", "3-6 Months", "6-12 Months"],
  69: ["0-3 Months", "3-6 Months", "6-12 Months"],
  70: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // Existing gear
  71: ["6-12 Months", "1-2 Years", "2-3 Years"],
  72: ["0-3 Months", "3-6 Months", "6-12 Months"],
  73: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  74: ["6-12 Months", "1-2 Years", "2-3 Years"],
  75: ["0-3 Months", "3-6 Months", "6-12 Months"],
  76: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  77: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years", "2-3 Years"],
  78: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  79: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  80: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  // New clothing
  81: ["6-12 Months", "1-2 Years", "2-3 Years"],
  82: ["1-2 Years", "2-3 Years", "3-5 Years"],
  83: ["1-2 Years", "2-3 Years", "3-5 Years"],
  84: ["1-2 Years", "2-3 Years", "3-5 Years"],
  85: ["6-12 Months", "1-2 Years", "2-3 Years"],
  // New toys
  86: ["3-6 Months", "6-12 Months"],
  87: ["1-2 Years", "2-3 Years", "3-5 Years"],
  88: ["0-3 Months", "3-6 Months", "6-12 Months"],
  89: ["0-3 Months", "3-6 Months", "6-12 Months"],
  90: ["1-2 Years", "2-3 Years", "3-5 Years"],
  // New care
  91: ["0-3 Months", "3-6 Months", "6-12 Months"],
  92: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  93: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  94: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  95: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  // New feeding
  96: ["6-12 Months", "1-2 Years"],
  97: ["6-12 Months", "1-2 Years", "2-3 Years"],
  98: ["6-12 Months", "1-2 Years", "2-3 Years"],
  99: ["6-12 Months", "1-2 Years"],
  100: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // New accessories
  101: ["6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"],
  102: ["6-12 Months", "1-2 Years", "2-3 Years"],
  103: ["6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"],
  104: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  105: ["1-2 Years", "2-3 Years", "3-5 Years"],
  // New bedding
  106: ["0-3 Months", "3-6 Months", "6-12 Months"],
  107: ["0-3 Months", "3-6 Months", "6-12 Months"],
  108: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  109: ["0-3 Months", "3-6 Months", "6-12 Months"],
  110: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // New gift sets
  111: ["0-3 Months", "3-6 Months", "6-12 Months"],
  112: ["1-2 Years"],
  113: ["0-3 Months", "3-6 Months", "6-12 Months"],
  114: ["0-3 Months", "3-6 Months"],
  115: ["0-3 Months", "3-6 Months", "6-12 Months"],
  // New gear
  116: ["6-12 Months", "1-2 Years", "2-3 Years"],
  117: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  118: ["6-12 Months", "1-2 Years", "2-3 Years"],
  119: ["0-3 Months", "3-6 Months", "6-12 Months", "1-2 Years"],
  120: ["6-12 Months", "1-2 Years", "2-3 Years", "3-5 Years"],
};

// Add metadata without changing original product details
export const productsWithSubcategories: Product[] = products.map((product) => ({
  ...product,
  subcategory: subcategoryMap[product.id] || "Other",
  gender: genderMap[product.id] || "unisex",
  ageRange: ageRangeMap[product.id] || [],
}));

// Normalize text for searching
export function normalizeSearchText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Get all searchable product fields
export function getProductSearchText(product) {
  return normalizeSearchText(
    [
      product.name,
      product.category,
      product.subcategory,
      product.description,
      product.badge,
      product.brand,
      product.sku,
      product.id,
      product.price,
      product.oldPrice,
    ]
      .filter((value) => value !== undefined && value !== null)
      .join(" ")
  );
}

// Calculate edit distance for typo tolerance
function getEditDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const oldValue = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        previous + cost
      );
      previous = oldValue;
    }
  }
  return row[b.length];
}

// Match words with small spelling mistakes
function wordsMatch(queryWord, productWord) {
  if (queryWord === productWord) return true;
  if (queryWord.length >= 3 && productWord.startsWith(queryWord)) {
    return true;
  }
  if (
    queryWord.length >= 4 &&
    productWord.length >= 4 &&
    getEditDistance(queryWord, productWord) <= 1
  ) {
    return true;
  }
  return false;
}

// Smart product search with relevance ranking
export function searchProducts(productList = [], searchTerm = "") {
  const query = normalizeSearchText(searchTerm);
  if (!query) return productList;
  const queryWords = query.split(" ").filter(Boolean);
  return productList
    .map((product, index) => {
      const name = normalizeSearchText(product.name);
      const searchableText = getProductSearchText(product);
      const productWords = searchableText.split(" ");
      let score = 0;
      let matchedWords = 0;
      if (name === query) score += 200;
      else if (name.startsWith(query)) score += 150;
      else if (name.includes(query)) score += 120;
      if (searchableText.includes(query)) score += 60;
      for (const queryWord of queryWords) {
        const matched = productWords.some((word) =>
          wordsMatch(queryWord, word)
        );
        if (matched) {
          matchedWords++;
          score += name.split(" ").some((word) =>
            wordsMatch(queryWord, word)
          )
            ? 30
            : 10;
        }
      }
      if (matchedWords !== queryWords.length) {
        score = 0;
      }
      return { product, score, index };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.product);
}

export default productsWithSubcategories;
console.log(products.length);
