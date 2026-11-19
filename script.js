// 1. Buka/tutup menu navigasi di layar kecil
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// 2. Filter kategori menu
const filterButtons = document.querySelectorAll('.filter-button');
const menuCards = document.querySelectorAll('.menu-card');
const emptyMessage = document.querySelector('#filter-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;

    filterButtons.forEach((b) => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });

    let visible = 0;
    menuCards.forEach((card) => {
      const show = category === 'semua' || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible++;
    });
    emptyMessage.hidden = visible > 0;
  });
});

// 3. Form kontak (demo, tidak dikirim ke server)
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#contact-name').value.trim();
  document.querySelector('#form-feedback').textContent = `Terima kasih, ${name}. Pesan demo ini belum terkirim.`;
  contactForm.reset();
});
// 4. Dialog pesanan
const orderDialog = document.querySelector('#order-dialog');
const orderBackdrop = document.querySelector('#dialog-backdrop');
const orderForm = document.querySelector('#order-form');
const orderItem = document.querySelector('#order-item');
const orderQuantity = document.querySelector('#order-quantity');
const orderFeedback = document.querySelector('#order-feedback');

function openOrderDialog(itemName) {
  if (itemName && itemName !== 'Pesanan Anda') {
    orderItem.value = itemName;
  } else {
    orderItem.value = 'Pesanan Anda';
  }
  orderFeedback.textContent = '';
  orderDialog.showModal();
  orderBackdrop.classList.add('visible');
}

function closeOrderDialog() {
  orderDialog.close();
  orderBackdrop.classList.remove('visible');
}

document.querySelectorAll('[data-order]').forEach((button) => {
  button.addEventListener('click', () => {
    openOrderDialog(button.dataset.order);
  });
});

orderDialog.querySelector('.dialog-close').addEventListener('click', closeOrderDialog);
orderBackdrop.addEventListener('click', closeOrderDialog);

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = orderItem.value;
  const quantity = orderQuantity.value;
  if (item === 'Pesanan Anda') {
    orderFeedback.textContent = 'Silakan pilih menu terlebih dahulu.';
    return;
  }
  orderFeedback.textContent = `Ringkasan: ${quantity} x ${item}. Ini demo, pesanan belum dikirim.`;
});