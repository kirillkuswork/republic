const ROUTES = {
  about: "/about",
  root: "/",
  privacy: "/policy",
  lifestyle: "/lifestyle",
  favorites: {
    root: "/favorites/*",
    plainRoot: "/favorites/",
    flats: "flats",
    parking: "parking",
    keller: "keller",
  },
  list: "/list",
  visual: {
    root: "/visual",
    house: "/visual/:houseId",
    floor: "/visual/:houseId/:floorId",
    apartment: "/visual/:houseId/:floorId/:flatId",
  },
  news: "/news",
  onenews: "/news/:slug",
  seafront: "/seafront",
  infrastructure: "/infrastructure",
  houses: "/houses",
  house: "/houses/:id",
  history: "/history",
  location: "/location",
  commercial:  "/commercial",
  progress: "/progress",
  oneprogress: "/progress/:slug",
  team: "/team",
  parking: "/parking",
  rareformats: "/rare-formats",
  keller: "/keller",
  spaces: "/spaces",
  landscaping: "/landscaping",
  architecture: "/architecture",
  gallery: "/gallery",
  documents: "/documents",
  contacts: "/contacts",
  improvement: "/improvement",
  error: "/error",
  purchaseTerms: {
    root: "/purchase-terms/*",
    plainRoot: "/purchase-terms/",
    fullPayment: "full",
    installmentPlan: "installment",
    mortgage: "mortgage",
    tradeIn: "trade-in",
    onlinePurchase: "online",
  },
};

export default ROUTES;
