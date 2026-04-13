const whatsappNumber = '5521999999999'; // substituir pelo número real

const properties = [
  {
    title: 'Casa vista mar em João Fernandes',
    type: 'Venda',
    location: 'João Fernandes',
    price: 'R$ 2.450.000',
    beds: 4,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Apartamento elegante em Geribá',
    type: 'Aluguel temporada',
    location: 'Geribá',
    price: 'R$ 1.200 / diária',
    beds: 2,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Casa ampla em condomínio na Ferradura',
    type: 'Aluguel anual',
    location: 'Ferradura',
    price: 'R$ 12.000 / mês',
    beds: 3,
    image:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=80',
  },
];

function buildPropertyCard(property) {
  const message = `Olá! Tenho interesse no imóvel "${property.title}" (${property.type}) em ${property.location}. Gostaria de saber disponibilidade, condições e próximos passos.`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return `
    <article class="swiper-slide property-card">
      <img src="${property.image}" alt="${property.title}" loading="lazy" />
      <div class="body">
        <h3>${property.title}</h3>
        <p class="property-meta">${property.type} · ${property.location} · ${property.beds} quartos</p>
        <p><strong>${property.price}</strong></p>
        <a class="btn btn-primary" href="${waLink}" target="_blank" rel="noopener">Consultar no WhatsApp</a>
      </div>
    </article>
  `;
}

function initProperties() {
  const list = document.getElementById('property-list');
  list.innerHTML = properties.map(buildPropertyCard).join('');

  // eslint-disable-next-line no-new
  new Swiper('.properties-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
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

    const message = `Olá, meu nome é ${nome}.%0A` +
      `Tenho interesse em: ${interesse}.%0A` +
      `Imóvel desejado: ${imovel}.%0A` +
      `Período/Data: ${datas}.%0A` +
      `Orçamento: ${orcamento}.%0A` +
      'Podem me enviar opções disponíveis e condições?';

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener');
  });
}

function initAnimations() {
  AOS.init({
    duration: 800,
    once: true,
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
initProperties();
initWhatsappForm();
initAnimations();
