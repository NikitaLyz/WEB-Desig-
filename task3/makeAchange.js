// --- script.js ---

// Ключ у localStorage для збереження стану
const STORAGE_KEY = 'buyListItems';

// Спроба завантажити збережені товари з localStorage
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Не вдалося спарсити дані з localStorage:', e);
  }
  return null;
}

// Записати поточний масив items у localStorage
function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Не вдалося записати дані в localStorage:', e);
  }
}

// Початкові дані (якщо localStorage порожній, будемо використовувати дефолтні)
let items = loadFromStorage() || [
  { id: 1, name: 'Помідори', quantity: 2, purchased: true },
  { id: 2, name: 'Печиво', quantity: 2, purchased: false },
  { id: 3, name: 'Сир', quantity: 1, purchased: false }
];
let nextId = items.reduce((max, i) => Math.max(max, i.id), 0) + 1;

const todoList = document.getElementById('todo-list');
const statsNotBought = document.getElementById('stats-not-bought');
const statsBought = document.getElementById('stats-bought');
const newItemInput = document.getElementById('new-item');
const addBtn = document.getElementById('add-btn');

function renderList() {
  todoList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    const row = document.createElement('div');
    row.className = 'row align-items-center';

    // 1) Назва чи редагування назви
    const colName = document.createElement('div');
    colName.className = 'col-5';
    if (item.purchased) {
      const span = document.createElement('span');
      span.textContent = item.name;
      span.className = 'item-name purchased';
      colName.appendChild(span);
    } else {
      const span = document.createElement('span');
      span.textContent = item.name;
      span.className = 'item-name';
      span.addEventListener('click', () => startNameEdit(item.id));
      colName.appendChild(span);
    }
    row.appendChild(colName);

    // 2) Кнопки ± або просто кількість
    const colQuantity = document.createElement('div');
    colQuantity.className = 'col-2 d-flex justify-content-center align-items-center';
    if (item.purchased) {
      const qtyBox = document.createElement('span');
      qtyBox.textContent = item.quantity;
      qtyBox.className = 'quantity-box purchased';
      colQuantity.appendChild(qtyBox);
    } else {
      const minusBtn = document.createElement('button');
      minusBtn.className = 'btn btn-sm btn-danger me-1';
      minusBtn.textContent = '−';
      minusBtn.disabled = (item.quantity <= 1);
      minusBtn.setAttribute('data-tooltip', 'Зменшити кількість');
      minusBtn.addEventListener('click', () => {
        changeQuantity(item.id, -1);
      });
      colQuantity.appendChild(minusBtn);

      const qtyBox = document.createElement('span');
      qtyBox.textContent = item.quantity;
      qtyBox.className = 'quantity-box';
      colQuantity.appendChild(qtyBox);

      const plusBtn = document.createElement('button');
      plusBtn.className = 'btn btn-sm btn-success ms-1';
      plusBtn.textContent = '+';
      plusBtn.setAttribute('data-tooltip', 'Збільшити кількість');
      plusBtn.addEventListener('click', () => {
        changeQuantity(item.id, 1);
      });
      colQuantity.appendChild(plusBtn);
    }
    row.appendChild(colQuantity);

    // 3) Кнопка Куплено/Не куплено та × для невкуплених
    const colAction = document.createElement('div');
    colAction.className = 'col-5 d-flex justify-content-end';
    if (item.purchased) {
      const btnUnbuy = document.createElement('button');
      btnUnbuy.className = 'btn btn-sm btn-secondary me-1';
      btnUnbuy.textContent = 'Не куплено';
      btnUnbuy.setAttribute('data-tooltip', 'Позначити як не куплено');
      btnUnbuy.addEventListener('click', () => {
        togglePurchased(item.id);
      });
      colAction.appendChild(btnUnbuy);
    } else {
      const btnBuy = document.createElement('button');
      btnBuy.className = 'btn btn-sm btn-secondary me-1';
      btnBuy.textContent = 'Куплено';
      btnBuy.setAttribute('data-tooltip', 'Позначити як куплено');
      btnBuy.addEventListener('click', () => {
        togglePurchased(item.id);
      });
      colAction.appendChild(btnBuy);

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn btn-sm btn-danger';
      btnDelete.textContent = '×';
      btnDelete.setAttribute('data-tooltip', 'Видалити');
      btnDelete.addEventListener('click', () => {
        deleteItem(item.id);
      });
      colAction.appendChild(btnDelete);
    }
    row.appendChild(colAction);

    li.appendChild(row);
    todoList.appendChild(li);
  });
  initTooltips();
  renderStats();
  saveToStorage(items); // зберігаємо щоразу після рендеру
}

function renderStats() {
  statsNotBought.innerHTML = '';
  statsBought.innerHTML = '';

  items.forEach(item => {
    const badgeWrap = document.createElement('span');
    badgeWrap.className = 'badge bg-secondary text-dark me-1';
    const nameNode = document.createTextNode(item.name + ' ');
    const qtyBadge = document.createElement('span');
    qtyBadge.className = 'badge bg-warning text-dark';
    qtyBadge.textContent = item.quantity;

    badgeWrap.appendChild(nameNode);
    badgeWrap.appendChild(qtyBadge);

    if (item.purchased) {
      statsBought.appendChild(badgeWrap);
    } else {
      statsNotBought.appendChild(badgeWrap);
    }
  });
}

function changeQuantity(id, delta) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return;
  items[idx].quantity += delta;
  if (items[idx].quantity < 1) items[idx].quantity = 1;
  renderList();
}

function togglePurchased(id) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return;
  items[idx].purchased = !items[idx].purchased;
  renderList();
}

function deleteItem(id) {
  items = items.filter(i => i.id !== id);
  renderList();
}

function startNameEdit(id) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return;
  const li = todoList.children[idx];
  const colName = li.querySelector('.col-5');
  const span = colName.querySelector('.item-name');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = items[idx].name;
  input.className = 'form-control form-control-sm';
  colName.innerHTML = '';
  colName.appendChild(input);
  input.focus();
  input.addEventListener('blur', () => {
    finishNameEdit(id, input.value);
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      input.blur();
    }
  });
}

function finishNameEdit(id, newName) {
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return;
  items[idx].name = newName.trim() || items[idx].name;
  renderList();
}

function addItem() {
  const name = newItemInput.value.trim();
  if (!name) return;
  items.push({ id: nextId++, name: name, quantity: 1, purchased: false });
  newItemInput.value = '';
  newItemInput.focus();
  renderList();
}

function initTooltips() {
  document.querySelectorAll('[data-bs-toggle="tooltip"], [data-tooltip]').forEach(el => {
    el.setAttribute('data-bs-toggle', 'tooltip');
  });
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new bootstrap.Tooltip(el, {
      title: el.getAttribute('data-tooltip'),
      placement: 'top',
      trigger: 'hover',
      customClass: 'tooltip-violet'
    });
  });
}

addBtn.addEventListener('click', addItem);
newItemInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addItem();
  }
});

// Початкове рендерування
renderList();
