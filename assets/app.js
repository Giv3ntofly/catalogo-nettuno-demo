const DATA = window.CATALOG_DATA;

const storageKeys = {
  customer: "nettunoCatalogCustomer",
  cart: "nettunoCatalogCart"
};

const state = {
  customer: null,
  categoryId: "bimini",
  search: "",
  cart: [],
  requestType: "preventivo",
  generalNotes: "",
  activeProduct: null,
  lateralZipperPromptAnswered: false,
  applyBothLateralZippers: false
};

const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  bindEvents();
  updateAccess();
  registerServiceWorker();
});

function bindEvents() {
  $("authForm").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.customer = {
      company: String(form.get("company") || "").trim(),
      email: String(form.get("email") || "").trim(),
      contact: String(form.get("contact") || "").trim()
    };
    localStorage.setItem(storageKeys.customer, JSON.stringify(state.customer));
    updateAccess();
  });

  $("logoutButton").addEventListener("click", () => {
    localStorage.removeItem(storageKeys.customer);
    state.customer = null;
    updateAccess();
  });

  $("searchInput").addEventListener("input", event => {
    state.search = event.target.value.trim().toLowerCase();
    renderProducts();
  });

  $("saveCartButton").addEventListener("click", () => {
    saveCart();
    updateSaveStatus();
    showToast("Carrello salvato nel browser.");
  });

  $("clearCartButton").addEventListener("click", () => {
    if (!state.cart.length) return;
    if (confirm("Vuoi svuotare il carrello?")) {
      state.cart = [];
      saveCart();
      renderCart();
    }
  });

  $("requestType").addEventListener("change", event => {
    state.requestType = event.target.value;
    saveCart();
  });

  $("generalNotes").addEventListener("input", event => {
    state.generalNotes = event.target.value;
    saveCart();
  });

  $("printOrderButton").addEventListener("click", () => {
    if (!state.cart.length) {
      alert("Il carrello è vuoto.");
      return;
    }
    downloadOrderPdf();
  });

  $("openPdfButton").addEventListener("click", openPdfDialog);
  $("downloadCatalogPdfButton").addEventListener("click", downloadCatalogPdf);
  $("mailOrderButton").addEventListener("click", prepareEmail);
  $("addToCartButton").addEventListener("click", addActiveProductToCart);
  $("openCartButton").addEventListener("click", openCartPanel);
  $("closeCartButton").addEventListener("click", closeCartPanel);
  $("cartBackdrop").addEventListener("click", closeCartPanel);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeCartPanel();
    }
  });
}

function loadState() {
  try {
    state.customer = JSON.parse(localStorage.getItem(storageKeys.customer) || "null");
  } catch {
    state.customer = null;
  }

  try {
    const savedCart = JSON.parse(localStorage.getItem(storageKeys.cart) || "null");
    if (savedCart && Array.isArray(savedCart.items)) {
      state.cart = savedCart.items;
      state.requestType = savedCart.requestType || "preventivo";
      state.generalNotes = savedCart.generalNotes || "";
    }
  } catch {
    state.cart = [];
  }
}

function saveCart() {
  localStorage.setItem(storageKeys.cart, JSON.stringify({
    items: state.cart,
    requestType: state.requestType,
    generalNotes: state.generalNotes,
    savedAt: new Date().toISOString()
  }));
}

function downloadCartBackup() {
  const payload = {
    customer: state.customer,
    requestType: state.requestType,
    generalNotes: state.generalNotes,
    items: state.cart,
    savedAt: new Date().toISOString()
  };
  downloadBlob(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    `carrello-nettuno-${dateStamp()}.json`
  );
}

function updateAccess() {
  const isLogged = Boolean(state.customer && state.customer.company && state.customer.email);
  $("authScreen").hidden = isLogged;
  $("appShell").hidden = !isLogged;

  if (isLogged) {
    $("customerCompany").textContent = state.customer.company;
    $("customerEmail").textContent = state.customer.email;
    $("requestType").value = state.requestType;
    $("generalNotes").value = state.generalNotes;
    updateSaveStatus(false);
    renderCategories();
    renderProducts();
    renderCart();
  }
}

function renderCategories() {
  const list = $("categoryList");
  list.replaceChildren();

  const heading = document.createElement("div");
  heading.className = "category-heading";
  heading.textContent = "Sezioni catalogo";
  list.appendChild(heading);

  DATA.categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-button${category.id === state.categoryId ? " active" : ""}${category.parent ? " child" : ""}`;
    const label = document.createElement("span");
    label.textContent = category.name;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = getProductCount(category.id);
    button.append(label, badge);
    button.addEventListener("click", () => {
      state.categoryId = category.id;
      renderCategories();
      renderProducts();
    });
    list.appendChild(button);
  });
}

function getProductCount(categoryId) {
  return DATA.products.filter(product => product.categoryId === categoryId).length;
}

function renderProducts() {
  const category = DATA.categories.find(item => item.id === state.categoryId);
  const isSearching = Boolean(state.search);
  $("categoryTitle").textContent = isSearching ? "Risultati ricerca" : (category ? category.name : "Catalogo");
  $("categoryIntro").textContent = isSearching
    ? "Ricerca estesa a tutte le sezioni del catalogo."
    : (category ? category.intro : "");

  const products = DATA.products
    .filter(product => isSearching || product.categoryId === state.categoryId)
    .filter(matchesSearch);

  const extractedInfo = DATA.extraction?.totalCodes
    ? ` Base master: ${DATA.extraction.totalCodes} codici PDF, ${DATA.extraction.generatedProducts} famiglie demo aggiunte.`
    : "";
  $("statusRow").textContent = isSearching
    ? `${products.length} schede trovate in tutto il catalogo.${extractedInfo}`
    : `${products.length} schede in questa vista.${extractedInfo}`;

  const grid = $("productGrid");
  grid.innerHTML = "";

  if (!products.length) {
    grid.innerHTML = `<p class="empty-cart">Nessuna scheda trovata in questa categoria con la ricerca corrente.</p>`;
    return;
  }

  products.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${escapeHtml(product.image || "assets/previews/majestic-008.png")}" alt="${escapeHtml(product.name)}">
      <div class="product-body">
        <div class="product-kicker">${escapeHtml(product.subtitle || getCategoryName(product.categoryId))}</div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.summary || "")}</p>
        <div class="meta-line">
          ${isSearching ? `<span class="chip">${escapeHtml(getCategoryName(product.categoryId))}</span>` : ""}
          ${product.pages ? `<span class="chip">PDF p. ${product.pages.join("-")}</span>` : ""}
          ${product.variants ? `<span class="chip">${product.variants.length} codici</span>` : ""}
          ${product.requiresCanvasColor ? `<span class="chip">colore obbligatorio</span>` : ""}
          ${product.consultOnly ? `<span class="chip">consultabile</span>` : ""}
        </div>
        <button type="button" class="${product.consultOnly ? "secondary-action" : "primary-action"}" data-product="${escapeHtml(product.id)}">
          ${product.consultOnly ? "Vedi dettagli" : "Configura"}
        </button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => openProduct(product.id));
    grid.appendChild(card);
  });
}

function matchesSearch(product) {
  if (!state.search) return true;
  const haystack = [
    getCategoryName(product.categoryId),
    product.name,
    product.subtitle,
    product.summary,
    product.pages ? product.pages.join(" ") : "",
    ...(product.variants || []).flatMap(variant => [variant.code, variant.label])
  ].join(" ").toLowerCase();
  return haystack.includes(state.search) || normalizeSearchText(haystack).includes(normalizeSearchText(state.search));
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s\-_/]+/g, "");
}

function openProduct(productId) {
  const product = DATA.products.find(item => item.id === productId);
  if (!product) return;

  state.activeProduct = product;
  state.lateralZipperPromptAnswered = false;
  state.applyBothLateralZippers = false;
  $("dialogImage").src = product.image || "assets/previews/majestic-008.png";
  $("dialogImage").alt = product.name;
  $("dialogCategory").textContent = `${getCategoryName(product.categoryId)}${product.pages ? ` · PDF p. ${product.pages.join("-")}` : ""}`;
  $("dialogTitle").textContent = `${product.name}${product.subtitle ? ` · ${product.subtitle}` : ""}`;
  $("dialogSummary").textContent = product.summary || "";
  $("dialogSpecs").innerHTML = [
    ...(product.specs || [])
  ].map(item => `<span class="chip">${escapeHtml(item)}</span>`).join("");
  $("addToCartButton").hidden = Boolean(product.consultOnly);

  $("dialogForm").innerHTML = product.consultOnly
    ? renderConsultOnly(product)
    : renderConfigurationForm(product);

  attachDialogEvents(product);
  $("productDialog").showModal();
}

function renderConsultOnlyLegacy(product) {
  return `
    <div class="config-section">
      <h3>Categoria consultabile</h3>
      <p class="notice">Questa lavorazione è visibile per informare il cliente, ma viene aggiunta solo dai prodotti compatibili. In questo modo il carrello impedisce combinazioni non previste.</p>
    </div>
  `;
}

function renderConsultOnly(product) {
  const details = product.consultDetails || [
    "Apri una scheda prodotto compatibile per selezionare questa lavorazione.",
    "Il configuratore la mostra solo dove prevista e impedisce combinazioni non compatibili."
  ];
  const variants = product.variants || [];

  return `
    <div class="config-section">
      <h3>Scheda informativa</h3>
      <p class="notice">Questa voce è consultabile qui per far vedere la lavorazione, ma si aggiunge al carrello solo entrando in un prodotto compatibile.</p>
      <div class="detail-list">
        ${details.map(item => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      ${variants.length ? `
        <div class="code-list">
          <span>Codici di riferimento</span>
          <ul>
            ${variants.map(variant => `<li><strong>${escapeHtml(variant.code)}</strong>${variant.label ? ` - ${escapeHtml(variant.label)}` : ""}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
    </div>
  `;
}

function renderConfigurationForm(product) {
  return `
    <div class="error-box" id="dialogError"></div>
    <div class="config-section">
      <h3>Articolo</h3>
      <div class="field-grid">
        ${renderVariantField(product)}
        <label>
          Quantità
          <input id="itemQuantity" type="number" min="1" step="1" value="1">
        </label>
        <label>
          Riferimento ordine
          <input id="orderReference" placeholder="Posto barca, nome barca, armatore o codice interno">
        </label>
        ${product.requiresCanvasColor ? renderCanvasColorField(product) : ""}
      </div>
    </div>
    ${renderProductDetailsSection(product)}
    ${renderExtensionSection(product)}
    ${renderCustomizationsSection(product)}
    <div class="config-section">
      <h3>Note e allegati</h3>
      <label>
        Note custom
        <textarea id="itemNotes" rows="4" placeholder="Misure speciali, modifiche richieste, indicazioni installazione"></textarea>
      </label>
      <label>
        Allegati PDF
        <input id="itemFiles" type="file" accept="application/pdf,.pdf" multiple>
        <span class="help-text">Nel prototipo vengono salvati i nomi dei file. Nel sito definitivo i PDF verranno caricati e allegati alla richiesta.</span>
      </label>
    </div>
  `;
}

function renderVariantField(product) {
  if (!product.variants || !product.variants.length) {
    return "";
  }
  if (product.variants.length === 1) {
    const variant = product.variants[0];
    return `
      <div class="fixed-code">
        <span>Codice articolo</span>
        <strong>${escapeHtml(variant.code)}</strong>
        ${variant.label && variant.label !== "Codice unico" ? `<small>${escapeHtml(variant.label)}</small>` : ""}
        <input id="variantSelect" type="hidden" value="0">
      </div>
    `;
  }
  const label = ["accessori-inox", "accessori-nylon", "accessori-rollbar-ttop", "personalizzazioni"].includes(product.categoryId)
    ? "Codice / misura"
    : "Codice / larghezza / altezza";
  return `
    <label>
      ${label}
      <select id="variantSelect">
        <option value="">Seleziona codice</option>
        ${renderVariantOptions(product.variants)}
      </select>
    </label>
  `;
}

function renderVariantOptions(variants) {
  const groups = [];
  variants.forEach((variant, index) => {
    const groupLabel = variant.group || "";
    let group = groups.find(item => item.label === groupLabel);
    if (!group) {
      group = { label: groupLabel, options: [] };
      groups.push(group);
    }
    group.options.push({ variant, index });
  });

  return groups.map(group => {
    const options = group.options
      .map(({ variant, index }) => `<option value="${index}">${escapeHtml(variant.label)}</option>`)
      .join("");

    if (!group.label) return options;
    return `<optgroup label="${escapeHtml(group.label)}">${options}</optgroup>`;
  }).join("");
}

function renderProductDetailsSection(product) {
  const standardNotes = product.standardNotes || [];
  if (!standardNotes.length) return "";

  return `
    <div class="config-section">
      <h3>Dotazioni di serie</h3>
      <div class="detail-list">
        ${standardNotes.map(note => `<span>${escapeHtml(note)}</span>`).join("")}
      </div>
    </div>
  `;
}

function getCanvasColorGroup(product) {
  const groupKey = product.canvasColorGroup || "sunbrella";
  return DATA.canvasColorGroups?.[groupKey] || {
    label: "Sunbrella Plus",
    material: "acrilico resinato",
    colors: DATA.canvasColors || []
  };
}

function getCanvasColorsForProduct(product) {
  if (Array.isArray(product.canvasColors)) return product.canvasColors;
  return getCanvasColorGroup(product).colors || DATA.canvasColors || [];
}

function getCanvasFabricForProduct(product) {
  const group = getCanvasColorGroup(product);
  return {
    id: product.canvasColorGroup || "sunbrella",
    label: group.label,
    material: group.material
  };
}

function formatCanvasFabric(fabric) {
  if (!fabric) return "";
  return [fabric.label, fabric.material].filter(Boolean).join(" - ");
}

function renderCanvasColorField(product) {
  const group = getCanvasColorGroup(product);
  const colors = getCanvasColorsForProduct(product);
  return `
    <label>
      Colore telo
      <select id="canvasColorSelect">
        <option value="">Seleziona colore</option>
        ${colors.map(color => `<option value="${escapeHtml(color.code)}">${escapeHtml(color.label)}</option>`).join("")}
      </select>
      <span class="help-text">Tessuto: ${escapeHtml(formatCanvasFabric(group))}</span>
    </label>
  `;
}

function renderExtensionSection(product) {
  if (!product.extensionGroup) {
    if (product.categoryId !== "bimini") return "";
    return `
      <div class="config-section">
        <h3>Teli di prolunga</h3>
        <p class="help-text">Non collegati a questo modello nel catalogo 2026. Per richieste particolari usa il campo note custom.</p>
      </div>
    `;
  }
  const group = DATA.extensionGroups[product.extensionGroup];
  if (!group) return "";

  return `
    <div class="config-section" id="extensionSection">
      <h3>Teli di prolunga</h3>
      <p class="help-text">${escapeHtml(group.name)}. Le cerniere sono comprese quando si ordinano i teli di prolunga.</p>
      <div class="check-list">
        ${group.positions.map(position => renderExtensionPosition(position)).join("")}
      </div>
      <div class="field-grid">
        <label>
          Materiale prolunga
          <select id="extensionMaterial">
            <option value="same">Stesso tessuto e colore del telo</option>
            <option value="mesh">Rete microforata ombreggiante</option>
          </select>
        </label>
        <label id="meshColorField" hidden>
          Colore rete microforata
          <select id="meshColorSelect">
            <option value="">Seleziona colore rete</option>
            ${DATA.meshColors.map(color => `<option value="${escapeHtml(color.code)}">${escapeHtml(color.label)}</option>`).join("")}
          </select>
        </label>
      </div>
    </div>
  `;
}

function renderExtensionPosition(position) {
  if (position.canOrderBothSides) {
    return `
      <label class="check-row">
        <input type="checkbox" name="extensionPosition" value="${escapeHtml(position.id)}:dx" data-code="${escapeHtml(position.code)}" data-label="${escapeHtml(position.label)} destra" data-mark="${escapeHtml(position.mark)}">
        <span>${escapeHtml(position.label)} destra <small>${escapeHtml(position.code)} · posizione ${escapeHtml(position.mark)}</small></span>
      </label>
      <label class="check-row">
        <input type="checkbox" name="extensionPosition" value="${escapeHtml(position.id)}:sx" data-code="${escapeHtml(position.code)}" data-label="${escapeHtml(position.label)} sinistra" data-mark="${escapeHtml(position.mark)}">
        <span>${escapeHtml(position.label)} sinistra <small>${escapeHtml(position.code)} · posizione ${escapeHtml(position.mark)}</small></span>
      </label>
    `;
  }
  return `
    <label class="check-row">
      <input type="checkbox" name="extensionPosition" value="${escapeHtml(position.id)}" data-code="${escapeHtml(position.code)}" data-label="${escapeHtml(position.label)}" data-mark="${escapeHtml(position.mark)}">
      <span>${escapeHtml(position.label)} <small>${escapeHtml(position.code)} · posizione ${escapeHtml(position.mark)}</small></span>
    </label>
  `;
}

function openPdfDialog() {
  const dialog = $("pdfDialog");
  if (dialog && typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }
  window.open("Catalogo_Nettuno_2026_WEB.pdf", "_blank", "noopener");
}

function downloadCatalogPdf() {
  const link = document.createElement("a");
  link.href = "Catalogo_Nettuno_2026_WEB.pdf";
  link.download = "Catalogo_Nettuno_2026_WEB.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast("Download catalogo PDF avviato.");
}

function renderCustomizationsSection(product) {
  const customizations = product.customizations || [];
  if (!customizations.length) return "";

  const pieces = [];

  if (customizations.includes("edgeZipper")) {
    pieces.push(`
      <div class="config-section" id="edgeZipperBlock">
        <h3>Cerniera su bordo</h3>
        <p class="help-text">${escapeHtml(DATA.customizationInfo.edgeZipper.description)}</p>
        <div class="check-list">
          ${["Destra", "Sinistra", "Poppa", "Prua"].map(side => `
            <label class="check-row">
              <input type="checkbox" name="edgeZipperSide" value="${side}">
              <span>${side} <small>${DATA.customizationInfo.edgeZipper.code}</small></span>
            </label>
          `).join("")}
        </div>
        <p class="notice" id="edgeZipperNotice" hidden>Hai selezionato teli di prolunga: la cerniera di unione è già compresa per quei teli.</p>
      </div>
    `);
  }

  if (customizations.includes("underArchZipper")) {
    pieces.push(renderSimpleCustomization("underArchZipper"));
  }

  if (customizations.includes("ledWaterproof")) {
    pieces.push(`
      <div class="config-section">
        <h3>LED waterproof</h3>
        <label class="check-row">
          <input type="checkbox" id="ledWaterproof">
          <span>Applicazione LED waterproof <small>${DATA.customizationInfo.ledWaterproof.code}</small></span>
        </label>
        <label id="ledLengthField" hidden>
          Lunghezza LED
          <select id="ledLengthSelect">
            <option value="">Seleziona lunghezza</option>
            ${DATA.customizationInfo.ledWaterproof.lengths.map(item => `<option value="${escapeHtml(item.code)}">${escapeHtml(item.code)} - ${escapeHtml(item.label)}</option>`).join("")}
          </select>
        </label>
      </div>
    `);
  }

  if (customizations.includes("light360")) {
    pieces.push(renderSimpleCustomization("light360"));
  }

  if (customizations.includes("solarPanel")) {
    pieces.push(`
      <div class="config-section">
        <h3>Pannello solare</h3>
        <label class="check-row">
          <input type="checkbox" id="solarPanel">
          <span>Applicazione pannello solare</span>
        </label>
        <label id="solarMethodField" hidden>
          Tipo applicazione
          <select id="solarMethodSelect">
            <option value="">Seleziona tipo</option>
            ${DATA.customizationInfo.solarPanel.methods.map(item => `<option value="${escapeHtml(item.code)}">${escapeHtml(item.code)} - ${escapeHtml(item.label)}</option>`).join("")}
          </select>
        </label>
      </div>
    `);
  }

  if (customizations.includes("customPrint")) {
    pieces.push(renderSimpleCustomization("customPrint"));
  }

  return pieces.join("");
}

function renderSimpleCustomization(id) {
  const item = DATA.customizationInfo[id];
  const extra = item.extraCode ? ` + ${item.extraCode}` : "";
  return `
    <div class="config-section">
      <h3>${escapeHtml(item.name)}</h3>
      <label class="check-row">
        <input type="checkbox" id="${escapeHtml(id)}">
        <span>${escapeHtml(item.name)} <small>${escapeHtml(item.code || "")}${escapeHtml(extra)}</small></span>
      </label>
      <p class="help-text">${escapeHtml(item.description)}</p>
    </div>
  `;
}

function attachDialogEvents(product) {
  if (product.consultOnly) {
    $("addToCartButton").hidden = true;
    return;
  }

  $("addToCartButton").hidden = false;

  const extensionMaterial = $("extensionMaterial");
  if (extensionMaterial) {
    extensionMaterial.addEventListener("change", updateMeshField);
    document.querySelectorAll("input[name='extensionPosition']").forEach(input => {
      input.addEventListener("change", event => updateEdgeZipperState(event));
    });
  }

  const led = $("ledWaterproof");
  if (led) {
    led.addEventListener("change", () => {
      $("ledLengthField").hidden = !led.checked;
    });
  }

  const solar = $("solarPanel");
  if (solar) {
    solar.addEventListener("change", () => {
      $("solarMethodField").hidden = !solar.checked;
    });
  }

  updateMeshField();
  updateEdgeZipperState();
}

function updateMeshField() {
  const field = $("meshColorField");
  const material = $("extensionMaterial");
  if (!field || !material) return;
  field.hidden = material.value !== "mesh";
}

function updateEdgeZipperState(event) {
  const selectedExtensions = Array.from(document.querySelectorAll("input[name='extensionPosition']:checked"));
  const notice = $("edgeZipperNotice");
  const edgeInputs = Array.from(document.querySelectorAll("input[name='edgeZipperSide']"));
  if (!edgeInputs.length) return;

  const changedInput = event?.target;
  if (
    changedInput?.checked &&
    isLateralExtensionInput(changedInput) &&
    !state.lateralZipperPromptAnswered
  ) {
    state.lateralZipperPromptAnswered = true;
    state.applyBothLateralZippers = confirm("Vuoi applicare le cerniere su bordo su entrambi i lati?");
  }

  const automaticSides = new Set();
  let lateralSelected = false;

  selectedExtensions.forEach(input => {
    const side = getZipperSideForExtension(input);
    if (!side) return;
    automaticSides.add(side);
    if (side === "Destra" || side === "Sinistra") {
      lateralSelected = true;
    }
  });

  if (lateralSelected && state.applyBothLateralZippers) {
    automaticSides.add("Destra");
    automaticSides.add("Sinistra");
  }

  edgeInputs.forEach(input => {
    if (input.dataset.autoExtension === "true") {
      input.checked = false;
      input.disabled = false;
      delete input.dataset.autoExtension;
    }
  });

  edgeInputs.forEach(input => {
    if (!automaticSides.has(input.value)) return;
    input.checked = true;
    input.disabled = true;
    input.dataset.autoExtension = "true";
  });

  if (notice) {
    notice.hidden = automaticSides.size === 0;
    notice.textContent = "Le cerniere su bordo collegate ai teli di prolunga selezionati sono state selezionate automaticamente.";
  }
}

function isLateralExtensionInput(input) {
  const side = getZipperSideForExtension(input);
  return side === "Destra" || side === "Sinistra";
}

function getZipperSideForExtension(input) {
  const value = String(input.value || "").toLowerCase();
  const label = String(input.dataset.label || "").toLowerCase();

  if (value.includes(":dx") || value.includes("right-lateral") || label.includes("destra") || label.includes("destro")) {
    return "Destra";
  }
  if (value.includes(":sx") || value.includes("left-lateral") || label.includes("sinistra") || label.includes("sinistro")) {
    return "Sinistra";
  }
  if (value === "front" || value.includes("front") || label.includes("anteriore")) {
    return "Prua";
  }
  if (value === "rear" || value.includes("rear") || label.includes("posteriore")) {
    return "Poppa";
  }

  return "";
}

function addActiveProductToCart() {
  const product = state.activeProduct;
  if (!product || product.consultOnly) return;

  const result = collectProductConfiguration(product);
  const errorBox = $("dialogError");

  if (result.errors.length) {
    errorBox.innerHTML = result.errors.map(error => `<div>${escapeHtml(error)}</div>`).join("");
    errorBox.classList.add("show");
    return;
  }

  errorBox.classList.remove("show");
  state.cart.push(result.item);
  saveCart();
  renderCart();
  $("productDialog").close();
  showStatus(`${product.name} aggiunto al carrello.`);

  if (window.matchMedia("(max-width: 760px)").matches) {
    openCartPanel();
  }
}

function collectProductConfiguration(product) {
  const errors = [];
  const variant = collectVariant(product, errors);
  const quantity = Math.max(1, Number($("itemQuantity")?.value || 1));
  const reference = String($("orderReference")?.value || "").trim();
  const notes = String($("itemNotes")?.value || "").trim();
  const canvasColor = collectCanvasColor(product, errors);
  const canvasFabric = canvasColor ? getCanvasFabricForProduct(product) : null;
  const customizations = collectCustomizations(product, errors);
  const files = collectFileNames();

  const item = {
    id: makeId(),
    productId: product.id,
    category: getCategoryName(product.categoryId),
    productName: product.name,
    subtitle: product.subtitle || "",
    pages: product.pages || [],
    quantity,
    reference,
    variant,
    canvasFabric,
    canvasColor,
    customizations,
    notes,
    files,
    createdAt: new Date().toISOString()
  };

  return { item, errors };
}

function collectVariant(product, errors) {
  if (!product.variants || !product.variants.length) return null;
  const select = $("variantSelect");
  if (!select || select.value === "") {
    errors.push("Seleziona codice e misura dell'articolo.");
    return null;
  }
  return product.variants[Number(select.value)];
}

function collectCanvasColor(product, errors) {
  if (!product.requiresCanvasColor) return null;
  const select = $("canvasColorSelect");
  if (!select || !select.value) {
    errors.push("Seleziona il colore telo: è obbligatorio per ordinare o richiedere preventivo.");
    return null;
  }
  return getCanvasColorsForProduct(product).find(color => color.code === select.value) || null;
}

function collectCustomizations(product, errors) {
  const selected = [];

  if (product.extensionGroup) {
    selected.push(...collectExtensionCanvases(errors));
  }

  const edgeInputs = Array.from(document.querySelectorAll("input[name='edgeZipperSide']:checked"));
  edgeInputs.forEach(input => {
    selected.push({
      type: "custom",
      name: `${DATA.customizationInfo.edgeZipper.name} - ${input.value}`,
      code: DATA.customizationInfo.edgeZipper.code,
      details: input.dataset.autoExtension === "true"
        ? "Cerniera collegata automaticamente al telo di prolunga selezionato"
        : "Predisposizione cerniera su bordo"
    });
  });

  if ($("underArchZipper")?.checked) {
    const item = DATA.customizationInfo.underArchZipper;
    selected.push({ type: "custom", name: item.name, code: item.code, details: item.description });
  }

  if ($("ledWaterproof")?.checked) {
    const lengthCode = $("ledLengthSelect")?.value || "";
    if (!lengthCode) {
      errors.push("Se selezioni LED waterproof devi indicare la lunghezza.");
    } else {
      const length = DATA.customizationInfo.ledWaterproof.lengths.find(item => item.code === lengthCode);
      selected.push({
        type: "custom",
        name: DATA.customizationInfo.ledWaterproof.name,
        code: `${DATA.customizationInfo.ledWaterproof.code} + ${length.code}`,
        details: `Lunghezza ${length.label}`
      });
    }
  }

  if ($("light360")?.checked) {
    const item = DATA.customizationInfo.light360;
    selected.push({ type: "custom", name: item.name, code: `${item.code} + ${item.extraCode}`, details: item.description });
  }

  if ($("solarPanel")?.checked) {
    const methodCode = $("solarMethodSelect")?.value || "";
    if (!methodCode) {
      errors.push("Se selezioni pannello solare devi indicare il tipo applicazione.");
    } else {
      const method = DATA.customizationInfo.solarPanel.methods.find(item => item.code === methodCode);
      selected.push({
        type: "custom",
        name: DATA.customizationInfo.solarPanel.name,
        code: method.code,
        details: method.label
      });
    }
  }

  if ($("customPrint")?.checked) {
    const item = DATA.customizationInfo.customPrint;
    selected.push({ type: "custom", name: item.name, code: item.code, details: item.description });
  }

  return selected;
}

function collectExtensionCanvases(errors) {
  const selectedInputs = Array.from(document.querySelectorAll("input[name='extensionPosition']:checked"));
  if (!selectedInputs.length) return [];

  const material = $("extensionMaterial")?.value || "same";
  let meshColor = null;
  if (material === "mesh") {
    const meshCode = $("meshColorSelect")?.value || "";
    if (!meshCode) {
      errors.push("Per i teli di prolunga in rete microforata devi selezionare il colore rete.");
    } else {
      meshColor = DATA.meshColors.find(color => color.code === meshCode);
    }
  }

  return selectedInputs.map(input => ({
    type: "extension",
    name: `Telo di prolunga ${input.dataset.label}`,
    code: input.dataset.code,
    details: material === "mesh"
      ? `Rete microforata${meshColor ? ` - ${meshColor.label}` : ""}`
      : "Stesso tessuto e colore del telo scelto"
  }));
}

function collectFileNames() {
  const input = $("itemFiles");
  if (!input || !input.files) return [];
  return Array.from(input.files).map(file => `${file.name} (${formatBytes(file.size)})`);
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name='${name}']:checked`)).map(input => input.value);
}

function renderCart() {
  const itemCountLabel = `${state.cart.length} ${state.cart.length === 1 ? "articolo" : "articoli"}`;
  $("cartTitle").textContent = itemCountLabel;
  $("cartBadge").textContent = state.cart.length;
  $("openCartButton").setAttribute("aria-label", `Apri carrello, ${itemCountLabel}`);
  $("requestType").value = state.requestType;
  $("generalNotes").value = state.generalNotes;

  const list = $("cartList");
  list.innerHTML = "";

  if (!state.cart.length) {
    list.innerHTML = `<p class="empty-cart">Il carrello è vuoto. Puoi salvare e riprendere anche carrelli parziali.</p>`;
    return;
  }

  state.cart.forEach(item => {
    const element = document.createElement("article");
    element.className = "cart-item";
    element.innerHTML = `
      <header>
        <div>
          <h3>${escapeHtml(item.productName)}${item.subtitle ? ` · ${escapeHtml(item.subtitle)}` : ""}</h3>
          <small>${escapeHtml(item.variant?.code || "Codice da scheda")} · Qtà ${item.quantity}</small>
        </div>
        <button class="remove-item" type="button" data-remove="${escapeHtml(item.id)}">Rimuovi</button>
      </header>
      <ul>
        ${item.reference ? `<li>Riferimento: ${escapeHtml(item.reference)}</li>` : ""}
        ${item.canvasFabric ? `<li>Tessuto telo: ${escapeHtml(formatCanvasFabric(item.canvasFabric))}</li>` : ""}
        ${item.canvasColor ? `<li>Colore telo: ${escapeHtml(item.canvasColor.label)}</li>` : ""}
        ${item.variant?.label ? `<li>${escapeHtml(item.variant.label)}</li>` : ""}
        ${item.customizations.map(custom => `<li>${escapeHtml(custom.name)} · ${escapeHtml(custom.code)} · ${escapeHtml(custom.details)}</li>`).join("")}
        ${item.files.map(file => `<li>Allegato: ${escapeHtml(file)}</li>`).join("")}
        ${item.notes ? `<li>Note: ${escapeHtml(item.notes)}</li>` : ""}
      </ul>
    `;
    element.querySelector("[data-remove]").addEventListener("click", () => {
      state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
      saveCart();
      renderCart();
    });
    list.appendChild(element);
  });
}

function openCartPanel() {
  $("appShell").classList.add("cart-open");
  $("cartBackdrop").hidden = false;
  $("openCartButton").setAttribute("aria-expanded", "true");
  document.body.classList.add("cart-open");
}

function closeCartPanel() {
  $("appShell").classList.remove("cart-open");
  $("cartBackdrop").hidden = true;
  $("openCartButton").setAttribute("aria-expanded", "false");
  document.body.classList.remove("cart-open");
}

function buildPrintDocument() {
  const now = new Date();
  const rows = state.cart.map((item, index) => {
    const customizations = item.customizations.length
      ? item.customizations.map(custom => `${custom.name} (${custom.code}) - ${custom.details}`).join("<br>")
      : "Nessuna";
    const attachments = item.files.length ? item.files.join("<br>") : "Nessuno";

    return `
      <tr>
        <td>${index + 1}</td>
        <td>
          <strong>${escapeHtml(item.productName)}${item.subtitle ? ` - ${escapeHtml(item.subtitle)}` : ""}</strong><br>
          ${escapeHtml(item.category)}<br>
          ${item.pages.length ? `PDF p. ${escapeHtml(item.pages.join("-"))}` : ""}
        </td>
        <td>
          ${escapeHtml(item.variant?.code || "")}<br>
          ${escapeHtml(item.variant?.label || "")}<br>
          Qtà ${escapeHtml(String(item.quantity))}
        </td>
        <td>
          ${item.reference ? `Riferimento: ${escapeHtml(item.reference)}<br>` : ""}
          ${item.canvasFabric ? `Tessuto telo: ${escapeHtml(formatCanvasFabric(item.canvasFabric))}<br>` : ""}
          ${item.canvasColor ? `Colore telo: ${escapeHtml(item.canvasColor.label)}<br>` : ""}
          ${customizations}
        </td>
        <td>
          ${item.notes ? `${escapeHtml(item.notes)}<br>` : ""}
          Allegati PDF:<br>${attachments}
        </td>
      </tr>
    `;
  }).join("");

  $("printRoot").innerHTML = `
    <div class="print-document">
      <h1>Richiesta ${escapeHtml(getRequestTypeLabel())} - Catalogo Nettuno 2026</h1>
      <div class="print-meta">
        <div><strong>Cliente:</strong> ${escapeHtml(state.customer.company)}</div>
        <div><strong>Email:</strong> ${escapeHtml(state.customer.email)}</div>
        <div><strong>Referente:</strong> ${escapeHtml(state.customer.contact || "-")}</div>
        <div><strong>Data:</strong> ${escapeHtml(now.toLocaleString("it-IT"))}</div>
        <div><strong>Tipo richiesta:</strong> ${escapeHtml(getRequestTypeLabel())}</div>
        <div><strong>Numero righe:</strong> ${state.cart.length}</div>
      </div>
      ${state.generalNotes ? `<p><strong>Note generali:</strong> ${escapeHtml(state.generalNotes)}</p>` : ""}
      <h2>Articoli</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Articolo</th>
            <th>Codice e quantità</th>
            <th>Configurazione</th>
            <th>Note e allegati</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function downloadOrderPdf() {
  const lines = buildOrderLines();
  const pdfBlob = createSimplePdf(lines, `Richiesta ${getRequestTypeLabel()} Nettuno 2026`);
  downloadBlob(pdfBlob, `richiesta-${getRequestTypeLabel().toLowerCase()}-nettuno-${dateStamp()}.pdf`);
  buildPrintDocument();
  showToast("PDF ordine/preventivo generato.");
}

function buildOrderLines() {
  const now = new Date();
  const lines = [
    `Richiesta ${getRequestTypeLabel()} - Catalogo Nettuno 2026`,
    "",
    `Cliente: ${state.customer.company}`,
    `Email: ${state.customer.email}`,
    `Referente: ${state.customer.contact || "-"}`,
    `Data: ${now.toLocaleString("it-IT")}`,
    `Tipo richiesta: ${getRequestTypeLabel()}`,
    ""
  ];

  if (state.generalNotes) {
    lines.push(`Note generali: ${state.generalNotes}`, "");
  }

  lines.push("Articoli");
  state.cart.forEach((item, index) => {
    lines.push("");
    lines.push(`${index + 1}. ${item.productName}${item.subtitle ? ` - ${item.subtitle}` : ""}`);
    lines.push(`Categoria: ${item.category}`);
    if (item.pages.length) lines.push(`Pagina PDF: ${item.pages.join("-")}`);
    if (item.variant) lines.push(`Codice: ${item.variant.code} - ${item.variant.label}`);
    lines.push(`Quantita: ${item.quantity}`);
    if (item.reference) lines.push(`Riferimento ordine: ${item.reference}`);
    if (item.canvasFabric) lines.push(`Tessuto telo: ${formatCanvasFabric(item.canvasFabric)}`);
    if (item.canvasColor) lines.push(`Colore telo: ${item.canvasColor.label}`);
    item.customizations.forEach(custom => {
      lines.push(`Lavorazione: ${custom.name} - ${custom.code} - ${custom.details}`);
    });
    item.files.forEach(file => lines.push(`Allegato PDF indicato: ${file}`));
    if (item.notes) lines.push(`Note articolo: ${item.notes}`);
  });

  return lines;
}

function createSimplePdf(sourceLines, title) {
  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 42;
  const startY = 790;
  const lineHeight = 15;
  const maxChars = 88;
  const wrapped = [];

  sourceLines.forEach(line => {
    const clean = normalizePdfText(line);
    if (!clean) {
      wrapped.push("");
      return;
    }
    const words = clean.split(/\s+/);
    let current = "";
    words.forEach(word => {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length > maxChars && current) {
        wrapped.push(current);
        current = word;
      } else {
        current = candidate;
      }
    });
    wrapped.push(current);
  });

  const pages = [];
  let currentPage = [];
  let y = startY;
  wrapped.forEach(line => {
    if (y < 52) {
      pages.push(currentPage);
      currentPage = [];
      y = startY;
    }
    currentPage.push(line);
    y -= lineHeight;
  });
  if (currentPage.length) pages.push(currentPage);

  const objects = [];
  const addObject = body => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];

  pages.forEach((pageLines, pageIndex) => {
    const commands = [
      "BT",
      `/F1 ${pageIndex === 0 ? 14 : 11} Tf`,
      `${marginX} ${startY} Td`
    ];
    pageLines.forEach((line, lineIndex) => {
      if (lineIndex === 1 && pageIndex === 0) commands.push("/F1 11 Tf");
      commands.push(`(${escapePdfString(line)}) Tj`);
      commands.push(`0 -${lineHeight} Td`);
    });
    commands.push("ET");
    const stream = commands.join("\n");
    const contentId = addObject(`<< /Length ${latin1Length(stream)} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = `%PDF-1.4\n% ${normalizePdfText(title)}\n`;
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(latin1Length(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = latin1Length(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  offsets.slice(1).forEach(offset => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([latin1Bytes(pdf)], { type: "application/pdf" });
}

function normalizePdfText(value) {
  return String(value ?? "")
    .replaceAll("·", "-")
    .replaceAll("–", "-")
    .replaceAll("—", "-")
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, "?");
}

function escapePdfString(value) {
  return normalizePdfText(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function latin1Length(value) {
  return latin1Bytes(value).length;
}

function latin1Bytes(value) {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index += 1) {
    bytes[index] = value.charCodeAt(index) & 0xff;
  }
  return bytes;
}

function prepareEmail() {
  if (!state.cart.length) {
    alert("Il carrello è vuoto.");
    return;
  }

  const placeholder = DATA.ownerEmail.includes("esempio.it");
  if (placeholder) {
    alert("Prima dell'uso reale va impostata la tua email destinataria nel file assets/catalog-data.js. Ora preparo comunque il testo email.");
  }

  const subject = `Richiesta ${getRequestTypeLabel()} Nettuno 2026 - ${state.customer.company}`;
  const body = buildMailBody();
  const url = `mailto:${DATA.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

function buildMailBody() {
  const lines = [
    `Richiesta ${getRequestTypeLabel()} - Catalogo Nettuno 2026`,
    "",
    `Cliente: ${state.customer.company}`,
    `Email: ${state.customer.email}`,
    `Referente: ${state.customer.contact || "-"}`,
    "",
    "Nota operativa: generare il PDF dal pulsante apposito e allegarlo alla mail.",
    "",
    "Articoli:"
  ];

  state.cart.forEach((item, index) => {
    lines.push("");
    lines.push(`${index + 1}. ${item.productName}${item.subtitle ? ` - ${item.subtitle}` : ""}`);
    lines.push(`Codice: ${item.variant?.code || ""}`);
    lines.push(`Quantita: ${item.quantity}`);
    if (item.reference) lines.push(`Riferimento ordine: ${item.reference}`);
    if (item.canvasFabric) lines.push(`Tessuto telo: ${formatCanvasFabric(item.canvasFabric)}`);
    if (item.canvasColor) lines.push(`Colore telo: ${item.canvasColor.label}`);
    item.customizations.forEach(custom => lines.push(`Custom: ${custom.name} - ${custom.code} - ${custom.details}`));
    item.files.forEach(file => lines.push(`Allegato indicato: ${file}`));
    if (item.notes) lines.push(`Note: ${item.notes}`);
  });

  if (state.generalNotes) {
    lines.push("");
    lines.push(`Note generali: ${state.generalNotes}`);
  }

  return lines.join("\n");
}

function showStatus(message) {
  $("statusRow").textContent = message;
  window.setTimeout(() => renderProducts(), 1800);
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateSaveStatus(markSavedNow = true) {
  const status = $("saveStatus");
  if (!status) return;
  const saved = localStorage.getItem(storageKeys.cart);
  if (!saved) {
    status.textContent = "Carrello non ancora salvato in questa sessione.";
    return;
  }
  const when = markSavedNow ? new Date() : (() => {
    try {
      return new Date(JSON.parse(saved).savedAt);
    } catch {
      return null;
    }
  })();
  status.textContent = when && !Number.isNaN(when.getTime())
    ? `Carrello salvato: ${when.toLocaleString("it-IT")}.`
    : "Carrello salvato nel browser.";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function dateStamp() {
  const now = new Date();
  const pad = value => String(value).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
}

function getCategoryName(categoryId) {
  return DATA.categories.find(item => item.id === categoryId)?.name || categoryId;
}

function getRequestTypeLabel() {
  return state.requestType === "ordine" ? "Ordine" : "Preventivo";
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
