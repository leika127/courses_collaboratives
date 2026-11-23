// Emoji des rayons et des articles. Si on ne connaît pas le nom, on met un emoji par défaut.

// On enlève les accents et les majuscules pour comparer : "Œufs x12" devient "oeufs x12"
const simplifier = (texte = '') =>
  ' ' +
  texte
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') +
  ' '

// ----- Rayons -----
const RAYONS = [
  ['fruit', '🍎'],
  ['boucherie', '🥩'],
  ['charcuterie', '🥓'],
  ['poisson', '🐟'],
  ['cremerie', '🥛'],
  ['fromagerie', '🧀'],
  ['boulangerie', '🥖'],
  ['surgel', '🧊'],
  ['epicerie', '🥫'],
  ['petit dej', '🥐'],
  ['boisson', '🥤'],
  [' bio', '🌱'],
  ['confiserie', '🍫'],
  ['bebe', '🍼'],
  ['beaute', '💄'],
  ['hygiene', '🪥'],
  ['entretien', '🧽'],
  ['animaux', '🐾'],
  ['maison', '🏠'],
]

export function iconeRayon(nom = '') {
  const texte = simplifier(nom)
  const trouve = RAYONS.find(([mot]) => texte.includes(mot))
  return trouve ? trouve[1] : '🛒'
}

// ----- Articles (l'ordre compte : les mots précis passent avant les mots généraux) -----
const ARTICLES = [
  ['steaks vegetaux', '🌱'],
  ['steak', '🥩'],
  ['poulet', '🍗'],
  ['dinde', '🍗'],
  ['porc', '🥩'],
  ['boeuf', '🥩'],
  ['jambon', '🍖'],
  ['saucisson', '🍖'],
  ['lardons', '🥓'],
  ['pate de campagne', '🥫'],
  ['petits pots', '🍼'],
  ['pomme', '🍎'],
  ['banane', '🍌'],
  ['puree de tomate', '🥫'],
  ['tomate', '🍅'],
  ['salade', '🥬'],
  ['carotte', '🥕'],
  ['courgette', '🥒'],
  ['oignon', '🧅'],
  ['avocat', '🥑'],
  ['saumon', '🐟'],
  ['cabillaud', '🐟'],
  ['crevette', '🦐'],
  ['thon', '🐟'],
  ['lait 2', '🍼'],
  ['lait', '🥛'],
  ['oeuf', '🥚'],
  ['beurre', '🧈'],
  ['creme fraiche', '🥄'],
  ['yaourt', '🥣'],
  ['comte', '🧀'],
  ['emmental', '🧀'],
  ['camembert', '🧀'],
  ['mozzarella', '🧀'],
  ['chevre', '🧀'],
  ['baguette', '🥖'],
  ['croissant', '🥐'],
  ['pain', '🍞'],
  ['frites', '🍟'],
  ['haricots', '🫘'],
  ['pizza', '🍕'],
  ['pates', '🍝'],
  ['galettes de riz', '🍘'],
  [' riz ', '🍚'],
  ['huile', '🫒'],
  ['sel ', '🧂'],
  ['farine', '🌾'],
  ['quinoa', '🌾'],
  ['lentilles', '🫘'],
  ['sirop', '🍯'],
  ['cafe', '☕'],
  [' the ', '🍵'],
  ['barres de cereales', '🍫'],
  ['cereales', '🥣'],
  ['confiture', '🍓'],
  ['tartiner', '🍫'],
  ['jus d', '🍊'],
  [' eau ', '💧'],
  ['coca', '🥤'],
  ['soda', '🥤'],
  ['vin ', '🍷'],
  ['chocolat', '🍫'],
  ['bonbons', '🍬'],
  ['biscuits', '🍪'],
  ['couches', '👶'],
  ['lingettes', '🧻'],
  ['creme hydratante', '🧴'],
  ['shampooing', '🧴'],
  ['gel douche', '🚿'],
  ['savon', '🧼'],
  ['dentifrice', '🪥'],
  ['papier toilette', '🧻'],
  ['essuie-tout', '🧻'],
  ['deodorant', '🧴'],
  ['liquide vaisselle', '🧽'],
  ['lessive', '🧺'],
  ['eponge', '🧽'],
  ['nettoyant', '🧹'],
  ['chat', '🐱'],
  ['chien', '🐶'],
  ['ampoule', '💡'],
  ['poubelle', '🗑️'],
  ['piles', '🔋'],
  ['cotons', '🧴'],
  ['film', '📦'],
  ['scotch', '📎'],
  ['bougie', '🕯️'],
  ['allumettes', '🔥'],
]

// nomRayon sert de secours : un article inconnu prend l'emoji de son rayon
export function iconeArticle(nom = '', nomRayon = '') {
  const texte = simplifier(nom)
  const trouve = ARTICLES.find(([mot]) => texte.includes(mot))
  if (trouve) return trouve[1]
  return nomRayon ? iconeRayon(nomRayon) : '🛒'
}
