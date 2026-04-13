// O cliente só precisa editar o arquivo `properties.json`.
// Este script lê esses dados e monta os cards, modais e chatbot.

const whatsappNumber = '5521999999999'; // Substituir pelo número real.

const translations = {
  pt: {
    brand: 'Vibras Imóveis',
    talkNow: 'Falar agora',
    tagBuzios: 'Búzios · Venda & Aluguel',
    heroTitle: 'Encontre o imóvel ideal em Búzios com atendimento imediato',
    heroDesc: 'Apartamentos, casas e opções premium em localizações exclusivas. Veja propriedades disponíveis e envie uma solicitação personalizada pelo WhatsApp.',
    viewProperties: 'Ver imóveis',
    requestService: 'Solicitar atendimento',
    properties: '+120 Imóveis no portfólio',
    experience: '15+ Anos de experiência local',
    service: 'Atendimento rápido via WhatsApp',
    highlights: 'Destaques',
    selectedProperties: 'Imóveis selecionados para você',
    buzios: 'Búzios',
    popularAreas: 'Regiões com maior procura',
    buziosDesc: 'João Fernandes, Geribá, Ferradura e Manguinhos são alguns dos bairros com alta demanda para compra e locação por temporada.',
    seaView: 'Casas com vista mar',
    beachApartments: 'Apartamentos próximos à praia',
    seasonal: 'Opções para temporada e anual',
    investment: 'Imóveis para investimento',
    contact: 'Contato',
    personalizedOptions: 'Receba opções personalizadas no WhatsApp',
    name: 'Nome',
    interest: 'Interesse',
    select: 'Selecione...',
    buy: 'Compra',
    annualRent: 'Aluguel anual',
    seasonalRent: 'Aluguel temporada',
    desiredProperty: 'Imóvel desejado',
    period: 'Período ou data de interesse',
    budget: 'Orçamento aproximado',
    sendRequest: 'Enviar solicitação no WhatsApp',
    consultWhatsApp: 'Consultar no WhatsApp',
    sendEmail: 'Enviar e-mail',
    footer: '© {year} Vibras Imóveis · Búzios'
  },
  es: {
    brand: 'Vibras Inmobiliaria',
    talkNow: 'Hablar ahora',
    tagBuzios: 'Búzios · Venta & Alquiler',
    heroTitle: 'Encuentra la propiedad ideal en Búzios con atención inmediata',
    heroDesc: 'Apartamentos, casas y opciones premium en ubicaciones exclusivas. Ve propiedades disponibles y envía una solicitud personalizada por WhatsApp.',
    viewProperties: 'Ver propiedades',
    requestService: 'Solicitar atención',
    properties: '+120 Propiedades en portafolio',
    experience: '15+ Años de experiencia local',
    service: 'Atención rápida vía WhatsApp',
    highlights: 'Destacados',
    selectedProperties: 'Propiedades seleccionadas para ti',
    buzios: 'Búzios',
    popularAreas: 'Regiones con mayor demanda',
    buziosDesc: 'João Fernandes, Geribá, Ferradura y Manguinhos son algunos de los barrios con alta demanda para compra y alquiler por temporada.',
    seaView: 'Casas con vista al mar',
    beachApartments: 'Apartamentos cerca de la playa',
    seasonal: 'Opciones para temporada y anual',
    investment: 'Propiedades para inversión',
    contact: 'Contacto',
    personalizedOptions: 'Recibe opciones personalizadas en WhatsApp',
    name: 'Nombre',
    interest: 'Interés',
    select: 'Selecciona...',
    buy: 'Compra',
    annualRent: 'Alquiler anual',
    seasonalRent: 'Alquiler temporada',
    desiredProperty: 'Propiedad deseada',
    period: 'Período o fecha de interés',
    budget: 'Presupuesto aproximado',
    sendRequest: 'Enviar solicitud en WhatsApp',
    consultWhatsApp: 'Consultar en WhatsApp',
    sendEmail: 'Enviar e-mail',
    footer: '© {year} Vibras Inmobiliaria · Búzios'
  },
  en: {
    brand: 'Vibras Real Estate',
    talkNow: 'Talk now',
    tagBuzios: 'Búzios · Sale & Rent',
    heroTitle: 'Find the ideal property in Búzios with immediate service',
    heroDesc: 'Apartments, houses and premium options in exclusive locations. See available properties and send a personalized request via WhatsApp.',
    viewProperties: 'View properties',
    requestService: 'Request service',
    properties: '+120 Properties in portfolio',
    experience: '15+ Years of local experience',
    service: 'Fast service via WhatsApp',
    highlights: 'Highlights',
    selectedProperties: 'Selected properties for you',
    buzios: 'Búzios',
    popularAreas: 'Most sought-after areas',
    buziosDesc: 'João Fernandes, Geribá, Ferradura and Manguinhos are some of the neighborhoods with high demand for purchase and seasonal rental.',
    seaView: 'Houses with sea view',
    beachApartments: 'Apartments near the beach',
    seasonal: 'Options for seasonal and annual',
    investment: 'Properties for investment',
    contact: 'Contact',
    personalizedOptions: 'Receive personalized options on WhatsApp',
    name: 'Name',
    interest: 'Interest',
    select: 'Select...',
    buy: 'Purchase',
    annualRent: 'Annual rent',
    seasonalRent: 'Seasonal rent',
    desiredProperty: 'Desired property',
    period: 'Period or date of interest',
    budget: 'Approximate budget',
    sendRequest: 'Send request on WhatsApp',
    consultWhatsApp: 'Consult on WhatsApp',
    sendEmail: 'Send email',
    footer: '© {year} Vibras Real Estate · Búzios'
  }
};

let currentLang = 'pt';
let properties = [];

async function loadProperties() {
  const response = await fetch('properties.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`No se pudieron cargar las propiedades: ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('El archivo properties.json debe contener una lista de propiedades.');
  }

  properties = data;
}

function normalizeText(value) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getBedroomsLabel() {
  return currentLang === 'en' ? 'bedrooms' : currentLang === 'es' ? 'habitaciones' : 'quartos';
}

function getPropertyText(property, fieldName, fallback = '') {
  const value = property[fieldName];
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[currentLang] || value.pt || value.es || value.en || fallback;
}

function getPropertyList(property, fieldName) {
  const value = property[fieldName];
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[currentLang] || value.pt || value.es || value.en || [];
}

function buildWhatsappMessage(property, title, type) {
  return `Olá! Tenho interesse no imóvel "${title}" (${type}) em ${property.location}. Gostaria de saber disponibilidade, condições e próximos passos.`;
}

function createPropertyMeta(property, type) {
  return `${type} · ${property.location} · ${property.beds} ${getBedroomsLabel()}`;
}

function createEmptyPropertiesState() {
  const list = document.getElementById('property-list');
  if (!list) return;

  list.innerHTML = `
    <article class="swiper-slide property-card">
      <div class="body">
        <h3>Sem imóveis cadastrados</h3>
        <p class="property-meta">Edite o arquivo properties.json para publicar as opções.</p>
      </div>
    </article>
  `;
}

function buildPropertyCard(property, index) {
  const title = getPropertyText(property, 'title', 'Imóvel');
  const type = getPropertyText(property, 'type', '');
  const message = buildWhatsappMessage(property, title, type);
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return `
    <article class="swiper-slide property-card" data-index="${index}">
      <img src="${property.images[0]}" alt="${title}" loading="lazy" />
      <div class="body">
        <h3>${title}</h3>
        <p class="property-meta">${createPropertyMeta(property, type)}</p>
        <p><strong>${property.price}</strong></p>
        <a class="btn btn-primary" href="${waLink}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
      </div>
    </article>
  `;
}

function initProperties() {
  const list = document.getElementById('property-list');
  if (!list) return;

  if (!properties.length) {
    createEmptyPropertiesState();
    return;
  }

  list.innerHTML = properties.map((property, index) => buildPropertyCard(property, index)).join('');

  document.querySelectorAll('.property-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (!event.target.closest('a')) {
        openModal(Number.parseInt(card.dataset.index, 10));
      }
    });
  });

  new Swiper('.properties-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: '.properties-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function openModal(index) {
  const property = properties[index];
  if (!property) return;

  const title = getPropertyText(property, 'title', 'Imóvel');
  const type = getPropertyText(property, 'type', '');
  const description = getPropertyText(property, 'description', '');
  const highlights = getPropertyList(property, 'highlights');

  document.getElementById('modal-images').innerHTML = property.images
    .map((image) => `<div class="swiper-slide"><img src="${image}" alt="${title}"></div>`)
    .join('');

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-meta').textContent = createPropertyMeta(property, type);
  document.getElementById('modal-price').textContent = property.price;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-highlights').innerHTML = highlights
    .map((item) => `<span class="modal-highlight">${item}</span>`)
    .join('');

  const message = buildWhatsappMessage(property, title, type);
  document.getElementById('modal-whatsapp').href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  document.getElementById('modal-whatsapp').textContent = translations[currentLang].consultWhatsApp;
  document.getElementById('modal-email').textContent = translations[currentLang].sendEmail;

  document.getElementById('property-modal').style.display = 'block';

  new Swiper('.property-carousel', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.property-carousel .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.property-carousel .swiper-button-next',
      prevEl: '.property-carousel .swiper-button-prev',
    },
  });
}

function closeModal() {
  document.getElementById('property-modal').style.display = 'none';
}

function changeLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
  updateContent();
  initProperties();
}

function setLabelText(selector, value) {
  const label = document.querySelector(selector);
  if (!label) return;
  const firstTextNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (firstTextNode) {
    firstTextNode.textContent = `${value}\n            `;
  }
}

function updateContent() {
  const t = translations[currentLang];

  document.querySelector('.brand').textContent = t.brand;
  document.querySelector('.btn-outline').textContent = t.talkNow;
  document.querySelector('.hero-content .tag').textContent = t.tagBuzios;
  document.querySelector('.hero h1').textContent = t.heroTitle;
  document.querySelector('.hero-content > p:not(.tag)').textContent = t.heroDesc;
  document.querySelectorAll('.hero-actions .btn')[0].textContent = t.viewProperties;
  document.querySelectorAll('.hero-actions .btn')[1].textContent = t.requestService;

  const stats = document.querySelectorAll('.stats article p');
  stats[0].textContent = t.properties;
  stats[1].textContent = t.experience;
  stats[2].textContent = t.service;

  document.querySelector('#imoveis .section-head .tag').textContent = t.highlights;
  document.querySelector('#imoveis .section-head h2').textContent = t.selectedProperties;

  const locationSection = document.querySelector('.location');
  locationSection.querySelector('.tag').textContent = t.buzios;
  locationSection.querySelector('h2').textContent = t.popularAreas;
  locationSection.querySelector('p').textContent = t.buziosDesc;
  const listItems = locationSection.querySelectorAll('li');
  listItems[0].textContent = t.seaView;
  listItems[1].textContent = t.beachApartments;
  listItems[2].textContent = t.seasonal;
  listItems[3].textContent = t.investment;

  document.querySelector('#contato .section-head .tag').textContent = t.contact;
  document.querySelector('#contato .section-head h2').textContent = t.personalizedOptions;

  setLabelText('label[for="nome"]', t.name);
  setLabelText('label[for="interesse"]', t.interest);
  setLabelText('label[for="imovel"]', t.desiredProperty);
  setLabelText('label[for="datas"]', t.period);
  setLabelText('label[for="orcamento"]', t.budget);

  document.querySelector('option[value=""]').textContent = t.select;
  document.querySelector('option[value="Compra"]').textContent = t.buy;
  document.querySelector('option[value="Aluguel anual"]').textContent = t.annualRent;
  document.querySelector('option[value="Aluguel temporada"]').textContent = t.seasonalRent;
  document.querySelector('#wa-form button').textContent = t.sendRequest;
  document.querySelector('.footer p').innerHTML = t.footer.replace('{year}', new Date().getFullYear());
}

function initWhatsappForm() {
  const form = document.getElementById('wa-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nome = formData.get('nome');
    const interesse = formData.get('interesse');
    const imovel = formData.get('imovel');
    const datas = formData.get('datas') || 'Não informado';
    const orcamento = formData.get('orcamento') || 'Não informado';

    const message = `Olá, meu nome é ${nome}.%0A`
      + `Tenho interesse em: ${interesse}.%0A`
      + `Imóvel desejado: ${imovel}.%0A`
      + `Período/Data: ${datas}.%0A`
      + `Orçamento: ${orcamento}.%0A`
      + 'Podem me enviar opções disponíveis e condições?';

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener');
  });
}

function initModal() {
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('property-modal')) {
      closeModal();
    }
  });
}

function initLanguageSwitcher() {
  const select = document.getElementById('language-select');
  select.value = currentLang;
  select.addEventListener('change', (event) => changeLanguage(event.target.value));
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : currentLang === 'es' ? 'es' : 'en';
}

function addChatMessage(text, sender = 'bot') {
  const messages = document.getElementById('chatbot-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `chatbot-message ${sender}`;
  messageElement.textContent = text;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}

function getPropertySearchText(property) {
  return normalizeText([
    property.location,
    property.title?.pt,
    property.title?.es,
    property.title?.en,
    property.type?.pt,
    property.type?.es,
    property.type?.en,
    property.area?.pt,
    property.area?.es,
    property.area?.en,
    property.description?.pt,
    property.description?.es,
    property.description?.en,
    ...getPropertyList(property, 'highlights'),
  ].join(' '));
}

function parsePropertyPrice(priceLabel) {
  const numericValue = Number((priceLabel || '').replace(/[^\d]/g, ''));
  return Number.isFinite(numericValue) ? numericValue : null;
}

function extractRequestedBedrooms(message) {
  const match = normalizeText(message).match(/(\d+)\s*(quartos?|habitaciones?|dormitorios?|bed(room)?s?)/);
  return match ? Number(match[1]) : null;
}

function extractBudget(message) {
  const match = normalizeText(message).match(/(?:r\$|\$|usd|brl)?\s*(\d[\d.,]*)/);
  return match ? Number(match[1].replace(/[^\d]/g, '')) : null;
}

function detectRequestedType(message) {
  const text = normalizeText(message);
  if (text.includes('temporada') || text.includes('vacaciones') || text.includes('diaria')) return 'temporada';
  if (text.includes('anual') || text.includes('largo plazo')) return 'anual';
  if (text.includes('compra') || text.includes('comprar') || text.includes('venta')) return 'venta';
  return null;
}

function matchProperties(message) {
  const normalizedMessage = normalizeText(message);
  const requestedBedrooms = extractRequestedBedrooms(message);
  const requestedType = detectRequestedType(message);
  const budget = extractBudget(message);

  return properties
    .map((property) => {
      const searchText = getPropertySearchText(property);
      let score = 0;

      if (normalizedMessage.includes(normalizeText(property.location))) score += 4;
      if (normalizedMessage.includes(normalizeText(getPropertyText(property, 'title')))) score += 4;
      if (normalizedMessage.includes('casa') && searchText.includes('casa')) score += 2;
      if ((normalizedMessage.includes('apartamento') || normalizedMessage.includes('depto')) && searchText.includes('apartamento')) score += 2;
      if ((normalizedMessage.includes('playa') || normalizedMessage.includes('cerca')) && searchText.includes('playa')) score += 1;
      if (requestedBedrooms && property.beds === requestedBedrooms) score += 3;

      const typeText = normalizeText(getPropertyText(property, 'type'));
      if (requestedType === 'venta' && typeText.includes('venta')) score += 3;
      if (requestedType === 'anual' && typeText.includes('anual')) score += 3;
      if (requestedType === 'temporada' && typeText.includes('temporada')) score += 3;

      if (budget) {
        const propertyPrice = parsePropertyPrice(property.price);
        if (propertyPrice && propertyPrice <= budget) score += 2;
      }

      if (searchText.includes(normalizedMessage)) score += 5;

      return { property, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.property);
}

function buildPropertySummary(property) {
  return `${getPropertyText(property, 'title')} · ${getPropertyText(property, 'type')} · ${property.location} · ${property.price}`;
}

function getChatReply(message) {
  const normalizedMessage = normalizeText(message);
  const matches = matchProperties(message);
  const topMatch = matches[0];
  const budget = extractBudget(message);
  const requestedBedrooms = extractRequestedBedrooms(message);

  if (normalizedMessage.includes('whatsapp') || normalizedMessage.includes('wpp') || normalizedMessage.includes('contacto') || normalizedMessage.includes('email') || normalizedMessage.includes('correo')) {
    return 'Puedes contactarnos por WhatsApp al +55 21 99999-9999 o por email en contato@vibrasimoveis.com. También puedes dejar tu búsqueda en el formulario.';
  }

  if (normalizedMessage.includes('que propiedades') || normalizedMessage.includes('que tienen') || normalizedMessage.includes('disponibles') || normalizedMessage.includes('opciones')) {
    return `Hoy tenemos estas opciones destacadas: ${properties.map((property) => buildPropertySummary(property)).join(' | ')}. Si me dices zona, presupuesto o habitaciones, te recomiendo la más adecuada.`;
  }

  if ((normalizedMessage.includes('precio') || normalizedMessage.includes('valor') || normalizedMessage.includes('cuanto cuesta')) && topMatch) {
    return `${getPropertyText(topMatch, 'title')} tiene un valor de ${topMatch.price}. Está en ${topMatch.location} y corresponde a ${getPropertyText(topMatch, 'type').toLowerCase()}.`;
  }

  if ((normalizedMessage.includes('donde') || normalizedMessage.includes('ubicacion') || normalizedMessage.includes('zona') || normalizedMessage.includes('queda')) && topMatch) {
    return `${getPropertyText(topMatch, 'title')} está ubicada en ${topMatch.location} y se encuentra ${getPropertyText(topMatch, 'area')}.`;
  }

  if ((normalizedMessage.includes('playa') || normalizedMessage.includes('cerca') || normalizedMessage.includes('turistico')) && topMatch) {
    return `${getPropertyText(topMatch, 'title')} está ${getPropertyText(topMatch, 'area')}. ${getPropertyText(topMatch, 'description')}`;
  }

  if ((normalizedMessage.includes('habitacion') || normalizedMessage.includes('quarto') || normalizedMessage.includes('quartos') || normalizedMessage.includes('dormitorio') || normalizedMessage.includes('bedroom')) && topMatch) {
    return `${getPropertyText(topMatch, 'title')} tiene ${topMatch.beds} habitaciones. Sus puntos fuertes son: ${getPropertyList(topMatch, 'highlights').join(', ')}.`;
  }

  if (topMatch) {
    let extra = '';
    if (budget) extra += ` Tomé en cuenta un presupuesto aproximado de ${budget.toLocaleString('es-AR')}.`;
    if (requestedBedrooms) extra += ` También consideré la búsqueda de ${requestedBedrooms} habitaciones.`;
    return `${buildPropertySummary(topMatch)}. ${getPropertyText(topMatch, 'description')}${extra}`;
  }

  return 'Puedo ayudarte con precio, ubicación, habitaciones, tipo de operación y cercanía a la playa de cada propiedad. Prueba con algo como "¿Qué opciones tienen en Geribá?" o "Busco una casa de 3 habitaciones".';
}

function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const close = document.querySelector('.chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', panel.classList.contains('open') ? 'false' : 'true');
  });

  close.addEventListener('click', () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    addChatMessage(userText, 'user');
    input.value = '';
    setTimeout(() => {
      addChatMessage(getChatReply(userText), 'bot');
    }, 300);
  });

  addChatMessage('Hola. Puedo ayudarte con precio, ubicación, habitaciones, tipo de operación y zona de cada propiedad.');
}

function generateStructuredData() {
  const previousScript = document.getElementById('properties-structured-data');
  if (previousScript) previousScript.remove();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Imóveis em Destaque - Vibras Imóveis',
    description: 'Propriedades selecionadas para venda e aluguel em Búzios',
    itemListElement: properties.map((property, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'RealEstateListing',
        name: getPropertyText(property, 'title'),
        description: `${getPropertyText(property, 'type')} em ${property.location}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: property.location,
          addressRegion: 'RJ',
          addressCountry: 'BR'
        },
        numberOfRooms: property.beds,
        price: property.price.replace(/[^\d.,]/g, ''),
        priceCurrency: 'BRL',
        image: property.images,
        url: `${window.location.href}#imoveis`
      }
    }))
  };

  const script = document.createElement('script');
  script.id = 'properties-structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function initAnimations() {
  AOS.init({
    duration: 800,
    once: true,
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  try {
    await loadProperties();
  } catch (error) {
    console.error(error);
  }

  generateStructuredData();
  initProperties();
  initWhatsappForm();
  initLanguageSwitcher();
  initModal();
  initChatbot();
  initAnimations();
});
