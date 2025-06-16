/* Сброс базовых отступов и box-sizing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: system-ui, sans-serif;
  background: #f9f5f0;
  color: #333;
  line-height: 1.4;
}

/* Header */
.site-header {
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 1.25rem;
  font-weight: bold;
}

/* Кнопки */
.btn {
  background: #2a9d8f;
  color: #fff;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.btn:hover {
  background: #21867a;
}

/* Мобільні контроли (Filter / Sort) – приховані на десктопі */
.mobile-controls {
  display: none;
  gap: 0.5rem;
}
.filter-toggle, .sort-toggle {
  font-weight: 500;
}

/* Layout */
.main-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 1rem auto;
  gap: 1rem;
}
/* Sidebar */
.sidebar {
  width: 250px;
  background: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.sidebar h2 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.filter-group {
  margin-bottom: 1rem;
}
.filter-group h3 {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}
.filter-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}
.filter-group input[type="text"] {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

/* Content */
.content {
  flex: 1;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.section-header h2 {
  font-size: 1.3rem;
}
.sort-desktop {
  font-size: 0.9rem;
}
.sort-desktop select {
  padding: 0.3rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

/* Сетка книг */
.book-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}
.book-card {
  background: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.book-card img {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}
.book-card h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}
.book-card p {
  font-size: 0.85rem;
  color: #666;
}

/* ==== Адаптивність ==== */
@media (max-width: 900px) {
  .main-wrapper {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
  .sort-desktop {
    display: none;
  }
}

@media (max-width: 600px) {
  /* header */
  .mobile-controls {
    display: flex;
  }
  .sign-in {
    display: none;
  }

  /* sidebar сховати */
  .sidebar {
    display: none;
  }

  /* книга в одну колонку */
  .book-grid {
    grid-template-columns: 1fr;
  }
}
