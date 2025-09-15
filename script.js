document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. BASE DE DATOS DE PRODUCTOS Y DATOS
    // =========================================================================
    let todosLosProductos = {};

    const productosPaginaPrincipal = {
        'mas-vendidos': [
            { nombre: 'Piso Cerámico Santal', medidas: '55 X 55 CM', sku: '233830', precio: '169.00', imagen: '/Imagen/ImagenProductos/Piso ceramico santal.jpg' },
            { nombre: 'Azulejo Decorativo', medidas: '20 X 20 CM', sku: '233831', precio: '85.50', imagen: '/Imagen/ImagenProductos/patrones.jpg' },
            { nombre: 'Porcelanato Beige', medidas: '60 X 60 CM', sku: '233832', precio: '210.00', imagen: '/Imagen/Pisosceramicos/porcelanite.jpg' },
            { nombre: 'Mosaico de Vidrio', medidas: '30 X 30 CM', sku: '233833', precio: '125.75', imagen: '/Imagen/Pisosceramicos/vitromex.jpg' },
            { nombre: 'Ladrillo Refractario', medidas: '25 X 12 CM', sku: '233834', precio: '35.00', imagen: '/Imagen/Pisosceramicos/ladrillo.jpg' },
            { nombre: 'Adhesivo para Piso', medidas: '20 KG', sku: '233835', precio: '180.00', imagen: '/Imagen/Pisosceramicos/adhesivo.jpg' },
            { nombre: 'Boquilla Gris', medidas: '1 KG', sku: '233836', precio: '25.00', imagen: '/Imagen/Pisosceramicos/boquilla.jpg' },
        ],
        'lo-mas-nuevo': [
            { nombre: 'Pintura Acrílica', medidas: '4 L', sku: '233901', precio: '450.00', imagen: '/Imagen/imgseccion2/pintura.jpg' },
            { nombre: 'Grifo Monomando', medidas: 'Altura 15 CM', sku: '233902', precio: '780.00', imagen: '/Imagen/imgseccion2/grifo.jpg' },
            { nombre: 'Bomba de Agua', medidas: '1 HP', sku: '233903', precio: '1500.00', imagen: '/Imagen/imgseccion2/bomba.jpg' },
            { nombre: 'Calentador Eléctrico', medidas: '10 L', sku: '233904', precio: '2200.00', imagen: '/Imagen/Pisosceramicos/calentador.jpg' },
            { nombre: 'Lavabo Ovalado', medidas: '40 X 60 CM', sku: '233905', precio: '650.00', imagen: '/Imagen/Pisosceramicos/lavabo.jpg' },
            { nombre: 'Espejo Inteligente', medidas: '80 X 60 CM', sku: '233906', precio: '1800.00', imagen: '/Imagen/Pisosceramicos/espejo.jpg' },
            { nombre: 'Mampara de Baño', medidas: '1.80 X 0.90 M', sku: '233907', precio: '2500.00', imagen: '/Imagen/Pisosceramicos/mampara.jpg' },
        ],
        'ofertas': [
            { nombre: 'Piso Cerámico Rústico', medidas: '45 X 45 CM', sku: '233701', precio: '99.00', imagen: '/Imagen/ImagenProductos/rusdtico.jpg', oferta: true },
            { nombre: 'Azulejo Cocina', medidas: '30 X 30 CM', sku: '233702', precio: '65.00', imagen: '/Imagen/Pisosceramicos/lamosa2.jpg', oferta: true },
            { nombre: 'Cinta de Sellado', medidas: '10 M', sku: '233703', precio: '50.00', imagen: '/Imagen/imgseccion2/cinta.jpg', oferta: true },
            { nombre: 'Luminaria LED', medidas: '60 CM', sku: '233704', precio: '120.00', imagen: '/Imagen/Pisosceramicos/luminaria.jpg', oferta: true },
            { nombre: 'Tornillos Caja', medidas: '500 Pz', sku: '233705', precio: '80.00', imagen: '/Imagen/Pisosceramicos/tornillos.jpg', oferta: true },
            { nombre: 'Taladro Percutor', medidas: '120V', sku: '233706', precio: '950.00', imagen: '/Imagen/Pisosceramicos/taladro.jpg', oferta: true },
            { nombre: 'Juego de Herramientas', medidas: '20 Pz', sku: '233707', precio: '400.00', imagen: '/Imagen/Pisosceramicos/herramientas.jpg', oferta: true },
        ]
    };

    function generarProductosFicticios(tipo, cantidad) {
        let productos = [];
        for (let i = 1; i <= cantidad; i++) {
            const producto = {
                sku: `${tipo.slice(0,3).toUpperCase()}${i.toString().padStart(3, '0')}`,
                exclusivo: Math.random() < 0.3,
                imagen: 'https://via.placeholder.com/300x300/e0e0e0/555?text=Producto',
                nombre: `Piso tipo ${tipo} #${i}`,
                medidas: `Medidas ${i}`,
                precio: (Math.random() * (450 - 150) + 150).toFixed(2),
                desc: `Descripción para el piso de ${tipo}, modelo #${i}. Ideal para cualquier espacio.`
            };
            productos.push(producto);
            todosLosProductos[producto.sku] = producto;
        }
        return productos;
    }

    const datosCatalogos = {
        marmol: generarProductosFicticios('Mármol', 12),
        madera: generarProductosFicticios('Madera', 12),
        exterior: generarProductosFicticios('Exterior', 12),
        piedra: generarProductosFicticios('Piedra', 12),
        tablon: generarProductosFicticios('Tablón', 12),
        antiderrapante: generarProductosFicticios('Antiderrapante', 12),
        rustico: generarProductosFicticios('Rústico', 12),
        patrones: generarProductosFicticios('Patrones', 12),
    };
    datosCatalogos.general = [ ...datosCatalogos.marmol.slice(0, 2), ...datosCatalogos.madera.slice(0, 2), ...datosCatalogos.exterior.slice(0, 2), ...datosCatalogos.piedra.slice(0, 2), ...datosCatalogos.rustico.slice(0, 2), ...datosCatalogos.patrones.slice(0, 2) ];

    // =========================================================================
    // 2. LÓGICA DE LA PÁGINA PRINCIPAL Y CATÁLOGO
    // =========================================================================
    const contenidoPrincipal = document.getElementById('contenido-principal');
    const seccionCatalogo = document.getElementById('seccion-catalogo-dinamico');
    const seccionProductoIndividual = document.getElementById('seccion-producto-individual');

    function cargarProductosInicio() {
        for (const categoria in productosPaginaPrincipal) {
            const contenedor = document.getElementById(`scroll-${categoria}`);
            if (contenedor) {
                productosPaginaPrincipal[categoria].forEach(producto => {
                    todosLosProductos[producto.sku] = producto; // <-- Almacenar en la base de datos
                    const productCardHTML = `
                        <div class="product-card" data-sku="${producto.sku}">
                            <div class="image-container">
                                <img src="${producto.imagen}" alt="${producto.nombre}">
                                ${producto.oferta ? '<span class="special-offer">COMPRA ESPECIAL</span>' : ''}
                            </div>
                            <div class="product-info">
                                <h3>${producto.nombre}</h3><p>${producto.medidas}</p><p class="sku">SKU ${producto.sku}</p>
                            </div>
                            <span class="price">$${producto.precio} m²</span>
                            <div class="product-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn minus">-</button>
                                    <input type="number" class="quantity-input" value="1" min="1" readonly>
                                    <button class="quantity-btn plus">+</button>
                                </div>
                                <button class="add-to-cart-btn">Agregar</button>
                            </div>
                        </div>`;
                    contenedor.innerHTML += productCardHTML;
                });
            }
        }
    }
    
    // -- Lógica general de popups, menú, etc. --
    const popupOverlay = document.getElementById('popup-overlay');
    const registerBtn = document.getElementById('register-btn');
    const registerPopup = document.getElementById('register-popup');
    const loginPopup = document.getElementById('login-popup');
    const showLoginBtn = document.getElementById('show-login-btn');
    const closeBtns = document.querySelectorAll('.close-btn');
    registerBtn?.addEventListener('click', () => { popupOverlay.style.display = 'flex'; registerPopup.style.display = 'block'; loginPopup.style.display = 'none'; });
    showLoginBtn?.addEventListener('click', () => { registerPopup.style.display = 'none'; loginPopup.style.display = 'block'; });
    const closeAllPopups = () => { popupOverlay.style.display = 'none'; };
    closeBtns.forEach(btn => btn.addEventListener('click', closeAllPopups));
    popupOverlay?.addEventListener('click', (e) => { if (e.target === popupOverlay) closeAllPopups(); });

    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    menuToggle?.addEventListener('click', (e) => { e.stopPropagation(); sideMenu.classList.toggle('open'); });
    document.addEventListener('click', (e) => { if (sideMenu.classList.contains('open') && !sideMenu.contains(e.target) && !menuToggle.contains(e.target)) sideMenu.classList.remove('open'); });

    // -- Lógica de navegación entre secciones --
    const mostrarPaginaPrincipal = () => {
        seccionCatalogo.classList.add('hidden');
        seccionProductoIndividual.classList.add('hidden');
        contenidoPrincipal.classList.remove('hidden');
    };
    
    document.querySelector('.logo a')?.addEventListener('click', (e) => { e.preventDefault(); mostrarPaginaPrincipal(); });
    document.querySelectorAll('.secondary-bar .nav-links a').forEach(b => {
        b.addEventListener('click', (e) => {
            if (b.getAttribute('href').startsWith('#')) {
                mostrarPaginaPrincipal();
            }
        });
    });

    // -- Lógica del Catálogo Dinámico --
    const gridProductosCatalogo = document.getElementById('catalogo-grid');
    const tituloCatalogo = document.getElementById('catalogo-titulo');
    const contadorProductosCatalogo = document.getElementById('catalogo-contador');
    const filtrosContainer = document.getElementById('filtros-container');

    const crearTarjetaHTML_Catalogo = (producto) => {
        const exclusivoTag = producto.exclusivo ? '<p class="exclusivo">Exclusivo en línea</p>' : '';
        return `
            <div class="producto-card" data-sku="${producto.sku}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info-producto">
                    ${exclusivoTag}
                    <h3>${producto.nombre}</h3>
                    <p class="descripcion-corta">${producto.desc}</p>
                    <p class="precio">$${producto.precio} <span>/ m2</span></p>
                </div>
                <div class="acciones-producto">
                    <div class="contador-cantidad">
                        <button class="restar">-</button><input type="text" value="1" class="cantidad" readonly><button class="sumar">+</button>
                    </div>
                    <button class="boton-agregar">Agregar</button>
                </div>
            </div>`;
    };

    const poblarCatalogo = (productos, titulo) => {
        gridProductosCatalogo.innerHTML = '';
        productos.forEach(p => { gridProductosCatalogo.innerHTML += crearTarjetaHTML_Catalogo(p); });
        tituloCatalogo.textContent = titulo;
        contadorProductosCatalogo.textContent = `${productos.length} productos`;
        filtrosContainer.innerHTML = `<div class="filtro-seccion"><h3>Marca</h3><label><input type="checkbox"> DALTILE</label><label><input type="checkbox"> LAMOSA</label></div><div class="filtro-seccion"><h3>Acabado</h3><label><input type="checkbox"> Brillante</label><label><input type="checkbox"> Mate</label></div>`;
    };

    const mostrarCatalogo = () => {
        contenidoPrincipal.classList.add('hidden');
        seccionProductoIndividual.classList.add('hidden');
        seccionCatalogo.classList.remove('hidden');
        window.scrollTo(0, 0);
    };

    document.querySelector('.side-menu a[href="#catalogo"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        poblarCatalogo(datosCatalogos.general, 'Catálogo General');
        mostrarCatalogo();
        sideMenu.classList.remove('open');
    });

    document.querySelectorAll('.estilo-card').forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const estilo = boton.dataset.estilo;
            const titulo = boton.querySelector('.estilo-nombre').innerText.replace(' >', '');
            poblarCatalogo(datosCatalogos[estilo] || [], `Pisos ${titulo}`);
            mostrarCatalogo();
        });
    });

    // =========================================================================
    // 3. LÓGICA DE LA NUEVA SECCIÓN DE PRODUCTO INDIVIDUAL
    // =========================================================================
    
    function inicializarLogicaProductoIndividual() {
        const decrementBtn = seccionProductoIndividual.querySelector('#decrement-btn');
        const incrementBtn = seccionProductoIndividual.querySelector('#increment-btn');
        const quantityInput = seccionProductoIndividual.querySelector('#quantity');
        const calculatorBtn = seccionProductoIndividual.querySelector('#calculator-btn');
        const calculatorPopup = seccionProductoIndividual.querySelector('#calculator-popup');
        const closeCalculatorBtn = seccionProductoIndividual.querySelector('.close-popup-btn'); // <-- NUEVO: Selector del botón de cierre
        const applyBtn = seccionProductoIndividual.querySelector('#apply-quantity-btn');
        const lengthInput = seccionProductoIndividual.querySelector('#length');
        const widthInput = seccionProductoIndividual.querySelector('#width');
        const estimatedResult = seccionProductoIndividual.querySelector('#estimated-result');
        const starIcons = seccionProductoIndividual.querySelectorAll('.rating-stars-interactive .star-icon');
        const decrementBundleBtns = seccionProductoIndividual.querySelectorAll('.decrement-bundle-btn');
        const incrementBundleBtns = seccionProductoIndividual.querySelectorAll('.increment-bundle-btn');
        const bundleQuantityInputs = seccionProductoIndividual.querySelectorAll('.bundle-quantity-input');
        const bundleTotalPrice = seccionProductoIndividual.querySelector('#bundle-total-price');

        // --- Lógica del Contador de Cantidad Principal ---
        decrementBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) { quantityInput.value = currentValue - 1; }
        });
        incrementBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });

        // --- Lógica de la Calculadora de Material (MODIFICADA) ---
        const resetYcerrarCalculadora = () => {
            lengthInput.value = '';
            widthInput.value = '';
            estimatedResult.innerHTML = ''; // Limpiar el resultado
            calculatorPopup.style.display = 'none';
        };

        calculatorBtn.addEventListener('click', () => { calculatorPopup.style.display = 'flex'; });
        closeCalculatorBtn.addEventListener('click', resetYcerrarCalculadora); // <-- NUEVO: Evento para el botón de cierre

        window.addEventListener('click', (event) => {
            if (event.target === calculatorPopup) {
                resetYcerrarCalculadora(); // <-- MODIFICADO: Llama a la función de reinicio
            }
        });

        applyBtn.addEventListener('click', () => {
            const length = parseFloat(lengthInput.value);
            const width = parseFloat(widthInput.value);
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
                estimatedResult.textContent = 'Por favor, ingresa un largo y un ancho válidos.';
                return;
            }
            const areaPerBox = 1.36; const pricePerBox = 270.04;
            const totalArea = length * width;
            const boxesNeeded = Math.ceil(totalArea / areaPerBox);
            const totalCost = (boxesNeeded * pricePerBox).toFixed(2);
            estimatedResult.innerHTML = `Para un área de ${totalArea.toFixed(2)} m², necesitas <span style="font-weight:bold">${boxesNeeded} cajas.</span><br>Costo total estimado: <span style="font-weight:bold">$${totalCost}</span>`;
        });
        
        // --- Lógica de la Sección de Paquete de Oferta ---
        const bundlePrices = { product1: 270.04, product2: 265.00, product3: 207.00 };
        const updateBundleTotal = () => {
            let total = 0;
            bundleQuantityInputs.forEach(input => {
                const id = input.dataset.id;
                const quantity = parseInt(input.value);
                total += bundlePrices[id] * quantity;
            });
            bundleTotalPrice.textContent = `$${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
        };
        incrementBundleBtns.forEach(button => {
            button.addEventListener('click', () => {
                const input = seccionProductoIndividual.querySelector(`.bundle-quantity-input[data-id="${button.dataset.id}"]`);
                input.value = parseInt(input.value) + 1;
                updateBundleTotal();
            });
        });
        decrementBundleBtns.forEach(button => {
            button.addEventListener('click', () => {
                const input = seccionProductoIndividual.querySelector(`.bundle-quantity-input[data-id="${button.dataset.id}"]`);
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                    updateBundleTotal();
                }
            });
        });
        updateBundleTotal();
        
        // --- Lógica de Calificación de Estrellas ---
        starIcons.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = star.dataset.value;
                starIcons.forEach(s => { s.classList[s.dataset.value <= value ? 'add' : 'remove']('active'); });
            });
            star.addEventListener('mouseout', () => {
                if (!seccionProductoIndividual.querySelector('.rating-stars-interactive .star-icon.clicked')) {
                    starIcons.forEach(s => s.classList.remove('active'));
                }
            });
            star.addEventListener('click', () => {
                const value = star.dataset.value;
                starIcons.forEach(s => s.classList.remove('clicked', 'active'));
                starIcons.forEach(s => {
                    if (s.dataset.value <= value) { s.classList.add('clicked', 'active'); }
                });
            });
        });
    }

    function mostrarProductoIndividual(sku) {
        const producto = todosLosProductos[sku];
        if (!producto) {
            console.error("Producto no encontrado con SKU:", sku);
            return;
        }

        // Poblar datos
        seccionProductoIndividual.querySelector('.product-title').textContent = `${producto.nombre} ${producto.medidas || ''}`;
        seccionProductoIndividual.querySelector('.product-model').innerHTML = `Modelo ${sku} <span class="sku">SKU ${sku}</span>`;
        seccionProductoIndividual.querySelector('.price-per-m2').innerHTML = `$${producto.precio} <span>m²</span>`;
        seccionProductoIndividual.querySelector('.main-image-placeholder img').src = producto.imagen;
        seccionProductoIndividual.querySelector('.main-image-placeholder img').alt = producto.nombre;
        
        // Mostrar la sección correcta
        contenidoPrincipal.classList.add('hidden');
        seccionCatalogo.classList.add('hidden');
        seccionProductoIndividual.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    
    // =========================================================================
    // 4. MANEJADORES DE EVENTOS GLOBALES Y DE PRODUCTOS
    // =========================================================================
    
    function handleProductClick(event) {
        // Ignorar clics en botones de acción
        if (event.target.closest('.add-to-cart-btn, .boton-agregar, .quantity-control, .contador-cantidad')) {
            return;
        }

        const card = event.target.closest('.product-card, .producto-card');
        if (card && card.dataset.sku) {
            mostrarProductoIndividual(card.dataset.sku);
        }
    }

    document.querySelectorAll('.product-scroll').forEach(scroll => {
        scroll.addEventListener('click', (e) => {
            // Lógica de botones
            if (e.target.classList.contains('quantity-btn')) {
                const input = e.target.parentElement.querySelector('.quantity-input');
                let val = parseInt(input.value);
                if (e.target.classList.contains('plus')) val++;
                else if (e.target.classList.contains('minus') && val > 1) val--;
                input.value = val;
            } else if (e.target.classList.contains('add-to-cart-btn')) {
                const card = e.target.closest('.product-card');
                alert(`Producto "${card.querySelector('h3').textContent}" agregado.`);
            } else {
                // Si no es un botón, es un clic en la tarjeta
                handleProductClick(e);
            }
        });

        // Scroll automático
        let isHovering = false;
        scroll.addEventListener('mouseenter', () => isHovering = true);
        scroll.addEventListener('mouseleave', () => isHovering = false);
        setInterval(() => {
            if (!isHovering) {
                if (scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1) {
                    scroll.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll.scrollBy({ left: 295, behavior: 'smooth' });
                }
            }
        }, 3000);
    });
    
    seccionCatalogo.addEventListener('click', (e) => {
         if (e.target.matches('.restar, .sumar')) {
            const input = e.target.parentElement.querySelector('.cantidad');
            let val = parseInt(input.value);
            if(e.target.matches('.sumar')) val++;
            else if(val > 1) val--;
            input.value = val;
        } else if (e.target.matches('.boton-agregar')) {
            alert(`Producto agregado desde el catálogo.`);
        } else {
            handleProductClick(e);
        }
    });

    // =========================================================================
    // 5. INICIALIZACIÓN
    // =========================================================================
    cargarProductosInicio();
    inicializarLogicaProductoIndividual();
});
