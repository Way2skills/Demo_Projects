
const synonyms = {
  dress: ["frock", "gown", "outfit"],
  frock: ["dress", "gown", "outfit"],
  romper: ["bodysuit", "jumpsuit"],
  bodysuit: ["romper"],
  toy: ["toys", "plaything"],
  toys: ["toy", "plaything"],
  teddy: ["bear", "soft toy"],
  bear: ["teddy"],
  bottle: ["feeding", "sipper"],
  feeding: ["bottle", "mealtime"],
  diaper: ["nappy"],
  nappy: ["diaper"],
  blanket: ["swaddle", "wrap"],
  swaddle: ["blanket", "wrap"],
  shoes: ["booties", "footwear"],
  booties: ["shoes"],
  bag: ["backpack", "diaper bag"],
  newborn: ["new born", "baby"],
  gift: ["hamper", "gift box"],
  gifts: ["hamper", "gift box"],
  hairband: ["hair accessory"],
  cap: ["hat"],
  hat: ["cap"],
  lotion: ["skincare", "moisturizer"],
  shampoo: ["hair wash"],
  puzzle: ["educational toy", "learning toy"],
};

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function singular(word) {
  if (word.length > 4 && word.endsWith("ies")) {
    return word.slice(0, -3) + "y";
  }

  if (word.length > 3 && word.endsWith("s")) {
    return word.slice(0, -1);
  }

  return word;
}

function levenshtein(a, b) {
  const matrix = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

function similarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const distance = levenshtein(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

function getSearchFields(product) {
  return {
    name: normalize(product.name),
    category: normalize(product.category),
    subcategory: normalize(product.subcategory),
    description: normalize(product.description),
    badge: normalize(product.badge),
    price: String(product.price ?? ""),
    oldPrice: String(product.oldPrice ?? ""),
    id: String(product.id ?? ""),
  };
}

function getWordScore(queryWord, fieldWords) {
  const query = singular(queryWord);

  let best = 0;

  for (const fieldWord of fieldWords) {
    const word = singular(fieldWord);

    if (query === word) {
      best = Math.max(best, 1);
      continue;
    }

    if (word.startsWith(query) || query.startsWith(word)) {
      best = Math.max(best, 0.85);
      continue;
    }

    const allowedErrors = query.length >= 7 ? 2 : 1;

    if (Math.abs(query.length - word.length) <= allowedErrors) {
      const score = similarity(query, word);

      if (score >= 0.72) {
        best = Math.max(best, score * 0.85);
      }
    }
  }

  return best;
}

function expandWord(word) {
  const base = singular(word);
  const alternatives = synonyms[base] || [];

  return [
    base,
    ...alternatives.map((item) => singular(normalize(item))),
  ];
}

export function searchProducts(products, searchTerm) {
  const query = normalize(searchTerm);

  if (!query) return products;

  const queryWords = query.split(" ").filter(Boolean);

  const results = products
    .map((product) => {
      const fields = getSearchFields(product);

      const nameWords = fields.name.split(" ");
      const categoryWords = fields.category.split(" ");
      const subcategoryWords = fields.subcategory.split(" ");
      const descriptionWords = fields.description.split(" ");
      const badgeWords = fields.badge.split(" ");

      const allWords = [
        ...nameWords,
        ...categoryWords,
        ...subcategoryWords,
        ...descriptionWords,
        ...badgeWords,
      ];

      let score = 0;
      let matchedWords = 0;

      for (const queryWord of queryWords) {
        const alternatives = expandWord(queryWord);

        let bestWordScore = 0;

        for (const alternative of alternatives) {
          bestWordScore = Math.max(
            bestWordScore,
            getWordScore(alternative, nameWords) * 5,
            getWordScore(alternative, categoryWords) * 3,
            getWordScore(alternative, subcategoryWords) * 3,
            getWordScore(alternative, descriptionWords) * 1.5,
            getWordScore(alternative, badgeWords)
          );
        }

        if (bestWordScore > 0) {
          matchedWords++;
          score += bestWordScore;
        }
      }

      // Exact phrase matches receive priority
      const searchableText = [
        fields.name,
        fields.category,
        fields.subcategory,
        fields.description,
        fields.badge,
      ].join(" ");

      if (searchableText.includes(query)) {
        score += 12;
      }

      // Search by product ID
      if (fields.id === query) {
        score += 15;
      }

      // Search by exact selling price
      if (fields.price === query) {
        score += 10;
      }

      if (fields.oldPrice === query) {
        score += 5;
      }

      const allWordsMatched = matchedWords === queryWords.length;

      return {
        product,
        score,
        allWordsMatched,
      };
    })
    .filter(
      (item) => item.score > 0 && item.allWordsMatched
    )
    .sort((a, b) => b.score - a.score);

  return results.map((item) => item.product);
}
