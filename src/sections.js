// Menu Data
const menuData = {
  hot: [
    { name: 'Classic Espresso', price: '₹120', desc: 'Bold, rich single-origin shot pulled to perfection.', tag: 'Signature' },
    { name: 'Cappuccino', price: '₹160', desc: 'Velvety steamed milk with a crown of microfoam.', tag: '' },
    { name: 'Hazelnut Latte', price: '₹180', desc: 'Smooth espresso with creamy hazelnut and steamed milk.', tag: 'Popular' },
    { name: 'Masala Chai', price: '₹100', desc: 'Traditional spiced chai with fresh ginger and cardamom.', tag: '' },
    { name: 'Matcha Latte', price: '₹200', desc: 'Ceremonial grade matcha whisked with oat milk.', tag: 'New' },
    { name: 'Hot Chocolate', price: '₹150', desc: 'Belgian dark chocolate melted into steamed whole milk.', tag: '' },
  ],
  cold: [
    { name: 'Cold Brew', price: '₹180', desc: '18-hour steeped cold brew, smooth and naturally sweet.', tag: 'Signature' },
    { name: 'Iced Caramel Latte', price: '₹200', desc: 'Espresso over ice with house-made caramel and cold milk.', tag: 'Popular' },
    { name: 'Vietnamese Iced Coffee', price: '₹190', desc: 'Strong dark roast with condensed milk over ice.', tag: '' },
    { name: 'Iced Matcha', price: '₹210', desc: 'Chilled matcha with vanilla oat milk and ice.', tag: 'New' },
    { name: 'Fresh Lime Soda', price: '₹90', desc: 'Freshly squeezed lime with sparkling water and mint.', tag: '' },
    { name: 'Mango Smoothie', price: '₹160', desc: 'Alphonso mango blended with yogurt and a hint of cardamom.', tag: 'Seasonal' },
  ],
  bites: [
    { name: 'Croissant', price: '₹120', desc: 'Buttery, flaky layers baked fresh every morning.', tag: 'Popular' },
    { name: 'Avocado Toast', price: '₹180', desc: 'Sourdough topped with smashed avo, seeds, and chilli flakes.', tag: '' },
    { name: 'Banana Bread', price: '₹100', desc: 'Moist, walnut-studded slice with a caramel glaze.', tag: 'Homemade' },
    { name: 'Chicken Pesto Sandwich', price: '₹200', desc: 'Grilled chicken with basil pesto on ciabatta.', tag: '' },
    { name: 'Brownie', price: '₹130', desc: 'Dense, fudgy chocolate brownie with sea salt.', tag: 'Bestseller' },
    { name: 'Energy Ball', price: '₹80', desc: 'Dates, oats, and peanut butter — no sugar added.', tag: 'Vegan' },
  ],
};

export function initMenu() {
  const grid = document.getElementById('menu-grid');
  const tabs = document.querySelectorAll('.menu-tab');
  if (!grid || !tabs.length) return;

  function renderCategory(cat) {
    const items = menuData[cat] || [];
    grid.innerHTML = items.map((item) => `
      <div class="glass-card menu-card reveal-up" style="opacity:0;transform:translateY(30px)">
        <div class="menu-card-header">
          <span class="menu-card-name">${item.name}</span>
          <span class="menu-card-price">${item.price}</span>
        </div>
        <p class="menu-card-desc">${item.desc}</p>
        ${item.tag ? `<span class="menu-card-tag">${item.tag}</span>` : ''}
      </div>
    `).join('');

    // Animate in
    requestAnimationFrame(() => {
      const cards = grid.querySelectorAll('.glass-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderCategory(tab.dataset.category);
    });
  });

  // Initial render
  renderCategory('hot');
}
