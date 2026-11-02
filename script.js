// 2.2 Dynamic Content: Products
const products = [
  {name:"Allures Essence", price:"R 899.99", gender:"unisex", desc:"Deep oud, vanilla, amber - signature scent", img:"images/allures-essence-professional-bottle.jpg"},
  {name:"Blush Aura", price:"R 800", gender:"for-her", desc:"Rose, peony, soft musk", img:"images/blush-aura-professional-bottle.jpg"},
  {name:"Citrus Dawn", price:"R 820", gender:"for-him", desc:"Bergamot, jasmine, sandalwood", img:"images/citrus-dawn-professional-bottle.jpg"}
];

// 2.2 Dynamically load content + DOM manipulation
function loadProducts(list=products){
  const container = document.getElementById('product-list');
  if(!container) return;
  container.innerHTML = "";
  list.forEach(p=>{
    const article = document.createElement('article');
    article.className = 'product';
    article.innerHTML = `
      <img src="${p.img}" alt="${p.name} ${p.desc} Eau de Parfum 50ml ALLURES luxury perfume Ga Matlala" loading="lazy">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p class="price"><strong>${p.price}</strong></p>
      <button onclick="openModal()">View</button>
    `;
    // 2.1 Animations
    article.style.opacity = '0';
    article.style.transition = 'opacity 0.6s ease';
    setTimeout(()=>article.style.opacity='1',100);
    container.appendChild(article);
  });
}
loadProducts();

// 2.2 Search / Filter functionality
function filterProducts(){
  let q = document.getElementById('search').value.toLowerCase();
  let filtered = products.filter(p=>p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  loadProducts(filtered);
}

// 2.1 Tabs - DOM manipulation
function showTab(event, gender){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  if(gender==='all') loadProducts(products);
  else { let filtered = products.filter(p=>p.gender===gender); loadProducts(filtered); }
}

// 2.1 Accordions
document.querySelectorAll('.accordion').forEach(btn=>{
  btn.addEventListener('click', function(){
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    panel.style.display = panel.style.display==='block' ? 'none' : 'block';
  });
});

// 2.1 Modal
function openModal(){ document.getElementById('shopModal').style.display='block'; }
function closeModal(){ document.getElementById('shopModal').style.display='none'; }
window.addEventListener('click', e=>{ if(e.target==document.getElementById('shopModal')) closeModal(); });

// 2.1 Lightbox Gallery
function openLightbox(src){
  document.getElementById('lightbox').style.display='flex';
  document.getElementById('lightbox-img').src=src;
}
function closeLightbox(){ document.getElementById('lightbox').style.display='none'; }

// 2.1 Interactive Map - Leaflet
if(document.getElementById('map')){
  var map = L.map('map').setView([-23.65, 28.85], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap'}).addTo(map);
  L.marker([-23.65, 28.85]).addTo(map).bindPopup('ALLURES<br>126 Lekhureng Road, Ga Matlala, Limpopo').openPopup();
}