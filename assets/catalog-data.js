window.CATALOG_DATA = (() => {
  const groupLabels = {
    "serie A": "altezza 95 cm",
    "serie B": "altezza 115 cm",
    "serie E": "altezza 140 cm"
  };

  const widthVariants = (rows, group = "") =>
    rows.map(([code, widthCm, widthIn]) => ({
      code,
      label: `${code} - larghezza ${widthCm} cm (${widthIn}")${group ? ` - ${groupLabels[group] || group}` : ""}`,
      widthCm,
      widthIn,
      group: groupLabels[group] || group
    }));

  const fixedVariants = rows =>
    rows.map(row => ({
      code: row.code,
      label: row.label,
      details: row.details || ""
    }));

  const sunbrellaColors = [
    ["5020", "Natural"],
    ["P023", "Artic Blue"],
    ["5030", "Oyster"],
    ["5031", "Marine Blue"],
    ["5026", "Dune"],
    ["5057", "Captain Navy"],
    ["5548", "Taupe"],
    ["5058", "Dark Navy"],
    ["P015", "Crimson Red"],
    ["5035", "Silver"],
    ["5034", "Burgundy"],
    ["5530", "Cadet Grey"],
    ["5087", "Flanelle"],
    ["5049", "Charcoal Grey"],
    ["5082", "Graphite"],
    ["P053", "Steel"],
    ["P055", "Papyrus"],
    ["5032", "Jet Black"]
  ].map(([code, name]) => ({ code, name, label: `${code} - ${name}`, fabric: "sunbrella" }));

  const polyesterColors = [
    ["9577", "White"],
    ["9816", "Beige"],
    ["9526", "Yellow"],
    ["9527", "Orange"],
    ["9675", "Red"],
    ["9879", "Bordeaux"],
    ["9710", "Green"],
    ["9701", "Blue Sky"],
    ["9793", "Lagoon"],
    ["9545", "Blue"],
    ["9876", "Silver"],
    ["9741", "Grey"],
    ["9654", "Dark Grey"],
    ["9853", "Black"]
  ].map(([code, name]) => ({ code, name, label: `${code} - ${name}`, fabric: "polyester" }));

  const canvasColors = sunbrellaColors;
  const canvasColorGroups = {
    sunbrella: {
      label: "Sunbrella Plus",
      material: "acrilico resinato",
      colors: sunbrellaColors
    },
    polyester: {
      label: "Mehler Airtex Classic",
      material: "poliestere resinato",
      colors: polyesterColors
    }
  };

  const meshColors = [
    ["TN06-003", "Bianco"],
    ["TN06-002", "Beige"],
    ["TN06-008", "Nocciola"],
    ["TN06-004", "Blu"],
    ["TN06-005", "Grigio"],
    ["TN06-006", "Grigio Antracite"],
    ["TN06-007", "Nero"]
  ].map(([code, name]) => ({ code, name, label: `${code} - ${name}` }));

  const extensionGroups = {
    "exclusive-majestic": {
      name: "Exclusive | Majestic",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-025" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-027", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-026" }
      ]
    },
    "royal-lookup-4": {
      name: "Royal | Look Up - 4 archi",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-015" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-016", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-017" }
      ]
    },
    "royal-lookup-3": {
      name: "Royal | Look Up - 3 archi",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-012" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-013", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-014" }
      ]
    },
    "chic-3": {
      name: "Chic - 3 archi",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-001" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-002", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-003" }
      ]
    },
    "elegance-sport-3": {
      name: "Elegance | Sport - 3 archi",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-004" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-005", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-006" }
      ]
    },
    "elegance-sport-chic-4": {
      name: "Elegance | Sport | Chic - 4 archi",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-018" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-019", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-020" }
      ]
    },
    prestige: {
      name: "Prestige",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-009" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-010", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-011" }
      ]
    },
    "superior-epic": {
      name: "Superior | Epic",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-021" },
        { id: "right-lateral", label: "Laterale destro", mark: "B", code: "PE01-022" },
        { id: "left-lateral", label: "Laterale sinistro", mark: "C", code: "PE01-023" },
        { id: "rear", label: "Posteriore", mark: "D", code: "PE01-024" }
      ]
    },
    "frontsuperior-excellent-wave": {
      name: "Front Superior | Excellent | Wave",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-021" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-022", canOrderBothSides: true }
      ]
    },
    strange: {
      name: "Strange",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-028" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-029", canOrderBothSides: true },
        { id: "rear", label: "Posteriore", mark: "C", code: "PE01-030" }
      ]
    },
    "jolly-universal": {
      name: "Jolly | Universal",
      positions: [
        { id: "front", label: "Anteriore", mark: "A", code: "PE01-007" },
        { id: "lateral", label: "Laterale", mark: "B", code: "PE01-008", canOrderBothSides: true }
      ]
    }
  };

  const customizationInfo = {
    edgeZipper: {
      code: "PE03-001",
      name: "Cerniera su bordo",
      description: "Predisposizione con cerniera divisibile YKK su lato destro, sinistro, poppa o prua."
    },
    underArchZipper: {
      code: "PE03-002",
      name: "Cerniere sotto archi",
      description: "Applicazione per rimuovere il telo senza smontare la struttura."
    },
    ledWaterproof: {
      code: "PE02-001",
      name: "LED waterproof",
      description: "Strip LED 12W waterproof a luce calda, selezionabile in due lunghezze.",
      lengths: [
        { code: "PE02-005", label: "100 cm" },
        { code: "PE02-006", label: "150 cm" }
      ]
    },
    light360: {
      code: "PE04-001",
      extraCode: "AR02-001",
      name: "Applicazione luce 360°",
      description: "Predisposizione con T-90° inox e fanale di fonda 360°."
    },
    solarPanel: {
      name: "Applicazione pannello solare",
      description: "Applicazione pannello solare con cerniera o bottoni Tenax.",
      methods: [
        { code: "PE08-001", label: "Con cerniera" },
        { code: "PE08-002", label: "Con bottoni Tenax" }
      ]
    },
    customPrint: {
      code: "PE06-001",
      name: "Stampa personalizzata",
      description: "Stampa su tessuto acrilico, PVC o poliestere. File vettoriale richiesto in fase esecutiva."
    }
  };

  const categories = [
    {
      id: "bimini",
      name: "Bimini",
      intro: "Tendalini configurabili con misura/codice, colore telo obbligatorio e lavorazioni compatibili."
    },
    {
      id: "rollbar",
      name: "Roll Bar",
      intro: "Roll bar e roll bar con tendalino. Dove presente il telo, il colore resta obbligatorio."
    },
    {
      id: "ttop",
      name: "T-Top",
      intro: "Sezione consultabile e predisposta per richieste preventivo."
    },
    {
      id: "coperture",
      name: "Coperture",
      intro: "Coperture ordinabili per codice o su misura, con riferimento ordine e note tecniche."
    },
    {
      id: "accessori-tendalino",
      name: "Accessori per Tendalino",
      intro: "Accessori generali, puntoni, tenditori e cavetti."
    },
    {
      id: "accessori-inox",
      name: "Accessori Inox",
      parent: "accessori-tendalino",
      intro: "Accessori inox separati dalla macrocategoria Accessori per Tendalino."
    },
    {
      id: "accessori-nylon",
      name: "Accessori Nylon",
      parent: "accessori-tendalino",
      intro: "Accessori nylon separati dalla macrocategoria Accessori per Tendalino."
    },
    {
      id: "accessori-rollbar-ttop",
      name: "Accessori Roll Bar e T-Top",
      intro: "Luci, contropiastre e accessori dedicati a roll bar e T-Top."
    },
    {
      id: "personalizzazioni",
      name: "Lavorazioni custom",
      intro: "Consultabili come categoria, selezionabili solo dentro configurazioni compatibili."
    },
    {
      id: "telai",
      name: "Telai",
      intro: "Telai su misura per tendalini e sprayhood."
    },
    {
      id: "tubi",
      name: "Tubi",
      intro: "Tubi inox e alluminio ordinabili per codice, diametro e spessore."
    },
    {
      id: "tessuti",
      name: "Tessuti",
      intro: "Tessuti nautici, reti, crystal e materiali di lavorazione."
    },
    {
      id: "tappezzeria",
      name: "Accessori tappezzeria",
      intro: "Sezione predisposta per importazione codici dedicati."
    }
  ];

  const sharedBiminiRowsLarge = [
    ["E07L", 245, 96],
    ["E08L", 260, 102],
    ["E09L", 275, 108],
    ["E10L", 290, 114],
    ["E11L", 305, 120],
    ["E12L", 320, 126],
    ["E13L", 335, 132],
    ["E14L", 350, 138],
    ["E15L", 365, 144],
    ["E16L", 380, 150],
    ["E17L", 395, 156]
  ];

  const preview = page => `assets/previews/page-${String(page).padStart(3, "0")}.png`;
  const itemImage = name => `assets/items/${name}.jpg`;

  const biminiProduct = ({
    id,
    name,
    subtitle,
    page,
    pages,
    specs,
    variants,
    extensionGroup = "",
    customizations = ["edgeZipper", "ledWaterproof"],
    canvasColorGroup = "polyester",
    summary = "Tendalino configurabile con codice/misura, colore telo obbligatorio e lavorazioni compatibili."
  }) => ({
    id,
    categoryId: "bimini",
    name,
    subtitle,
    image: preview(page),
    pages,
    summary,
    specs,
    variants,
    requiresCanvasColor: true,
    canvasColorGroup,
    ...(extensionGroup ? { extensionGroup } : {}),
    customizations
  });

  const rollbarProduct = ({
    id,
    name,
    subtitle = "Roll Bar",
    page,
    pages,
    specs,
    variants,
    requiresCanvasColor = true,
    extensionGroup = "",
    customizations = ["edgeZipper"],
    canvasColorGroup = "sunbrella",
    summary = "Roll bar configurabile da catalogo 2026."
  }) => ({
    id,
    categoryId: "rollbar",
    name,
    subtitle,
    image: preview(page),
    pages,
    summary,
    specs,
    variants,
    requiresCanvasColor,
    canvasColorGroup,
    ...(extensionGroup ? { extensionGroup } : {}),
    customizations
  });

  const ttopProduct = ({ id, name, page, pages, summary, variants }) => ({
    id,
    categoryId: "ttop",
    name,
    subtitle: "T-Top",
    image: preview(page),
    pages,
    summary,
    specs: ["Tessuto acrilico resinato", "Colore telo obbligatorio"],
    variants,
    requiresCanvasColor: true,
    canvasColorGroup: "sunbrella",
    allowCustomNotes: true
  });

  const catalogItem = ({
    id,
    categoryId,
    name,
    subtitle = "",
    image,
    page,
    pages,
    summary,
    specs = [],
    variants = [],
    consultOnly = false,
    consultDetails = [],
    allowCustomNotes = true
  }) => ({
    id,
    categoryId,
    name,
    subtitle,
    image,
    pages: pages || (page ? [page] : []),
    summary,
    specs,
    variants: fixedVariants(variants),
    requiresCanvasColor: false,
    consultOnly,
    consultDetails,
    allowCustomNotes
  });

  const products = [
    {
      id: "majestic",
      categoryId: "bimini",
      name: "Majestic",
      subtitle: "4 archi",
      image: "assets/previews/majestic-008.png",
      pages: [8, 9],
      summary: "Tendalino con tubo in acciaio inox lucido 316L da 40 mm, telo in tessuto acrilico resinato e cerniere sotto archi.",
      specs: ["Peso medio 35 kg", "Velocita consigliata 35 nodi", "Altezza 140 cm", "Lunghezza 320 cm"],
      variants: widthVariants(sharedBiminiRowsLarge.map(([suffix, cm, inches]) => [`TE24-${suffix}`, cm, inches]), "altezza 140 cm"),
      requiresCanvasColor: true,
      canvasColorGroup: "sunbrella",
      extensionGroup: "exclusive-majestic",
      customizations: ["edgeZipper", "ledWaterproof", "light360", "solarPanel", "customPrint"],
      standardNotes: ["Cerniere sotto archi di serie", "Fasce di sostegno per archi centrali di serie"]
    },
    {
      id: "exclusive",
      categoryId: "bimini",
      name: "Exclusive",
      subtitle: "4 archi",
      image: "assets/previews/exclusive-010.png",
      pages: [10, 11],
      summary: "Tendalino con tubo in acciaio inox lucido 316L da 30 mm, telo in tessuto acrilico resinato e cerniere sotto archi.",
      specs: ["Peso medio 25 kg", "Velocita consigliata 30 nodi", "Altezza 140 cm", "Lunghezza 320 cm"],
      variants: widthVariants(sharedBiminiRowsLarge.map(([suffix, cm, inches]) => [`TE01-${suffix}`, cm, inches]), "altezza 140 cm"),
      requiresCanvasColor: true,
      canvasColorGroup: "sunbrella",
      extensionGroup: "exclusive-majestic",
      customizations: ["edgeZipper", "ledWaterproof", "light360", "solarPanel", "customPrint"],
      standardNotes: ["Cerniere sotto archi di serie", "Fasce di sostegno per archi centrali di serie"]
    },
    {
      id: "royal",
      categoryId: "bimini",
      name: "Royal",
      subtitle: "4 archi",
      image: "assets/previews/royal-018.png",
      pages: [18, 19],
      summary: "Tendalino 4 archi con tubo in acciaio inox lucido 316L da 25 mm e telo in tessuto acrilico resinato.",
      specs: ["Peso medio 20 kg", "Velocita consigliata 25 nodi", "Altezza 115 o 140 cm secondo codice"],
      variants: [
        ...widthVariants([
          ["TE06-B05F", 185, 73],
          ["TE06-B06F", 200, 79],
          ["TE06-B07F", 215, 85],
          ["TE06-B08F", 230, 91],
          ["TE06-B09F", 245, 96],
          ["TE06-B10F", 260, 102],
          ["TE06-B11F", 275, 108],
          ["TE06-B12F", 290, 114]
        ], "altezza 115 cm"),
        ...widthVariants([
          ["TE06-E03H", 185, 73],
          ["TE06-E04H", 200, 79],
          ["TE06-E05H", 215, 85],
          ["TE06-E06H", 230, 91],
          ["TE06-E07H", 245, 96],
          ["TE06-E08H", 260, 102],
          ["TE06-E09H", 275, 108],
          ["TE06-E10H", 290, 114]
        ], "altezza 140 cm")
      ],
      requiresCanvasColor: true,
      canvasColorGroup: "sunbrella",
      extensionGroup: "royal-lookup-4",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    },
    {
      id: "prestige",
      categoryId: "bimini",
      name: "Prestige",
      subtitle: "3 archi",
      image: "assets/previews/prestige-042.png",
      pages: [42, 43],
      summary: "Tendalino 3 archi con tubo in acciaio inox lucido 316L da 25 mm e telo in tessuto acrilico resinato.",
      specs: ["Peso medio 15 kg", "Velocita consigliata 25 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["TE02-E07A", 245, 96],
        ["TE02-E08A", 260, 102],
        ["TE02-E09A", 275, 108],
        ["TE02-E10A", 290, 114]
      ], "altezza 140 cm"),
      requiresCanvasColor: true,
      canvasColorGroup: "sunbrella",
      extensionGroup: "prestige",
      customizations: ["edgeZipper", "ledWaterproof", "light360", "solarPanel", "customPrint"],
      standardNotes: ["Cerniere sotto archi di serie"]
    },
    biminiProduct({
      id: "look-up-4",
      name: "Look Up",
      subtitle: "4 archi",
      page: 12,
      pages: [12, 13],
      specs: ["Peso medio 20 kg", "Velocita consigliata 25 nodi", "Tubo inox 316L 25 mm"],
      variants: [
        ...widthVariants([
          ["TE04-B05F", 185, 73],
          ["TE04-B06F", 200, 79],
          ["TE04-B07F", 215, 85],
          ["TE04-B08F", 230, 91],
          ["TE04-B09F", 245, 96],
          ["TE04-B10F", 260, 102],
          ["TE04-B11F", 275, 108],
          ["TE04-B12F", 290, 114]
        ], "altezza 115 cm"),
        ...widthVariants([
          ["TE04-E03H", 185, 73],
          ["TE04-E04H", 200, 79],
          ["TE04-E05H", 215, 85],
          ["TE04-E06H", 230, 91],
          ["TE04-E07H", 245, 96],
          ["TE04-E08H", 260, 102],
          ["TE04-E09H", 275, 108],
          ["TE04-E10H", 290, 114]
        ], "altezza 140 cm")
      ],
      extensionGroup: "royal-lookup-4",
      canvasColorGroup: "sunbrella",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "look-up-3",
      name: "Look Up",
      subtitle: "3 archi",
      page: 14,
      pages: [14, 15],
      specs: ["Peso medio 15 kg", "Velocita consigliata 25 nodi", "Tubo inox 316L 22 mm"],
      variants: [
        ...widthVariants([
          ["TE05-A01A", 150, 59],
          ["TE05-A02A", 170, 67],
          ["TE05-A03A", 185, 73],
          ["TE05-A04A", 200, 79],
          ["TE05-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE05-B04D", 170, 67],
          ["TE05-B05D", 185, 73],
          ["TE05-B06D", 200, 79],
          ["TE05-B07D", 215, 85],
          ["TE05-B08D", 230, 91],
          ["TE05-B09D", 245, 96]
        ], "serie B"),
        ...widthVariants([
          ["TE05-E02F", 170, 67],
          ["TE05-E03F", 185, 73],
          ["TE05-E04F", 200, 79],
          ["TE05-E05F", 215, 85],
          ["TE05-E06F", 230, 91],
          ["TE05-E07F", 245, 96]
        ], "serie E")
      ],
      extensionGroup: "royal-lookup-3",
      canvasColorGroup: "sunbrella",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "royal-xl",
      name: "Royal XL",
      subtitle: "4 archi",
      page: 16,
      pages: [16, 17],
      specs: ["Peso medio 20 kg", "Velocita consigliata 25 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["TE18-E03L", 185, 73],
        ["TE18-E04L", 200, 79],
        ["TE18-E05L", 215, 85],
        ["TE18-E06L", 230, 91],
        ["TE18-E07L", 245, 96],
        ["TE18-E08L", 260, 102],
        ["TE18-E09L", 275, 108],
        ["TE18-E10L", 290, 114]
      ], "altezza 140 cm"),
      extensionGroup: "royal-lookup-4",
      canvasColorGroup: "sunbrella",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "royal-3",
      name: "Royal",
      subtitle: "3 archi",
      page: 20,
      pages: [20, 21],
      specs: ["Peso medio 15 kg", "Velocita consigliata 25 nodi", "Tubo inox 316L 22 mm"],
      variants: [
        ...widthVariants([
          ["TE07-A01A", 150, 59],
          ["TE07-A02A", 170, 67],
          ["TE07-A03A", 185, 73],
          ["TE07-A04A", 200, 79],
          ["TE07-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE07-B04D", 170, 67],
          ["TE07-B05D", 185, 73],
          ["TE07-B06D", 200, 79],
          ["TE07-B07D", 215, 85],
          ["TE07-B08D", 230, 91],
          ["TE07-B09D", 245, 96]
        ], "serie B"),
        ...widthVariants([
          ["TE07-E02F", 170, 67],
          ["TE07-E03F", 185, 73],
          ["TE07-E04F", 200, 79],
          ["TE07-E05F", 215, 85],
          ["TE07-E06F", 230, 91],
          ["TE07-E07F", 245, 96]
        ], "serie E")
      ],
      extensionGroup: "royal-lookup-3",
      canvasColorGroup: "sunbrella",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "chic-4",
      name: "Chic",
      subtitle: "4 archi",
      page: 22,
      pages: [22, 23],
      specs: ["Peso medio 12 kg", "Velocita consigliata 20 nodi"],
      variants: [
        ...widthVariants([
          ["TE08-B05F", 185, 73],
          ["TE08-B06F", 200, 79],
          ["TE08-B07F", 215, 85],
          ["TE08-B08F", 230, 91],
          ["TE08-B09F", 245, 96],
          ["TE08-B10F", 260, 102],
          ["TE08-B11F", 275, 108],
          ["TE08-B12F", 290, 114]
        ], "serie B"),
        ...widthVariants([
          ["TE08-E03H", 185, 73],
          ["TE08-E04H", 200, 79],
          ["TE08-E05H", 215, 85],
          ["TE08-E06H", 230, 91],
          ["TE08-E07H", 245, 96],
          ["TE08-E08H", 260, 102],
          ["TE08-E09H", 275, 108],
          ["TE08-E10H", 290, 114]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-chic-4",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "chic-3",
      name: "Chic",
      subtitle: "3 archi",
      page: 24,
      pages: [24, 25],
      specs: ["Peso medio 10 kg", "Velocita consigliata 18 nodi"],
      variants: [
        ...widthVariants([
          ["TE09-A01A", 150, 59],
          ["TE09-A02A", 170, 67],
          ["TE09-A03A", 185, 73],
          ["TE09-A04A", 200, 79],
          ["TE09-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE09-B04D", 170, 67],
          ["TE09-B05D", 185, 73],
          ["TE09-B06D", 200, 79],
          ["TE09-B07D", 215, 85],
          ["TE09-B08D", 230, 91],
          ["TE09-B09D", 245, 96]
        ], "serie B"),
        ...widthVariants([
          ["TE09-E02F", 170, 67],
          ["TE09-E03F", 185, 73],
          ["TE09-E04F", 200, 79],
          ["TE09-E05F", 215, 85],
          ["TE09-E06F", 230, 91],
          ["TE09-E07F", 245, 96]
        ], "serie E")
      ],
      extensionGroup: "chic-3",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "light360", "customPrint"]
    }),
    biminiProduct({
      id: "sport-plus-4",
      name: "Sport Plus",
      subtitle: "4 archi",
      page: 26,
      pages: [26, 27],
      specs: ["Peso medio 12 kg", "Velocita consigliata 22 nodi"],
      variants: [
        ...widthVariants([
          ["TE10-B03F", 150, 59],
          ["TE10-B04F", 170, 67],
          ["TE10-B05F", 185, 73],
          ["TE10-B06F", 200, 79],
          ["TE10-B07F", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE10-E01H", 150, 59],
          ["TE10-E02H", 170, 67],
          ["TE10-E03H", 185, 73],
          ["TE10-E04H", 200, 79],
          ["TE10-E05H", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-chic-4",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "sport-plus-3",
      name: "Sport Plus",
      subtitle: "3 archi",
      page: 28,
      pages: [28, 29],
      specs: ["Peso medio 10 kg", "Velocita consigliata 22 nodi"],
      variants: [
        ...widthVariants([
          ["TE11-A01A", 150, 59],
          ["TE11-A02A", 170, 67],
          ["TE11-A03A", 185, 73],
          ["TE11-A04A", 200, 79],
          ["TE11-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE11-B03D", 150, 59],
          ["TE11-B04D", 170, 67],
          ["TE11-B05D", 185, 73],
          ["TE11-B06D", 200, 79],
          ["TE11-B07D", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE11-E01D", 150, 59],
          ["TE11-E02D", 170, 67],
          ["TE11-E03F", 185, 73],
          ["TE11-E04F", 200, 79],
          ["TE11-E05F", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-3",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "sport-4",
      name: "Sport",
      subtitle: "4 archi",
      page: 30,
      pages: [30, 31],
      specs: ["Peso medio 9 kg", "Velocita consigliata 18 nodi"],
      variants: [
        ...widthVariants([
          ["TE12-B03F", 150, 59],
          ["TE12-B04F", 170, 67],
          ["TE12-B05F", 185, 73],
          ["TE12-B06F", 200, 79],
          ["TE12-B07F", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE12-E01H", 150, 59],
          ["TE12-E02H", 170, 67],
          ["TE12-E03H", 185, 73],
          ["TE12-E04H", 200, 79],
          ["TE12-E05H", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-chic-4",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "sport-3",
      name: "Sport",
      subtitle: "3 archi",
      page: 32,
      pages: [32, 33],
      specs: ["Peso medio 8 kg", "Velocita consigliata 18 nodi"],
      variants: [
        ...widthVariants([
          ["TE13-A01A", 150, 59],
          ["TE13-A02A", 170, 67],
          ["TE13-A03A", 185, 73],
          ["TE13-A04A", 200, 79],
          ["TE13-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE13-B03D", 150, 59],
          ["TE13-B04D", 170, 67],
          ["TE13-B05D", 185, 73],
          ["TE13-B06D", 200, 79],
          ["TE13-B07D", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE13-E01D", 150, 59],
          ["TE13-E02D", 170, 67],
          ["TE13-E03F", 185, 73],
          ["TE13-E04F", 200, 79]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-3",
      customizations: ["edgeZipper", "underArchZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "elegance-plus-4",
      name: "Elegance Plus",
      subtitle: "4 archi",
      page: 34,
      pages: [34, 35],
      specs: ["Peso medio 12 kg", "Velocita consigliata 20 nodi"],
      variants: [
        ...widthVariants([
          ["TE20-B03F", 150, 59],
          ["TE20-B04F", 170, 67],
          ["TE20-B05F", 185, 73],
          ["TE20-B06F", 200, 79],
          ["TE20-B07F", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE20-E01H", 150, 59],
          ["TE20-E02H", 170, 67],
          ["TE20-E03H", 185, 73],
          ["TE20-E04H", 200, 79],
          ["TE20-E05H", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-chic-4",
      customizations: ["edgeZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "elegance-plus-3",
      name: "Elegance Plus",
      subtitle: "3 archi",
      page: 36,
      pages: [36, 37],
      specs: ["Peso medio 10 kg", "Velocita consigliata 20 nodi"],
      variants: [
        ...widthVariants([
          ["TE19-A01A", 150, 59],
          ["TE19-A02A", 170, 67],
          ["TE19-A03A", 185, 73],
          ["TE19-A04A", 200, 79],
          ["TE19-A05A", 215, 85]
        ], "serie A"),
        ...widthVariants([
          ["TE19-B03D", 150, 59],
          ["TE19-B04D", 170, 67],
          ["TE19-B05D", 185, 73],
          ["TE19-B06D", 200, 79],
          ["TE19-B07D", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE19-E01D", 150, 59],
          ["TE19-E02D", 170, 67],
          ["TE19-E03F", 185, 73],
          ["TE19-E04F", 200, 79],
          ["TE19-E05F", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-3",
      customizations: ["edgeZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "elegance-3",
      name: "Elegance",
      subtitle: "3 archi",
      page: 38,
      pages: [38, 39],
      specs: ["Tubo alluminio 20 mm", "Attacchi in nylon"],
      variants: [
        ...widthVariants([
          ["TE14-B03D", 150, 59],
          ["TE14-B04D", 170, 67],
          ["TE14-B05D", 185, 73],
          ["TE14-B06D", 200, 79],
          ["TE14-B07D", 215, 85]
        ], "serie B"),
        ...widthVariants([
          ["TE14-E01D", 150, 59],
          ["TE14-E02D", 170, 67],
          ["TE14-E03F", 185, 73],
          ["TE14-E04F", 200, 79],
          ["TE14-E05F", 215, 85]
        ], "serie E")
      ],
      extensionGroup: "elegance-sport-3",
      customizations: ["edgeZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "elegance-2",
      name: "Elegance",
      subtitle: "2 archi",
      page: 40,
      pages: [40, 41],
      specs: ["Peso medio 5 kg", "Velocita consigliata 12 nodi"],
      variants: [
        ...widthVariants([
          ["TE15-B01B", 110, 43],
          ["TE15-B02B", 130, 51],
          ["TE15-B03B", 150, 59],
          ["TE15-B04B", 170, 67]
        ], "serie B"),
        ...widthVariants([
          ["TE15-E01B", 150, 59],
          ["TE15-E02B", 170, 67],
          ["TE15-E03B", 185, 73]
        ], "serie E")
      ],
      customizations: ["edgeZipper", "ledWaterproof", "customPrint"]
    }),
    biminiProduct({
      id: "cagnaro-steccato",
      name: "Cagnaro Steccato",
      subtitle: "Vela",
      page: 44,
      pages: [44, 45],
      specs: ["Tubo alluminio 20 mm", "Passaggio per amantiglio", "Prodotto per barche a vela"],
      variants: widthVariants([
        ["TE16-G", 250, 98],
        ["TE16-K", 300, 118],
        ["TE16-O", 350, 138]
      ]),
      customizations: ["customPrint"]
    }),
    biminiProduct({
      id: "cagnaro",
      name: "Cagnaro",
      subtitle: "Vela",
      page: 46,
      pages: [46, 47],
      specs: ["Anelli perimetrali inox", "Telo leggero per barche a vela"],
      variants: widthVariants([
        ["TE17-G", 250, 98],
        ["TE17-I", 275, 108],
        ["TE17-K", 300, 118],
        ["TE17-M", 325, 128]
      ]),
      customizations: ["customPrint"]
    }),
    biminiProduct({
      id: "fisher",
      name: "Fisher",
      subtitle: "Estraibile",
      page: 48,
      pages: [48, 49],
      specs: ["Peso medio 15 kg", "Velocita consigliata 15 nodi", "Prodotto su misura"],
      variants: widthVariants([
        ["TE03-C12P", 120, 47],
        ["TE03-C13P", 130, 51],
        ["TE03-C14P", 140, 55]
      ]),
      customizations: ["customPrint"],
      canvasColorGroup: "sunbrella",
      summary: "Tendalino estraibile in acciaio inox 316L e telo acrilico, prodotto su misura secondo il modello di barca."
    }),
    {
      id: "epic-inox",
      categoryId: "rollbar",
      name: "Epic Inox",
      subtitle: "Roll bar",
      image: "assets/previews/page-062.png",
      page: 62,
      pages: [62, 63],
      summary: "Roll bar in acciaio inox lucido 316L con piastra laterale in plexiglass nero.",
      specs: ["Altezza 130 cm", "Lunghezza 320 cm", "Tenditori a nastro di serie"],
      variants: widthVariants([
        ["RB21-D03L", 170, 67],
        ["RB21-D04L", 185, 73],
        ["RB21-D06L", 200, 79],
        ["RB21-D07L", 215, 85],
        ["RB21-D08L", 230, 91],
        ["RB21-D09L", 245, 96]
      ]),
      requiresCanvasColor: true,
      extensionGroup: "superior-epic",
      customizations: ["edgeZipper"]
    },
    rollbarProduct({
      id: "epic-black",
      name: "Epic Black",
      page: 64,
      pages: [64, 65],
      specs: ["Peso medio 35 kg", "Velocita consigliata 30 nodi", "Altezza 130 cm"],
      variants: widthVariants([
        ["RB20-D03L", 170, 67],
        ["RB20-D04L", 185, 73],
        ["RB20-D06L", 200, 79],
        ["RB20-D07L", 215, 85],
        ["RB20-D08L", 230, 91],
        ["RB20-D09L", 245, 96]
      ]),
      extensionGroup: "superior-epic"
    }),
    rollbarProduct({
      id: "wave-inox",
      name: "Wave Inox",
      page: 66,
      pages: [66, 67],
      specs: ["Velocita consigliata 30 nodi", "Altezza 130 cm"],
      variants: widthVariants([
        ["RB22-D03C", 170, 67],
        ["RB22-D04C", 185, 73],
        ["RB22-D06C", 200, 79],
        ["RB22-D07C", 215, 85],
        ["RB22-D08C", 230, 91],
        ["RB22-D09C", 245, 96]
      ]),
      extensionGroup: "frontsuperior-excellent-wave"
    }),
    rollbarProduct({
      id: "wave-black",
      name: "Wave Black",
      page: 68,
      pages: [68, 69],
      specs: ["Velocita consigliata 30 nodi", "Altezza 130 cm"],
      variants: widthVariants([
        ["RB23-D03C", 170, 67],
        ["RB23-D04C", 185, 73],
        ["RB23-D06C", 200, 79],
        ["RB23-D07C", 215, 85],
        ["RB23-D08C", 230, 91],
        ["RB23-D09C", 245, 96]
      ]),
      extensionGroup: "frontsuperior-excellent-wave"
    }),
    rollbarProduct({
      id: "superior",
      name: "Superior",
      page: 70,
      pages: [70, 71],
      specs: ["Peso medio 35 kg", "Velocita consigliata 30 nodi", "Altezze 120, 130, 150 cm"],
      variants: [
        ...widthVariants([
          ["RB04-C03N", 170, 67],
          ["RB04-C04N", 185, 73],
          ["RB04-C06N", 200, 79],
          ["RB04-C07N", 215, 85],
          ["RB04-C08N", 230, 91],
          ["RB04-C09N", 245, 96]
        ], "altezza 120 cm"),
        ...widthVariants([
          ["RB04-D03N", 170, 67],
          ["RB04-D04N", 185, 73],
          ["RB04-D06N", 200, 79],
          ["RB04-D07N", 215, 85],
          ["RB04-D08N", 230, 91],
          ["RB04-D09N", 245, 96]
        ], "altezza 130 cm"),
        ...widthVariants([
          ["RB04-F01N", 170, 67],
          ["RB04-F02N", 185, 73],
          ["RB04-F03N", 200, 79],
          ["RB04-F04N", 215, 85],
          ["RB04-F05N", 230, 91],
          ["RB04-F06N", 245, 96]
        ], "altezza 150 cm")
      ],
      extensionGroup: "superior-epic"
    }),
    rollbarProduct({
      id: "front-superior",
      name: "Front Superior",
      page: 72,
      pages: [72, 73],
      specs: ["Peso medio 30 kg", "Velocita consigliata 30 nodi", "Altezze 120, 130, 150 cm"],
      variants: [
        ...widthVariants([
          ["RB05-C03C", 170, 67],
          ["RB05-C04C", 185, 73],
          ["RB05-C06C", 200, 79],
          ["RB05-C07C", 215, 85],
          ["RB05-C08C", 230, 91],
          ["RB05-C09C", 245, 96]
        ], "altezza 120 cm"),
        ...widthVariants([
          ["RB05-D03C", 170, 67],
          ["RB05-D04C", 185, 73],
          ["RB05-D06C", 200, 79],
          ["RB05-D07C", 215, 85],
          ["RB05-D08C", 230, 91],
          ["RB05-D09C", 245, 96]
        ], "altezza 130 cm"),
        ...widthVariants([
          ["RB05-F01C", 170, 67],
          ["RB05-F02C", 185, 73],
          ["RB05-F03C", 200, 79],
          ["RB05-F04C", 215, 85],
          ["RB05-F05C", 230, 91],
          ["RB05-F06C", 245, 96]
        ], "altezza 150 cm")
      ],
      extensionGroup: "frontsuperior-excellent-wave"
    }),
    rollbarProduct({
      id: "excellent",
      name: "Excellent",
      page: 74,
      pages: [74, 75],
      specs: ["Peso medio 30 kg", "Velocita consigliata 30 nodi", "Altezza 130 cm"],
      variants: widthVariants([
        ["RB06-D01C", 145, 57],
        ["RB06-D02C", 155, 61],
        ["RB06-D03C", 170, 67],
        ["RB06-D05C", 190, 75]
      ]),
      extensionGroup: "frontsuperior-excellent-wave"
    }),
    rollbarProduct({
      id: "strange-xl",
      name: "Strange XL",
      subtitle: "Roll Bar con tendalino",
      page: 76,
      pages: [76, 77],
      specs: ["Peso medio 25 kg", "Velocita consigliata 30 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["RB09-E02K", 170, 67],
        ["RB09-E03K", 185, 73],
        ["RB09-E04K", 200, 79],
        ["RB09-E05K", 215, 85],
        ["RB09-E06K", 230, 91],
        ["RB09-E07K", 245, 96]
      ]),
      extensionGroup: "strange"
    }),
    rollbarProduct({
      id: "strange",
      name: "Strange",
      subtitle: "Roll Bar con tendalino",
      page: 78,
      pages: [78, 79],
      specs: ["Peso medio 25 kg", "Velocita consigliata 30 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["RB07-E02F", 170, 67],
        ["RB07-E03F", 185, 73],
        ["RB07-E04F", 200, 79],
        ["RB07-E05F", 215, 85],
        ["RB07-E06F", 230, 91],
        ["RB07-E07F", 245, 96]
      ]),
      extensionGroup: "strange"
    }),
    rollbarProduct({
      id: "strange-xl-black",
      name: "Strange XL Black",
      subtitle: "Roll Bar con tendalino",
      page: 80,
      pages: [80, 81],
      specs: ["Peso medio 25 kg", "Velocita consigliata 30 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["RB26-E02K", 170, 67],
        ["RB26-E03K", 185, 73],
        ["RB26-E04K", 200, 79],
        ["RB26-E05K", 215, 85],
        ["RB26-E06K", 230, 91],
        ["RB26-E07K", 245, 96]
      ]),
      extensionGroup: "strange"
    }),
    rollbarProduct({
      id: "strange-black",
      name: "Strange Black",
      subtitle: "Roll Bar con tendalino",
      page: 82,
      pages: [82, 83],
      specs: ["Peso medio 25 kg", "Velocita consigliata 30 nodi", "Altezza 140 cm"],
      variants: widthVariants([
        ["RB25-E02F", 170, 67],
        ["RB25-E03F", 185, 73],
        ["RB25-E04F", 200, 79],
        ["RB25-E05F", 215, 85],
        ["RB25-E06F", 230, 91],
        ["RB25-E07F", 245, 96]
      ]),
      extensionGroup: "strange"
    }),
    rollbarProduct({
      id: "universal",
      name: "Universal",
      subtitle: "Tendalino per roll bar",
      page: 84,
      pages: [84, 85],
      specs: ["Peso medio 5 kg", "Velocita consigliata 15 nodi"],
      variants: widthVariants([
        ["RB03-C03E", 170, 67],
        ["RB03-C04E", 185, 73],
        ["RB03-C06E", 200, 79],
        ["RB03-C07E", 215, 85]
      ]),
      extensionGroup: "jolly-universal"
    }),
    rollbarProduct({
      id: "jolly",
      name: "Jolly",
      subtitle: "Tendalino per roll bar",
      page: 86,
      pages: [86, 87],
      specs: ["Peso medio 5 kg", "Velocita consigliata 15 nodi"],
      variants: widthVariants([
        ["RB08-C01E", 145, 60],
        ["RB08-C02E", 155, 61],
        ["RB08-C03E", 170, 67],
        ["RB08-C05E", 190, 75]
      ]),
      extensionGroup: "jolly-universal"
    }),
    rollbarProduct({
      id: "roll-bar-barche-gommoni",
      name: "Roll Bar per barche e gommoni",
      subtitle: "Roll Bar",
      page: 88,
      pages: [88],
      specs: ["Peso medio 20 kg", "Tubo inox 40 mm"],
      variants: fixedVariants([
        { code: "RB01-C02", label: "A 130-250 cm, B 120 cm" },
        { code: "RB01-D02", label: "A 130 cm" },
        { code: "RB01-F01", label: "A 150 cm" }
      ]),
      requiresCanvasColor: false,
      customizations: []
    }),
    rollbarProduct({
      id: "roll-bar-gommoni",
      name: "Roll Bar per gommoni",
      subtitle: "Roll Bar",
      page: 89,
      pages: [89],
      specs: ["Peso medio 20 kg", "Tubo inox 40 mm"],
      variants: fixedVariants([
        { code: "RB02-D01", label: "A 90-200 cm" }
      ]),
      requiresCanvasColor: false,
      customizations: []
    }),
    ttopProduct({
      id: "ttop-dynamic",
      name: "T-Top Dynamic",
      page: 92,
      pages: [92, 93],
      summary: "T-Top in acciaio inox lucido 316L con copertura in Sunbrella Plus.",
      variants: fixedVariants([
        { code: "TT05-S", label: "115x160 cm - Piccolo - consolle da 40 a 90 cm" },
        { code: "TT05-L", label: "145x200 cm - Grande - consolle da 70 a 125 cm" }
      ])
    }),
    ttopProduct({
      id: "ttop-pro-fish",
      name: "T-Top Pro-Fish",
      page: 94,
      pages: [94, 95],
      summary: "T-Top in alluminio verniciato nero con copertura in Sunbrella Plus.",
      variants: fixedVariants([
        { code: "TT04-S", label: "115x160 cm - Piccolo - consolle da 40 a 90 cm" },
        { code: "TT04-L", label: "145x200 cm - Grande - consolle da 70 a 125 cm" }
      ])
    }),
    ttopProduct({
      id: "sprayhood-dynamic",
      name: "Sprayhood Dynamic",
      page: 96,
      pages: [96],
      summary: "Sprayhood in tessuto acrilico resinato con finestratura in crystal.",
      variants: fixedVariants([{ code: "TT06", label: "Sprayhood Dynamic" }])
    }),
    ttopProduct({
      id: "sprayhood-pro-fish",
      name: "Sprayhood Pro-Fish",
      page: 97,
      pages: [97],
      summary: "Sprayhood per T-Top in acrilico con finestrature in crystal.",
      variants: fixedVariants([{ code: "TT07", label: "Sprayhood Pro-Fish" }])
    }),
    {
      id: "copriconsolle",
      categoryId: "coperture",
      name: "Copriconsolle",
      subtitle: "Console covers",
      image: "assets/previews/covers-100.png",
      pages: [100],
      summary: "Copertura con bordo inferiore e chiusura elastica regolabile per migliore aderenza allo scafo.",
      specs: ["Poliestere", "Realizzazioni fuori misura disponibili"],
      variants: fixedVariants([
        { code: "CO01-S", label: "Piccolo - A 125 cm, B 65 cm, C 65 cm, D 60 cm, E 25 cm" },
        { code: "CO01-M", label: "Medio - A 135 cm, B 70 cm, C 100 cm, D 65 cm, E 30 cm" },
        { code: "CO01-L", label: "Grande - A 145 cm, B 75 cm, C 120 cm, D 70 cm, E 35 cm" }
      ]),
      requiresCanvasColor: true,
      customizations: ["customPrint"],
      allowCustomNotes: true
    },
    {
      id: "coprimotori",
      categoryId: "coperture",
      name: "Coprimotori",
      subtitle: "Engine covers",
      image: "assets/previews/covers-100.png",
      pages: [102],
      summary: "Copertura motore con bordo inferiore e chiusura elastica regolabile.",
      specs: ["Poliestere", "Realizzazioni fuori misura disponibili"],
      variants: fixedVariants([
        { code: "CO03-A", label: "2.5 / 5 HP - A 22 cm, B 42 cm, C 27 cm" },
        { code: "CO03-B", label: "6 / 10 HP - A 28 cm, B 46 cm, C 32 cm" },
        { code: "CO03-C", label: "15 / 30 HP - A 28 cm, B 56 cm, C 40 cm" },
        { code: "CO03-D", label: "20 / 60 HP - A 37 cm, B 66 cm, C 48 cm" },
        { code: "CO03-E", label: "75 / 90 HP - A 40 cm, B 68 cm, C 53 cm" },
        { code: "CO03-F", label: "115 / 125 HP - A 46 cm, B 73 cm, C 60 cm" },
        { code: "CO03-G", label: "135 / 250 HP - A 55 cm, B 90 cm, C 60 cm" }
      ]),
      requiresCanvasColor: true,
      customizations: ["customPrint"],
      allowCustomNotes: true
    },
    {
      id: "copriranda",
      categoryId: "coperture",
      name: "Copriranda",
      subtitle: "Mainsail cover",
      image: "assets/previews/covers-100.png",
      pages: [106],
      summary: "Copertura randa su misura con occhielli, fibbie inferiori e fibbie laterali.",
      specs: ["Prodotto su misura", "Indicare dettagli nella nota custom"],
      variants: fixedVariants([
        { code: "CO08-A", label: "Boma da 0 a 3 mt" },
        { code: "CO08-B", label: "Boma da 3 a 4 mt" },
        { code: "CO08-C", label: "Boma da 4 a 5 mt" },
        { code: "CO08-D", label: "Boma da 5 a 6 mt" },
        { code: "CO08-E", label: "Boma da 6 a 7 mt" }
      ]),
      requiresCanvasColor: true,
      customizations: ["customPrint"],
      allowCustomNotes: true
    },
    {
      id: "puntoni",
      categoryId: "accessori-tendalino",
      name: "Puntoni",
      subtitle: "Struts",
      image: preview(112),
      pages: [112, 113],
      summary: "Accessorio utile a irrobustire il telaio e tenere il tendalino alto quando ripiegato.",
      specs: ["Lunghezza 1 metro", "Fuori misura disponibili"],
      variants: fixedVariants([
        { code: "AT01-009", label: "40 mm - Majestic" },
        { code: "AT01-004", label: "30 mm - Exclusive" },
        { code: "AT01-003", label: "25 mm - Royal/Royal XL 4 archi, Look Up 4 archi, Prestige 3 archi" },
        { code: "AT01-002", label: "22 mm - Royal 3 archi, Look Up 3 archi" },
        { code: "AT01-001", label: "20 mm - Sport Plus 4/3 archi" },
        { code: "AT01-007", label: "25 mm - Chic 4/3 archi" },
        { code: "AT01-005", label: "20 mm - Sport 4/3 archi" },
        { code: "AT01-006", label: "20 mm - Elegance 3/2 archi" },
        { code: "AT01-008", label: "22 mm - Elegance Plus 4/3 archi" }
      ]),
      allowCustomNotes: true
    },
    {
      id: "tenditori",
      categoryId: "accessori-tendalino",
      name: "Tenditori a nastro",
      subtitle: "Straps",
      image: preview(114),
      pages: [114],
      summary: "Coppia di tenditori a nastro con fibbie inox, ponticelli e agganci rapidi inox.",
      specs: ["Larghezza 25 mm", "Lunghezza 200 cm"],
      variants: fixedVariants([
        { code: "AT02-006", label: "Nero" },
        { code: "AT02-004", label: "Blu" },
        { code: "AT02-003", label: "Bianco" },
        { code: "AT02-002", label: "Beige" },
        { code: "AT02-005", label: "Grigio" }
      ])
    },
    {
      id: "snodo-forcella-inox",
      categoryId: "accessori-inox",
      name: "Snodo a forcella inox",
      subtitle: "Jaw slide",
      image: preview(117),
      pages: [117],
      summary: "Snodo a forcella in acciaio inox AISI 316 per tubo da 20 a 40 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: fixedVariants([
        { code: "AT05-008-20", label: "20 mm" },
        { code: "AT05-008-22", label: "22 mm" },
        { code: "AT05-008-25", label: "25 mm" },
        { code: "AT05-008-30", label: "30 mm" },
        { code: "AT05-008-40", label: "40 mm" }
      ])
    },
    {
      id: "supporto-perno-sfilabile",
      categoryId: "accessori-inox",
      name: "Supporto a forcella piatto con perno sfilabile",
      subtitle: "Flat deck hinge",
      image: preview(116),
      pages: [116],
      summary: "Supporto in acciaio inox AISI 316 per installazione tendalino su superfici piane.",
      specs: ["Codice unico", "Acciaio inox AISI 316"],
      variants: fixedVariants([{ code: "AT05-017", label: "Supporto a forcella piatto con perno sfilabile" }])
    },
    {
      id: "luce-rollbar-ttop",
      categoryId: "accessori-rollbar-ttop",
      name: "Luci per Roll Bar e T-Top",
      subtitle: "Roll bar and T-Top lights",
      image: preview(125),
      pages: [125],
      summary: "Luci e fanali dedicati a roll bar e T-Top.",
      specs: ["Alimentazione secondo scheda prodotto"],
      variants: fixedVariants([
        { code: "AR02-002", label: "Fanale di fonda 360° plastica" },
        { code: "AR02-008", label: "Luci di via Nemo" },
        { code: "AR02-003", label: "Plafoniera compatta" },
        { code: "AR02-001", label: "Fanale di fonda 360° inox" }
      ])
    },
    {
      id: "teli-prolunga",
      categoryId: "personalizzazioni",
      name: "Teli di prolunga",
      subtitle: "Extension canvases",
      image: preview(128),
      pages: [128, 129, 130, 131],
      summary: "Teli anteriori, laterali e posteriori selezionabili solo dentro i modelli compatibili.",
      specs: ["Stesso tessuto/colore del tendalino oppure rete microforata", "Cerniere comprese se si acquistano i teli"],
      consultDetails: [
        "Ordinabili dal configuratore dei bimini e roll bar compatibili.",
        "La scelta laterale viene gestita come lato destro e lato sinistro quando il modello lo prevede.",
        "Se si sceglie rete microforata, il colore rete resta obbligatorio."
      ],
      consultOnly: true
    },
    {
      id: "cerniere-bordo",
      categoryId: "personalizzazioni",
      name: "Cerniere su bordo",
      subtitle: "Zippers on edge",
      image: preview(132),
      pages: [132],
      summary: "Predisposizione con cerniera divisibile YKK lungo uno dei lati del telo.",
      specs: ["Codice PE03-001", "Lati: destra, sinistra, poppa, prua"],
      consultDetails: [
        "Ordinabile dal configuratore dei prodotti compatibili.",
        "Se vengono selezionati teli di prolunga, la cerniera di unione non viene duplicata perché è già compresa.",
        "Il cliente può indicare nelle note eventuali esigenze particolari."
      ],
      consultOnly: true
    },
    {
      id: "led-waterproof-info",
      categoryId: "personalizzazioni",
      name: "LED waterproof",
      subtitle: "Lavorazione custom",
      image: preview(134),
      pages: [134],
      summary: "Strip LED waterproof integrata al centro del tendalino, con scelta lunghezza 100 o 150 cm.",
      specs: ["PE02-001", "PE02-005 100 cm", "PE02-006 150 cm"],
      consultDetails: [
        "Ordinabile dal configuratore dei prodotti compatibili.",
        "La strip LED è una sola e viene installata al centro del tendalino.",
        "Le lunghezze selezionabili sono 100 cm e 150 cm."
      ],
      consultOnly: true
    },
    {
      id: "tubi-inox",
      categoryId: "tubi",
      name: "Tubi acciaio inox",
      subtitle: "Stainless steel tubes",
      image: preview(144),
      pages: [144],
      summary: "Tubi in acciaio inox lucido 316L e acciaio 304 spazzolato.",
      specs: ["Taglio su misura disponibile"],
      variants: fixedVariants([
        { code: "TB01-001", label: "20 mm - spessore 1.0 mm" },
        { code: "TB01-002", label: "22 mm - spessore 1.2 mm" },
        { code: "TB01-003", label: "25 mm - spessore 1.2 mm" },
        { code: "TB01-004", label: "25 mm - spessore 1.5 mm" },
        { code: "TB01-005", label: "30 mm - spessore 1.5 mm" },
        { code: "TB01-008", label: "40 mm - spessore 1.5 mm" }
      ]),
      allowCustomNotes: true
    },
    {
      id: "rete-ombreggiante",
      categoryId: "tessuti",
      name: "Rete ombreggiante Serge Ferrari",
      subtitle: "Shading mesh",
      image: preview(150),
      pages: [150],
      summary: "Rete ombreggiante in filo di poliestere HT rivestito PVC.",
      specs: ["Altezza rotolo 180 cm", "Peso 500 gr/mq", "Resistente ai raggi UV"],
      variants: fixedVariants(meshColors.map(color => ({ code: color.code, label: color.name })))
    },
    {
      id: "telai-custom",
      categoryId: "telai",
      name: "Telai su misura",
      subtitle: "Frames",
      image: preview(140),
      pages: [140, 141],
      summary: "Telai su misura per tendalini e sprayhood in alluminio o acciaio inox.",
      specs: ["TL004 - 4 archi", "TL003 - 3 archi"],
      variants: fixedVariants([
        { code: "TL004", label: "Telaio 4 archi" },
        { code: "TL003", label: "Telaio 3 archi" }
      ]),
      allowCustomNotes: true
    }
  ];

  const inoxProducts = [
    catalogItem({
      id: "inox-supporto-forcella-piatto-vite",
      categoryId: "accessori-inox",
      name: "Supporto a forcella piatto con vite",
      subtitle: "Flat deck hinge with screw",
      image: itemImage("inox-supporto-forcella-piatto-vite"),
      page: 116,
      summary: "Supporto inox AISI 316 per installazione tendalino su superficie piana.",
      specs: ["Acciaio inox AISI 316", "Installazione su superficie piana"],
      variants: [{ code: "AT05-023", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-piatto-perno-sfilabile",
      categoryId: "accessori-inox",
      name: "Supporto a forcella piatto con perno sfilabile",
      subtitle: "Flat deck hinge with removable pin",
      image: itemImage("inox-supporto-forcella-piatto-perno-sfilabile"),
      page: 116,
      summary: "Supporto inox AISI 316 per installazione tendalino su superficie piana.",
      specs: ["Acciaio inox AISI 316", "Perno sfilabile"],
      variants: [{ code: "AT05-022", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-snodata-180",
      categoryId: "accessori-inox",
      name: "Supporto con forcella snodata a 180 gradi",
      subtitle: "180 swivelling deck hinge",
      image: itemImage("inox-supporto-forcella-snodata-180"),
      page: 116,
      summary: "Supporto inox AISI 316 orientabile, per murata o superficie piana.",
      specs: ["Acciaio inox AISI 316", "Orientabile 180 gradi"],
      variants: [{ code: "AT05-019", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-snodata-180-perno",
      categoryId: "accessori-inox",
      name: "Supporto con forcella snodata a 180 gradi con perno sfilabile",
      subtitle: "180 swivelling deck hinge with pin",
      image: itemImage("inox-supporto-forcella-snodata-180-perno"),
      page: 116,
      summary: "Supporto inox AISI 316 orientabile con perno sfilabile.",
      specs: ["Acciaio inox AISI 316", "Perno sfilabile"],
      variants: [{ code: "AT05-018", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-sgancio-rapido",
      categoryId: "accessori-inox",
      name: "Supporto con forcella a sgancio rapido",
      subtitle: "Deck hinge with snap hooking system",
      image: itemImage("inox-supporto-forcella-gancio-rapido"),
      page: 116,
      summary: "Supporto inox AISI 316 per installazione tendalino su murata o superficie piana.",
      specs: ["Acciaio inox AISI 316", "Sgancio rapido"],
      variants: [{ code: "AT05-017", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-snodata-180-misure",
      categoryId: "accessori-inox",
      name: "Supporto con forcella snodata a 180 gradi",
      subtitle: "180 swivelling deck hinge",
      image: itemImage("inox-supporto-forcella-snodata-180-misure"),
      page: 116,
      summary: "Supporto inox AISI 316 orientabile, disponibile per tubo 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-012-22", label: "22 mm" },
        { code: "AT05-012-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-supporto-alta-stabilita-tubo",
      categoryId: "accessori-inox",
      name: "Supporto ad alta stabilita per tubo",
      subtitle: "High stability deck hinge",
      image: itemImage("inox-supporto-alta-stabilita-tubo"),
      page: 116,
      summary: "Supporto inox AISI 316 ad alta stabilita per tubo da 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-009", label: "22 mm" },
        { code: "AT05-010", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-supporto-parete",
      categoryId: "accessori-inox",
      name: "Supporto a parete",
      subtitle: "Bulkhead mount deck hinge",
      image: itemImage("inox-supporto-parete"),
      page: 116,
      summary: "Supporto inox AISI 316 per installazione del tendalino sulla murata della barca.",
      specs: ["Acciaio inox AISI 316", "48 x 73 mm"],
      variants: [{ code: "AT05-024", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-concavo-perno-sfilabile",
      categoryId: "accessori-inox",
      name: "Supporto a forcella concavo con perno sfilabile",
      subtitle: "Concave deck hinge with removable pin",
      image: itemImage("inox-supporto-forcella-concavo-perno-sfilabile"),
      page: 116,
      summary: "Supporto inox AISI 316 concavo con perno sfilabile per tubo da 20 a 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [{ code: "AT05-020", label: "Da 20 a 25 mm" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-concavo-vite-20-25",
      categoryId: "accessori-inox",
      name: "Supporto a forcella concavo con vite",
      subtitle: "Concave deck hinge with screw",
      image: itemImage("inox-supporto-forcella-concavo-vite-20-25"),
      page: 117,
      summary: "Supporto inox AISI 316 concavo con vite per tubo da 20 a 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [{ code: "AT05-021", label: "Da 20 a 25 mm" }]
    }),
    catalogItem({
      id: "inox-supporto-forcella-concavo-vite-40",
      categoryId: "accessori-inox",
      name: "Supporto a forcella concavo con vite",
      subtitle: "Concave deck hinge with screw",
      image: itemImage("inox-supporto-forcella-concavo-vite-40"),
      page: 117,
      summary: "Supporto inox AISI 316 concavo con vite per tubo 40 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [{ code: "AT05-031", label: "40 mm" }]
    }),
    catalogItem({
      id: "inox-snodo-forcella-apribile-vite",
      categoryId: "accessori-inox",
      name: "Snodo a forcella apribile con vite",
      subtitle: "Opening jaw slide with screw",
      image: itemImage("inox-snodo-forcella-apribile-vite"),
      page: 117,
      summary: "Snodo apribile inox AISI 316 per tubo da 22 a 30 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-007-22", label: "22 mm" },
        { code: "AT05-007-25", label: "25 mm" },
        { code: "AT05-007-30", label: "30 mm" }
      ]
    }),
    catalogItem({
      id: "inox-snodo-forcella-apribile-perno-sfilabile",
      categoryId: "accessori-inox",
      name: "Snodo a forcella apribile con perno sfilabile",
      subtitle: "Opening jaw slide with pin",
      image: itemImage("inox-snodo-forcella-apribile-perno-sfilabile"),
      page: 117,
      summary: "Snodo apribile inox AISI 316 con perno sfilabile, per tubo da 22 a 30 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-006-22", label: "22 mm" },
        { code: "AT05-006-25", label: "25 mm" },
        { code: "AT05-006-30", label: "30 mm" }
      ]
    }),
    catalogItem({
      id: "inox-snodo-forcella-apribile",
      categoryId: "accessori-inox",
      name: "Snodo a forcella apribile",
      subtitle: "Opening jaw slide",
      image: itemImage("inox-snodo-forcella-apribile"),
      page: 117,
      summary: "Snodo a forcella apribile in acciaio inox per tubo 35 mm.",
      specs: ["Acciaio inox", "35 mm"],
      variants: [{ code: "AT05-025", label: "35 mm" }]
    }),
    catalogItem({
      id: "inox-curva-90-microfusa",
      categoryId: "accessori-inox",
      name: "Curva a 90 gradi microfusa",
      subtitle: "Elbow 90",
      image: itemImage("inox-curva-90-microfusa"),
      page: 117,
      summary: "Curva inox AISI 316 per tubo da 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-004-22", label: "22 mm" },
        { code: "AT05-004-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-cappuccio-terminale",
      categoryId: "accessori-inox",
      name: "Cappuccio terminale",
      subtitle: "Top cap",
      image: itemImage("inox-cappuccio-terminale"),
      page: 117,
      summary: "Cappuccio terminale inox AISI 316 per tubo da 20 a 40 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-002-20", label: "20 mm" },
        { code: "AT05-002-22", label: "22 mm" },
        { code: "AT05-002-25", label: "25 mm" },
        { code: "AT05-002-30", label: "30 mm" },
        { code: "AT05-002-40", label: "40 mm" }
      ]
    }),
    catalogItem({
      id: "inox-snodo-forcella",
      categoryId: "accessori-inox",
      name: "Snodo a forcella",
      subtitle: "Jaw slide",
      image: itemImage("inox-snodo-forcella"),
      page: 117,
      summary: "Snodo a forcella inox AISI 316 per tubo da 20 a 40 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-008-20", label: "20 mm" },
        { code: "AT05-008-22", label: "22 mm" },
        { code: "AT05-008-25", label: "25 mm" },
        { code: "AT05-008-30", label: "30 mm" },
        { code: "AT05-008-40", label: "40 mm" }
      ]
    }),
    catalogItem({
      id: "inox-cerniera-snodata",
      categoryId: "accessori-inox",
      name: "Cerniera snodata",
      subtitle: "Jointed hinge",
      image: itemImage("inox-cerniera-snodata"),
      page: 117,
      summary: "Cerniera snodata inox AISI 316 con perno di blocco.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-003-22", label: "22 mm" },
        { code: "AT05-003-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-t-90-microfusa",
      categoryId: "accessori-inox",
      name: "T 90 microfusa",
      subtitle: "Tee 90",
      image: itemImage("inox-t-90-microfusa"),
      page: 118,
      summary: "T a 90 gradi inox AISI 316 per tubo da 22 a 40 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-013-22", label: "22 mm" },
        { code: "AT05-013-25", label: "25 mm" },
        { code: "AT05-013-30", label: "30 mm" },
        { code: "AT05-013-40", label: "40 mm" }
      ]
    }),
    catalogItem({
      id: "inox-t-90-stampata",
      categoryId: "accessori-inox",
      name: "T 90 stampata",
      subtitle: "Welded tee 90",
      image: itemImage("inox-t-90-stampata"),
      page: 118,
      summary: "T a 90 gradi stampata inox AISI 316 per tubo 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-014-22", label: "22 mm" },
        { code: "AT05-014-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-raccordo-tubi-telescopici",
      categoryId: "accessori-inox",
      name: "Raccordo per tubi telescopici",
      subtitle: "Connectors for telescopic tubes",
      image: itemImage("inox-raccordo-tubi-telescopici"),
      page: 118,
      summary: "Raccordo inox AISI 316 per tubi telescopici.",
      specs: ["Acciaio inox AISI 316"],
      variants: [{ code: "AT05-027", label: "22-25 mm" }]
    }),
    catalogItem({
      id: "inox-perno-sfilabile",
      categoryId: "accessori-inox",
      name: "Perno sfilabile in acciaio inox",
      subtitle: "Removable drop nose pin",
      image: itemImage("inox-perno-sfilabile-inox"),
      page: 118,
      summary: "Perno inox AISI 316 con linguetta pieghevole a molla.",
      specs: ["Acciaio inox AISI 316"],
      variants: [{ code: "AT05-026", label: "6 mm" }]
    }),
    catalogItem({
      id: "inox-tensionatore-bimini",
      categoryId: "accessori-inox",
      name: "Tensionatore per bimini",
      subtitle: "Bimini tensioner",
      image: itemImage("inox-tensionatore-bimini"),
      page: 118,
      summary: "Tensionatore in acciaio inox AISI 316 per struttura tendalino.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-016-22", label: "22 mm" },
        { code: "AT05-016-25", label: "25 mm" },
        { code: "AT05-016-30", label: "30 mm" }
      ]
    }),
    catalogItem({
      id: "inox-tappo-tubo",
      categoryId: "accessori-inox",
      name: "Tappo per tubo",
      subtitle: "Bullet end plug for tube",
      image: itemImage("inox-tappo-tubo"),
      page: 118,
      summary: "Tappo terminale inox AISI 316 per tubo da 20 a 30 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-015-20", label: "20 mm" },
        { code: "AT05-015-22", label: "22 mm" },
        { code: "AT05-015-25", label: "25 mm" },
        { code: "AT05-015-30", label: "30 mm" }
      ]
    }),
    catalogItem({
      id: "inox-base-tonda-tubo",
      categoryId: "accessori-inox",
      name: "Base tonda per tubo",
      subtitle: "Round tube base",
      image: itemImage("inox-base-tonda-tubo"),
      page: 118,
      summary: "Base tonda inox AISI 316 per tubo da 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-001-22", label: "22 mm" },
        { code: "AT05-001-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-giunzione-tubo",
      categoryId: "accessori-inox",
      name: "Giunzione per tubo",
      subtitle: "Tube connection",
      image: itemImage("inox-giunzione-tubo"),
      page: 118,
      summary: "Giunzione inox AISI 316 per tubo da 22 o 25 mm.",
      specs: ["Acciaio inox AISI 316"],
      variants: [
        { code: "AT05-005-22", label: "22 mm" },
        { code: "AT05-005-25", label: "25 mm" }
      ]
    }),
    catalogItem({
      id: "inox-cappuccio-terminale-forcella",
      categoryId: "accessori-inox",
      name: "Cappuccio terminale a forcella",
      subtitle: "Fork end cap",
      image: itemImage("inox-cappuccio-terminale-forcella"),
      page: 118,
      summary: "Cappuccio terminale a forcella in acciaio inox.",
      specs: ["Acciaio inox"],
      variants: [{ code: "AT05-032", label: "25 mm" }]
    }),
    catalogItem({
      id: "inox-molla-tubi-telescopici-8",
      categoryId: "accessori-inox",
      name: "Molla con nottolino per tubi telescopici",
      subtitle: "Stainless steel spring",
      image: itemImage("inox-molla-tubi-telescopici-8mm"),
      page: 119,
      summary: "Molla inox AISI 316 con nottolino, sezione nottolino 8 mm.",
      specs: ["Acciaio inox AISI 316", "Nottolino 8 mm"],
      variants: [
        { code: "AT05-028", label: "Alto" },
        { code: "AT05-029", label: "Basso" }
      ]
    }),
    catalogItem({
      id: "inox-molla-tubi-telescopici-6",
      categoryId: "accessori-inox",
      name: "Molla con nottolino per tubi telescopici",
      subtitle: "Stainless steel spring",
      image: itemImage("inox-molla-tubi-telescopici-6mm"),
      page: 119,
      summary: "Molla inox AISI 316 con nottolino, sezione nottolino 6 mm.",
      specs: ["Acciaio inox AISI 316", "Nottolino 6 mm"],
      variants: [{ code: "AT05-033", label: "Basso" }]
    }),
    catalogItem({
      id: "inox-basetta-epdm-forcella",
      categoryId: "accessori-inox",
      name: "Basetta in EPDM con forcella inox",
      subtitle: "EPDM support with steel fork",
      image: itemImage("inox-basetta-epdm-forcella"),
      page: 119,
      summary: "Basetta in EPDM con forcella inox per installazione tendalino su gommone.",
      specs: ["EPDM", "Forcella inox"],
      variants: [{ code: "AT04-001", label: "Codice unico" }]
    }),
    catalogItem({
      id: "inox-supporto-epdm",
      categoryId: "accessori-inox",
      name: "Supporto in EPDM",
      subtitle: "EPDM support",
      image: itemImage("inox-supporto-epdm"),
      page: 119,
      summary: "Supporto in EPDM per installazione tendalino su gommone.",
      specs: ["EPDM", "Incollaggio su tubolari"],
      variants: [
        { code: "AT04-003", label: "Nero" },
        { code: "AT04-002", label: "Grigio" }
      ]
    })
  ];

  const nylonProducts = [
    catalogItem({
      id: "nylon-supporto-forcella-piatto-vite",
      categoryId: "accessori-nylon",
      name: "Supporto a forcella piatto con vite",
      subtitle: "Flat deck hinge with screw",
      image: itemImage("nylon-supporto-forcella-piatto-vite"),
      page: 120,
      summary: "Supporto in nylon per installazione tendalino su superficie piana.",
      specs: ["Nylon", "Interasse fori 4 cm"],
      variants: [
        { code: "AT06-013", label: "Bianco" },
        { code: "AT06-014", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-supporto-parete",
      categoryId: "accessori-nylon",
      name: "Supporto a parete",
      subtitle: "Side mount deck hinge",
      image: itemImage("nylon-supporto-parete"),
      page: 120,
      summary: "Supporto in nylon per installazione tendalino su murata.",
      specs: ["Nylon", "Interasse fori 4 cm"],
      variants: [
        { code: "AT06-015", label: "Bianco" },
        { code: "AT06-016", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-boccola",
      categoryId: "accessori-nylon",
      name: "Boccola",
      subtitle: "Rowlock attachment",
      image: itemImage("nylon-boccola"),
      page: 120,
      summary: "Boccola in nylon per installazione tendalino a scalmiere.",
      specs: ["Nylon"],
      variants: [
        { code: "AT06-003", label: "Bianco" },
        { code: "AT06-004", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-cappuccio-terminale",
      categoryId: "accessori-nylon",
      name: "Cappuccio terminale",
      subtitle: "End cap",
      image: itemImage("nylon-cappuccio-terminale"),
      page: 120,
      summary: "Cappuccio terminale in nylon per tubo 20 o 22 mm.",
      specs: ["Nylon"],
      variants: [
        { code: "AT06-005", label: "20 mm - Bianco" },
        { code: "AT06-006", label: "20 mm - Nero" },
        { code: "AT06-017", label: "22 mm - Bianco" }
      ]
    }),
    catalogItem({
      id: "nylon-piedino-boccola",
      categoryId: "accessori-nylon",
      name: "Piedino per boccola",
      subtitle: "Rowlock attachment pin",
      image: itemImage("nylon-piedino-boccola"),
      page: 120,
      summary: "Piedino in nylon diametro 12 mm.",
      specs: ["Nylon", "12 mm"],
      variants: [
        { code: "AT06-009", label: "Bianco" },
        { code: "AT06-010", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-attacco-tubo",
      categoryId: "accessori-nylon",
      name: "Attacco per tubo",
      subtitle: "Mounting clip for tube",
      image: itemImage("nylon-attacco-tubo"),
      page: 120,
      summary: "Attacco in nylon per installazione tendalino su tubo 25 mm.",
      specs: ["Nylon", "25 mm"],
      variants: [
        { code: "AT06-001", label: "Bianco" },
        { code: "AT06-002", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-snodo",
      categoryId: "accessori-nylon",
      name: "Snodo",
      subtitle: "Articulated joint",
      image: itemImage("nylon-snodo"),
      page: 120,
      summary: "Snodo in nylon per tendalino con tubo 20 mm.",
      specs: ["Nylon", "20 mm"],
      variants: [
        { code: "AT06-011", label: "Bianco" },
        { code: "AT06-012", label: "Nero" }
      ]
    }),
    catalogItem({
      id: "nylon-giunto",
      categoryId: "accessori-nylon",
      name: "Giunto",
      subtitle: "Jaw slide",
      image: itemImage("nylon-giunto"),
      page: 120,
      summary: "Giunto in nylon per tendalino con tubo 20 o 22 mm.",
      specs: ["Nylon"],
      variants: [
        { code: "AT06-007", label: "20 mm - Bianco" },
        { code: "AT06-008", label: "20 mm - Nero" },
        { code: "AT06-018", label: "22 mm - Bianco" }
      ]
    })
  ];

  const rollbarTtopProducts = [
    catalogItem({
      id: "rollbar-contropiastra",
      categoryId: "accessori-rollbar-ttop",
      name: "Contropiastra inferiore per Roll Bar",
      subtitle: "Counterplate for roll bar",
      image: itemImage("rollbar-contropiastra"),
      page: 124,
      summary: "Contropiastra inox 304 dedicata ai roll bar compatibili.",
      specs: ["AR01-002", "Acciaio inox"],
      variants: [{ code: "AR01-002", label: "Acciaio inox" }],
      consultOnly: true,
      consultDetails: ["Accessorio consultabile: viene proposto dentro il configuratore dei roll bar compatibili."]
    }),
    catalogItem({
      id: "rollbar-fanale-fonda-plastica",
      categoryId: "accessori-rollbar-ttop",
      name: "Fanale di fonda 360 gradi plastica",
      subtitle: "360 plastic mooring light",
      image: itemImage("rollbar-fanale-fonda-plastica"),
      page: 125,
      summary: "Fanale di fonda 360 gradi a LED in plastica bianca.",
      specs: ["AR02-002", "12 Volt"],
      variants: [{ code: "AR02-002", label: "Plastica bianca" }],
      consultOnly: true,
      consultDetails: ["Accessorio consultabile: viene proposto dentro il configuratore dei roll bar o T-Top compatibili."]
    }),
    catalogItem({
      id: "rollbar-fanale-fonda-inox",
      categoryId: "accessori-rollbar-ttop",
      name: "Fanale di fonda 360 gradi inox",
      subtitle: "360 stainless steel mooring light",
      image: itemImage("rollbar-fanale-fonda-inox"),
      page: 125,
      summary: "Fanale di fonda 360 gradi a LED in acciaio inox AISI 316.",
      specs: ["AR02-001", "12 Volt"],
      variants: [{ code: "AR02-001", label: "Acciaio inox" }],
      consultOnly: true,
      consultDetails: ["Accessorio consultabile: viene proposto dentro il configuratore dei roll bar o T-Top compatibili."]
    }),
    catalogItem({
      id: "rollbar-luci-via-nemo",
      categoryId: "accessori-rollbar-ttop",
      name: "Luci di via Nemo",
      subtitle: "Nemo navigation lights",
      image: itemImage("rollbar-luci-via-nemo"),
      page: 125,
      summary: "Coppia luci di via Nemo sinistra 112,5 gradi e destra 112,5 gradi.",
      specs: ["AR02-008"],
      variants: [{ code: "AR02-008", label: "Sinistra e destra" }],
      consultOnly: true,
      consultDetails: ["Accessorio consultabile: viene proposto dentro il configuratore dei roll bar o T-Top compatibili."]
    }),
    catalogItem({
      id: "rollbar-plafoniera-compatta",
      categoryId: "accessori-rollbar-ttop",
      name: "Plafoniera compatta",
      subtitle: "Compact overhead light",
      image: itemImage("rollbar-plafoniera-compatta"),
      page: 125,
      summary: "Luce compatta a 8 LED in acciaio inox lucidato e vetro.",
      specs: ["AR02-003", "12/24 Volt"],
      variants: [{ code: "AR02-003", label: "Plafoniera compatta" }],
      consultOnly: true,
      consultDetails: ["Accessorio consultabile: viene proposto dentro il configuratore dei roll bar o T-Top compatibili."]
    })
  ];

  const customizationProducts = [
    catalogItem({
      id: "custom-teli-prolunga",
      categoryId: "personalizzazioni",
      name: "Teli di prolunga",
      subtitle: "Extension canvases",
      image: itemImage("custom-teli-prolunga"),
      pages: [128, 129, 130, 131],
      summary: "Teli anteriori, laterali e posteriori selezionabili solo dentro i modelli compatibili.",
      specs: ["Stesso tessuto/colore del tendalino oppure rete microforata"],
      variants: [{ code: "PE01", label: "Codici variabili secondo modello" }],
      consultOnly: true,
      consultDetails: ["Ordinabili dal configuratore dei bimini e roll bar compatibili.", "Le cerniere sono gestite automaticamente quando il modello lo prevede."]
    }),
    catalogItem({
      id: "custom-cerniere-bordo",
      categoryId: "personalizzazioni",
      name: "Cerniere su bordo",
      subtitle: "Zippers on edge",
      image: itemImage("custom-cerniere-bordo"),
      page: 132,
      summary: "Predisposizione con cerniera divisibile YKK lungo uno dei lati del telo.",
      specs: ["PE03-001"],
      variants: [{ code: "PE03-001", label: "Prua, poppa, lato destro o lato sinistro" }],
      consultOnly: true,
      consultDetails: ["Ordinabile dal configuratore dei prodotti compatibili.", "Se vengono selezionati teli di prolunga, la cerniera di unione non viene duplicata."]
    }),
    catalogItem({
      id: "custom-cerniere-sotto-archi",
      categoryId: "personalizzazioni",
      name: "Cerniere sotto archi",
      subtitle: "Zippers under the arches",
      image: itemImage("custom-cerniere-sotto-archi"),
      page: 133,
      summary: "Applicazione cerniera utile a rimuovere il telo dalla struttura senza smontarla.",
      specs: ["PE03-002"],
      variants: [{ code: "PE03-002", label: "Applicazione cerniera sotto archi" }],
      consultOnly: true,
      consultDetails: ["Ordinabile solo sui modelli compatibili.", "Su alcuni modelli puo essere dotazione di serie."]
    }),
    catalogItem({
      id: "custom-led-waterproof",
      categoryId: "personalizzazioni",
      name: "LED waterproof",
      subtitle: "Waterproof LED application",
      image: itemImage("custom-led-waterproof"),
      page: 134,
      summary: "Strip LED waterproof integrata al centro del tendalino.",
      specs: ["PE02-001", "100 cm o 150 cm"],
      variants: [
        { code: "PE02-001", label: "Applicazione LED waterproof" },
        { code: "PE02-005", label: "Strip LED 100 cm" },
        { code: "PE02-006", label: "Strip LED 150 cm" }
      ],
      consultOnly: true,
      consultDetails: ["Ordinabile dal configuratore dei prodotti compatibili.", "La strip LED e una sola e viene installata al centro del tendalino."]
    }),
    catalogItem({
      id: "custom-luce-360",
      categoryId: "personalizzazioni",
      name: "Applicazione luce 360 gradi",
      subtitle: "360 light application",
      image: itemImage("custom-luce-360"),
      page: 135,
      summary: "Predisposizione per fanale di fonda a 360 gradi sul tendalino tramite T-90 inox.",
      specs: ["PE04-001", "AR02-001"],
      variants: [
        { code: "PE04-001", label: "Applicazione luce 360 gradi" },
        { code: "AR02-001", label: "Fanale di fonda 360 gradi inox" }
      ],
      consultOnly: true,
      consultDetails: ["Ordinabile dal configuratore dei prodotti compatibili."]
    }),
    catalogItem({
      id: "custom-pannello-solare",
      categoryId: "personalizzazioni",
      name: "Applicazione pannello solare",
      subtitle: "Solar panel application",
      image: itemImage("custom-pannello-solare-cerniera"),
      page: 136,
      summary: "Applicazione pannello solare su telo con cerniera o bottoni Tenax.",
      specs: ["PE08-001", "PE08-002"],
      variants: [
        { code: "PE08-001", label: "Con cerniera" },
        { code: "PE08-002", label: "Con bottoni Tenax" }
      ],
      consultOnly: true,
      consultDetails: ["Ordinabile dal configuratore dei prodotti compatibili.", "La scelta tra cerniera e bottoni Tenax avviene sul prodotto compatibile."]
    }),
    catalogItem({
      id: "custom-taglio-rollbar",
      categoryId: "personalizzazioni",
      name: "Taglio roll bar",
      subtitle: "Cut of the roll bar",
      image: itemImage("custom-taglio-rollbar"),
      page: 137,
      summary: "Taglio su misura della barra centrale del roll bar.",
      specs: ["PE07-001"],
      variants: [{ code: "PE07-001", label: "Taglio barra centrale roll bar" }],
      consultOnly: true,
      consultDetails: ["Lavorazione dedicata ai roll bar compatibili.", "Da non confondere con la stampa personalizzata."]
    }),
    catalogItem({
      id: "custom-stampa-personalizzata",
      categoryId: "personalizzazioni",
      name: "Stampa personalizzata",
      subtitle: "Customized printing",
      image: itemImage("custom-stampa-personalizzata"),
      page: 137,
      summary: "Stampa personalizzata su tessuto acrilico, PVC o poliestere.",
      specs: ["PE06-001"],
      variants: [{ code: "PE06-001", label: "Stampa personalizzata" }],
      consultOnly: true,
      consultDetails: ["Richiede file vettoriale in fase esecutiva.", "La lavorazione viene proposta dentro i prodotti compatibili."]
    })
  ];

  const curatedCategoryIds = new Set([
    "accessori-inox",
    "accessori-nylon",
    "accessori-rollbar-ttop",
    "personalizzazioni"
  ]);
  const curatedProducts = [
    ...products.filter(product => !curatedCategoryIds.has(product.categoryId)),
    ...inoxProducts,
    ...nylonProducts,
    ...rollbarTtopProducts,
    ...customizationProducts
  ];

  const extractedPayload = window.CATALOG_EXTRACTED || { products: [], totalCodes: 0, generatedProducts: 0 };
  const extractedProducts = extractedPayload.products || [];
  const hiddenExtractedIds = new Set(["estratto-pe02"]);
  const usedProductIds = new Set(curatedProducts.map(product => product.id));
  const allProducts = [
    ...curatedProducts,
    ...extractedProducts.filter(product => {
      if (hiddenExtractedIds.has(product.id)) return false;
      if (curatedCategoryIds.has(product.categoryId)) return false;
      if (usedProductIds.has(product.id)) return false;
      usedProductIds.add(product.id);
      return true;
    })
  ];
  const visibleExtractedProducts = allProducts.filter(product => product.extracted).length;

  return {
    ownerEmail: "inserisci-la-tua-mail@esempio.it",
    categories,
    products: allProducts,
    canvasColors,
    sunbrellaColors,
    polyesterColors,
    canvasColorGroups,
    meshColors,
    extensionGroups,
    customizationInfo,
    extraction: {
      totalCodes: extractedPayload.totalCodes || 0,
      generatedProducts: visibleExtractedProducts
    }
  };
})();
