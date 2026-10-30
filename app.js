/**
 * GadgetZone - Digital Lifestyle E-Commerce Prototype & Figma System Controller
 */

// State Management
const appState = {
  activeFrame: 'desktop', // 'desktop' (1440px), 'mobile' (390px), 'fluid'
  gridVisible: false,
  cart: [
    {
      id: 'prod-1',
      name: 'Smartwatch Pro (Gen 4)',
      price: 249.99,
      originalPrice: 299.99,
      qty: 1,
      imageSvg: 'watch'
    }
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Smartwatch Pro (Gen 4)',
      category: 'Smartwatches',
      desc: 'Ultra-bright AMOLED display, ECG monitoring, precision dual-frequency GPS & 14-day battery life.',
      price: 249.99,
      originalPrice: 299.99,
      discount: '17% OFF',
      rating: 4.9,
      reviews: 1248,
      badge: 'Bestseller',
      badgeColor: 'promo',
      imageSvg: 'watch',
      specs: ['AMOLED 1.43"', 'Dual-Band GPS', 'ECG + SpO2', '5ATM Waterproof', 'Titanium Case']
    },
    {
      id: 'prod-2',
      name: 'AuraSound Max ANC Headphones',
      category: 'Wireless Headphones',
      desc: 'Hybrid active noise cancellation, lossless 24-bit Hi-Res audio, and 40-hour ultra-long battery.',
      price: 279.99,
      originalPrice: 349.99,
      discount: '20% OFF',
      rating: 4.8,
      reviews: 982,
      badge: 'Editor\'s Choice',
      badgeColor: 'tech',
      imageSvg: 'headphones',
      specs: ['Hybrid 45dB ANC', 'Hi-Res Lossless Audio', '40h Battery Life', 'Multipoint Pairing', 'Memory Foam']
    },
    {
      id: 'prod-3',
      name: 'SonicWave Speaker X',
      category: 'Bluetooth Speakers',
      desc: '360° omnidirectional spatial sound, IPX7 waterproof rating, and 24-hour party-boost playtime.',
      price: 119.99,
      originalPrice: 149.99,
      discount: '20% OFF',
      rating: 4.7,
      reviews: 754,
      badge: 'Waterproof IPX7',
      badgeColor: 'discount',
      imageSvg: 'speaker',
      specs: ['360° Spatial Sound', 'IPX7 Submersible', '24h Playtime', 'TWS Stereo Pairing', 'Bass Radiators']
    },
    {
      id: 'prod-4',
      name: 'ViperStrike Wireless Gaming Mouse',
      category: 'Gaming Accessories',
      desc: '26,000 DPI Focus optical sensor, optical mouse switches, and ultra-lightweight 58g ergonomic chassis.',
      price: 69.99,
      originalPrice: 89.99,
      discount: '22% OFF',
      rating: 4.9,
      reviews: 1510,
      badge: 'Esports Ready',
      badgeColor: 'promo',
      imageSvg: 'mouse',
      specs: ['26K DPI Optical', '58g Featherlight', '0.2ms Response', '80h Battery', 'Speedflex Cable']
    }
  ]
};

// SVG Assets mapping for Cart & Modals
const productSvgs = {
  watch: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
    <circle cx="50" cy="50" r="38" fill="#1e293b" stroke="#3b82f6" stroke-width="3"/>
    <circle cx="50" cy="50" r="32" fill="#0f172a"/>
    <circle cx="50" cy="50" r="28" stroke="#1e3a8a" stroke-dasharray="4 4" stroke-width="1.5"/>
    <path d="M50 28 V50 L64 58" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="3" fill="#60a5fa"/>
    <rect x="42" y="4" width="16" height="12" rx="3" fill="#334155"/>
    <rect x="42" y="84" width="16" height="12" rx="3" fill="#334155"/>
    <circle cx="50" cy="70" r="3" fill="#10b981"/>
  </svg>`,
  headphones: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
    <path d="M22 55 C22 30, 78 30, 78 55" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>
    <rect x="14" y="50" width="16" height="30" rx="8" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
    <rect x="70" y="50" width="16" height="30" rx="8" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
    <circle cx="22" cy="65" r="4" fill="#2563eb"/>
    <circle cx="78" cy="65" r="4" fill="#2563eb"/>
  </svg>`,
  speaker: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
    <rect x="30" y="20" width="40" height="60" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
    <circle cx="50" cy="40" r="12" fill="#0f172a" stroke="#60a5fa" stroke-width="2"/>
    <circle cx="50" cy="64" r="10" fill="#0f172a" stroke="#60a5fa" stroke-width="2"/>
    <path d="M44 40 H56 M50 34 V46" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  mouse: `<svg viewBox="0 0 100 100" fill="none" class="w-full h-full">
    <path d="M35 30 C35 20, 65 20, 65 30 L65 65 C65 78, 35 78, 35 65 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
    <line x1="50" y1="20" x2="50" y2="40" stroke="#64748b" stroke-width="1.5"/>
    <circle cx="50" cy="32" r="3" fill="#06b6d4"/>
    <path d="M42 55 L50 62 L58 55" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" fill="none"/>
  </svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  initFrameSwitcher();
  initGridOverlay();
  initInspectorDrawer();
  initCartDrawer();
  initSearchModal();
  initQuickViewModal();
  initNewsletter();
  initCountdownTimer();
  initMobileDrawer();
  renderCart();
  updateCartBadge();
});

/* Frame Switcher logic */
function initFrameSwitcher() {
  const wrapper = document.getElementById('canvasWrapper');
  const desktopBtn = document.getElementById('btnFrameDesktop');
  const mobileBtn = document.getElementById('btnFrameMobile');
  const fluidBtn = document.getElementById('btnFrameFluid');
  const widthIndicator = document.getElementById('frameWidthIndicator');

  function setFrame(mode) {
    appState.activeFrame = mode;
    wrapper.classList.remove('mode-desktop', 'mode-mobile');
    desktopBtn.classList.remove('active');
    mobileBtn.classList.remove('active');
    fluidBtn.classList.remove('active');

    if (mode === 'desktop') {
      wrapper.classList.add('mode-desktop');
      desktopBtn.classList.add('active');
      if (widthIndicator) widthIndicator.textContent = '1440px (Desktop)';
    } else if (mode === 'mobile') {
      wrapper.classList.add('mode-mobile');
      mobileBtn.classList.add('active');
      if (widthIndicator) widthIndicator.textContent = '390px (Mobile)';
    } else {
      fluidBtn.classList.add('active');
      if (widthIndicator) widthIndicator.textContent = '100% Fluid';
    }

    showToast(`Switched to ${mode.toUpperCase()} view frame`, 'info');
  }

  desktopBtn?.addEventListener('click', () => setFrame('desktop'));
  mobileBtn?.addEventListener('click', () => setFrame('mobile'));
  fluidBtn?.addEventListener('click', () => setFrame('fluid'));
}

/* Grid Overlay Toggle */
function initGridOverlay() {
  const toggleBtn = document.getElementById('btnToggleGrid');
  const overlay = document.getElementById('figmaGridOverlay');

  toggleBtn?.addEventListener('click', () => {
    appState.gridVisible = !appState.gridVisible;
    if (appState.gridVisible) {
      overlay.classList.add('active');
      toggleBtn.classList.add('active');
      showToast('Figma Auto Layout Grid: Enabled', 'info');
    } else {
      overlay.classList.remove('active');
      toggleBtn.classList.remove('active');
      showToast('Figma Auto Layout Grid: Hidden', 'info');
    }
  });
}

/* Inspector Drawer */
function initInspectorDrawer() {
  const inspectorBtn = document.getElementById('btnOpenInspector');
  const drawer = document.getElementById('designInspectorDrawer');
  const closeBtn = document.getElementById('closeInspectorBtn');
  const backdrop = document.getElementById('commonBackdrop');

  function openInspector() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
  }

  function closeInspector() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
  }

  inspectorBtn?.addEventListener('click', openInspector);
  closeBtn?.addEventListener('click', closeInspector);

  // Inspector Tabs
  const tabBtns = document.querySelectorAll('.inspector-tab-btn');
  const tabPanes = document.querySelectorAll('.inspector-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.add('hidden'));

      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.target);
      if (target) target.classList.remove('hidden');
    });
  });

  // Clickable Swatches to Copy Hex
  document.querySelectorAll('.color-swatch-card').forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.dataset.hex;
      if (hex) {
        navigator.clipboard?.writeText(hex);
        showToast(`Copied ${hex} to clipboard!`, 'success');
      }
    });
  });
}

/* Cart Drawer Logic */
function initCartDrawer() {
  const openCartBtn = document.getElementById('cartOpenBtn');
  const mobileCartBtn = document.getElementById('mobileCartOpenBtn');
  const drawer = document.getElementById('cartDrawer');
  const closeBtn = document.getElementById('closeCartBtn');
  const backdrop = document.getElementById('commonBackdrop');

  function openCart() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
  }

  function closeCart() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
  }

  openCartBtn?.addEventListener('click', openCart);
  mobileCartBtn?.addEventListener('click', openCart);
  closeBtn?.addEventListener('click', closeCart);
  backdrop?.addEventListener('click', () => {
    closeCart();
    document.getElementById('designInspectorDrawer')?.classList.remove('open');
    document.getElementById('mobileDrawer')?.classList.remove('open');
    document.getElementById('quickViewModal')?.classList.add('hidden');
    document.getElementById('searchModal')?.classList.add('hidden');
    backdrop.classList.remove('active');
  });

  // Global Add To Cart Event Listeners
  document.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.dataset.productId;
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  const product = appState.products.find(p => p.id === productId);
  if (!product) return;

  const existing = appState.cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    appState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      qty: 1,
      imageSvg: product.imageSvg
    });
  }

  renderCart();
  updateCartBadge();
  showToast(`Added ${product.name} to cart!`, 'success');

  // Trigger slight bump animation on cart icon
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.style.transform = 'scale(1.35)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
  }
}

function updateCartQty(productId, delta) {
  const item = appState.cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    appState.cart = appState.cart.filter(i => i.id !== productId);
    showToast(`Removed from cart`, 'info');
  }
  renderCart();
  updateCartBadge();
}

function removeCartItem(productId) {
  appState.cart = appState.cart.filter(i => i.id !== productId);
  renderCart();
  updateCartBadge();
  showToast('Item removed from cart', 'info');
}

function renderCart() {
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const shippingMsgEl = document.getElementById('shippingProgressText');
  const shippingBarEl = document.getElementById('shippingProgressBar');

  if (!container) return;

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 text-center text-slate-400">
        <svg class="w-16 h-16 mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <p class="font-semibold text-white mb-1">Your cart is empty</p>
        <p class="text-xs text-slate-400">Discover cutting-edge gadgets and add them to your cart.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    if (shippingBarEl) shippingBarEl.style.width = '0%';
    if (shippingMsgEl) shippingMsgEl.textContent = 'Add $50.00 more to get FREE express shipping!';
    return;
  }

  let subtotal = 0;
  container.innerHTML = appState.cart.map(item => {
    subtotal += item.price * item.qty;
    const svgCode = productSvgs[item.imageSvg] || productSvgs.watch;
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          ${svgCode}
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="text-xs font-bold text-white">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="remove-cart-item" onclick="removeCartItem('${item.id}')" title="Remove item">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

  // Shipping progress calculation ($100 free shipping goal)
  const threshold = 100;
  if (subtotal >= threshold) {
    if (shippingBarEl) shippingBarEl.style.width = '100%';
    if (shippingMsgEl) shippingMsgEl.innerHTML = '🎉 You qualified for <strong>FREE Priority Delivery!</strong>';
  } else {
    const diff = (threshold - subtotal).toFixed(2);
    const pct = Math.min(100, (subtotal / threshold) * 100);
    if (shippingBarEl) shippingBarEl.style.width = `${pct}%`;
    if (shippingMsgEl) shippingMsgEl.innerHTML = `Add <strong>$${diff}</strong> more for <strong>FREE express delivery!</strong>`;
  }
}

function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  const count = appState.cart.reduce((acc, curr) => acc + curr.qty, 0);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

/* Quick View Modal */
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeQuickViewBtn');
  const backdrop = document.getElementById('commonBackdrop');

  function openQuickView(productId) {
    const p = appState.products.find(item => item.id === productId);
    if (!p) return;

    document.getElementById('qvTitle').textContent = p.name;
    document.getElementById('qvCategory').textContent = p.category;
    document.getElementById('qvPrice').textContent = `$${p.price.toFixed(2)}`;
    document.getElementById('qvOriginalPrice').textContent = `$${p.originalPrice.toFixed(2)}`;
    document.getElementById('qvDesc').textContent = p.desc;
    document.getElementById('qvRating').textContent = `${p.rating} (${p.reviews} verified reviews)`;
    document.getElementById('qvImageSlot').innerHTML = productSvgs[p.imageSvg] || productSvgs.watch;

    const specsList = document.getElementById('qvSpecsList');
    if (specsList && p.specs) {
      specsList.innerHTML = p.specs.map(spec => `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700/60 rounded-md text-xs text-sky-300">
          <svg class="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          ${spec}
        </span>
      `).join('');
    }

    const ctaBtn = document.getElementById('qvAddToCartBtn');
    if (ctaBtn) {
      ctaBtn.onclick = () => {
        addToCart(p.id);
        modal.classList.add('hidden');
        backdrop.classList.remove('active');
      };
    }

    modal.classList.remove('hidden');
    backdrop.classList.add('active');
  }

  document.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = btn.dataset.productId;
      openQuickView(pid);
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    backdrop.classList.remove('active');
  });
}

/* Search Modal */
function initSearchModal() {
  const openSearchBtn = document.getElementById('searchOpenBtn');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('closeSearchBtn');
  const input = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');
  const backdrop = document.getElementById('commonBackdrop');

  function openSearch() {
    modal.classList.remove('hidden');
    backdrop.classList.add('active');
    setTimeout(() => input?.focus(), 100);
    renderSearchResults('');
  }

  function closeSearch() {
    modal.classList.add('hidden');
    backdrop.classList.remove('active');
    if (input) input.value = '';
  }

  openSearchBtn?.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);

  input?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.toLowerCase().trim());
  });

  function renderSearchResults(query) {
    if (!resultsContainer) return;

    const filtered = appState.products.filter(p => 
      !query || 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-8 text-center text-slate-400">
          <p class="font-medium text-white mb-1">No gadgets found matching "${query}"</p>
          <p class="text-xs">Try searching for "headphones", "smartwatch", "speaker", or "mouse".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(p => `
      <div class="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 transition cursor-pointer" onclick="selectSearchResult('${p.id}')">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-slate-900 p-2 flex items-center justify-center">
            ${productSvgs[p.imageSvg]}
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">${p.name}</h4>
            <span class="text-xs text-sky-400">${p.category}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm font-bold text-white">$${p.price.toFixed(2)}</div>
          <span class="text-xs text-emerald-400 font-semibold">${p.discount}</span>
        </div>
      </div>
    `).join('');
  }
}

function selectSearchResult(productId) {
  document.getElementById('searchModal')?.classList.add('hidden');
  document.getElementById('commonBackdrop')?.classList.remove('active');
  const targetCard = document.querySelector(`[data-product-card="${productId}"]`);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.style.outline = '2px solid #2563eb';
    targetCard.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.6)';
    setTimeout(() => {
      targetCard.style.outline = 'none';
      targetCard.style.boxShadow = '';
    }, 2000);
  }
}

/* Newsletter Subscription */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput?.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'info');
      return;
    }

    showToast('🎉 Success! Your $20 tech coupon is on the way!', 'success');
    form.innerHTML = `
      <div class="flex items-center justify-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 font-semibold text-sm">
        <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>You are subscribed! Check your inbox for exclusive VIP perks.</span>
      </div>
    `;
  });
}

/* Countdown Timer */
function initCountdownTimer() {
  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minsEl = document.getElementById('countdownMins');
  const secsEl = document.getElementById('countdownSecs');

  if (!daysEl) return;

  let totalSeconds = 2 * 24 * 3600 + 14 * 3600 + 45 * 60 + 30; // 2 days, 14 hours

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 3 * 24 * 3600;

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

/* Mobile Drawer */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeMobileDrawerBtn');
  const backdrop = document.getElementById('commonBackdrop');

  function openMobileNav() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
  }

  function closeMobileNav() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
  }

  openBtn?.addEventListener('click', openMobileNav);
  closeBtn?.addEventListener('click', closeMobileNav);

  drawer?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
}

/* Toast Notifications Helper */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
    : `<svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Make functions accessible globally for HTML onclick attributes
window.updateCartQty = updateCartQty;
window.removeCartItem = removeCartItem;
window.addToCart = addToCart;
window.selectSearchResult = selectSearchResult;
