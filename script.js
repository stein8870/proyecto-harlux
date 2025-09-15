// Espera a que todo el contenido del HTML se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS FICTICIOS DE PRODUCTOS ---
    const productos = {
        'mas-vendidos': [
            { nombre: 'Piso Cerámico Santal', medidas: '55 X 55 CM', sku: '233830', precio: '169.00', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Piso+Santal' },
            { nombre: 'Azulejo Decorativo', medidas: '20 X 20 CM', sku: '233831', precio: '85.50', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Azulejo+Deco' },
            { nombre: 'Porcelanato Beige', medidas: '60 X 60 CM', sku: '233832', precio: '210.00', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Porcelanato' },
            { nombre: 'Mosaico de Vidrio', medidas: '30 X 30 CM', sku: '233833', precio: '125.75', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Mosaico' },
            { nombre: 'Ladrillo Refractario', medidas: '25 X 12 CM', sku: '233834', precio: '35.00', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Ladrillo' },
            { nombre: 'Adhesivo para Piso', medidas: '20 KG', sku: '233835', precio: '180.00', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Adhesivo' },
            { nombre: 'Boquilla Gris', medidas: '1 KG', sku: '233836', precio: '25.00', imagen: 'https://via.placeholder.com/300x300/e8e8e8/000?text=Boquilla' },
        ],
        'lo-mas-nuevo': [
            { nombre: 'Pintura Acrílica', medidas: '4 L', sku: '233901', precio: '450.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Pintura' },
            { nombre: 'Grifo Monomando', medidas: 'Altura 15 CM', sku: '233902', precio: '780.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Grifo' },
            { nombre: 'Bomba de Agua', medidas: '1 HP', sku: '233903', precio: '1500.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Bomba' },
            { nombre: 'Calentador Eléctrico', medidas: '10 L', sku: '233904', precio: '2200.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Calentador' },
            { nombre: 'Lavabo Ovalado', medidas: '40 X 60 CM', sku: '233905', precio: '650.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Lavabo' },
            { nombre: 'Espejo Inteligente', medidas: '80 X 60 CM', sku: '233906', precio: '1800.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Espejo' },
            { nombre: 'Mampara de Baño', medidas: '1.80 X 0.90 M', sku: '233907', precio: '2500.00', imagen: 'https://via.placeholder.com/300x300/dcdcdc/000?text=Mampara' },
        ],
        'ofertas': [
            { nombre: 'Piso Cerámico Rústico', medidas: '45 X 45 CM', sku: '233701', precio: '99.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Piso+Rustico', oferta: true },
            { nombre: 'Azulejo Cocina', medidas: '30 X 30 CM', sku: '233702', precio: '65.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Azulejo+Cocina', oferta: true },
            { nombre: 'Cinta de Sellado', medidas: '10 M', sku: '233703', precio: '50.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Cinta+Sellado', oferta: true },
            { nombre: 'Luminaria LED', medidas: '60 CM', sku: '233704', precio: '120.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Luminaria', oferta: true },
            { nombre: 'Tornillos Caja', medidas: '500 Pz', sku: '233705', precio: '80.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Tornillos', oferta: true },
            { nombre: 'Taladro Percutor', medidas: '120V', sku: '233706', precio: '950.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Taladro', oferta: true },
            { nombre: 'Juego de Herramientas', medidas: '20 Pz', sku: '233707', precio: '400.00', imagen: 'https://via.placeholder.com/300x300/f5f5f5/000?text=Herramientas', oferta: true },
        ]
    };

    // --- FUNCIÓN PARA GENERAR EL HTML DE LAS TARJETAS DE PRODUCTO ---
    const generarTarjetasDeProducto = () => {
        for (const categoria in productos) {
            const contenedor = document.getElementById(`scroll-${categoria}`);
            if (contenedor) {
                productos[categoria].forEach(producto => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.setAttribute('data-sku', producto.sku);

                    productCard.innerHTML = `
                        <div class="image-container">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            ${producto.oferta ? '<span class="special-offer">COMPRA ESPECIAL</span>' : ''}
                        </div>
                        <div class="product-info">
                            <h3>${producto.nombre}</h3>
                            <p class="medidas">${producto.medidas}</p>
                            <p class="sku">SKU ${producto.sku}</p>
                        </div>
                        <span class="price">$${producto.precio} m²</span>
                        <div class="product-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" class="quantity-input" value="1" min="1" max="99" readonly>
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart-btn">Agregar</button>
                        </div>
                    `;
                    contenedor.appendChild(productCard);
                });
            }
        }
    };

    // Llama a la función para generar las tarjetas al cargar la página
    generarTarjetasDeProducto();

    // --- MANEJO DE POPUPS (REGISTRO Y LOGIN) ---
    const popupOverlay = document.getElementById('popup-overlay');
    const registerBtn = document.getElementById('register-btn');
    const registerPopup = document.getElementById('register-popup');
    const loginPopup = document.getElementById('login-popup');
    const showLoginBtn = document.getElementById('show-login-btn');
    const closeBtns = document.querySelectorAll('.close-btn');

    registerBtn.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
        registerPopup.style.display = 'block';
        loginPopup.style.display = 'none';
    });

    showLoginBtn.addEventListener('click', () => {
        registerPopup.style.display = 'none';
        loginPopup.style.display = 'block';
    });

    const closeAllPopups = () => {
        popupOverlay.style.display = 'none';
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeAllPopups);
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closeAllPopups();
        }
    });


    // --- MANEJO DEL MENÚ LATERAL DESPLEGABLE ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
        const menu = document.getElementById('side-menu');
        const menuButton = document.getElementById('menu-toggle');

        if (menu.classList.contains('open') && !menuButton.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('open');
        }
    });

    // --- NUEVOS EVENTOS PARA MANEJAR LA CANTIDAD Y EL CARRITO ---
    document.querySelectorAll('.product-scroll').forEach(scrollSection => {
        scrollSection.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('quantity-btn')) {
                const productCard = target.closest('.product-card');
                const quantityInput = productCard.querySelector('.quantity-input');
                let quantity = parseInt(quantityInput.value);

                if (target.classList.contains('plus')) {
                    quantity++;
                } else if (target.classList.contains('minus')) {
                    quantity = quantity > 1 ? quantity - 1 : 1;
                }
                quantityInput.value = quantity;
            }

            if (target.classList.contains('add-to-cart-btn')) {
                const productCard = target.closest('.product-card');
                const sku = productCard.getAttribute('data-sku');
                const quantity = parseInt(productCard.querySelector('.quantity-input').value);
                const nombreProducto = productCard.querySelector('h3').textContent;

                // **SIMULACIÓN DE BASE DE DATOS / LÓGICA DE NEGOCIO**
                console.log(`Producto Agregado al Carrito:`);
                console.log(`- Nombre: ${nombreProducto}`);
                console.log(`- SKU: ${sku}`);
                console.log(`- Cantidad: ${quantity}`);
                alert(`¡Se han agregado ${quantity} unidad(es) de "${nombreProducto}" al carrito!`);
            }
        });
    });

    // --- SCROLL AUTOMÁTICO PARA PRODUCTOS (mantenido) ---
    const productScrolls = document.querySelectorAll('.product-scroll');

    productScrolls.forEach(scroll => {
        let isHovering = false;

        scroll.addEventListener('mouseenter', () => isHovering = true);
        scroll.addEventListener('mouseleave', () => isHovering = false);

        setInterval(() => {
            if (!isHovering) {
                if (scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth) {
                    scroll.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    scroll.scrollBy({
                        left: scroll.clientWidth,
                        behavior: 'smooth'
                    });
                }
            }
        }, 3000);
    });

});