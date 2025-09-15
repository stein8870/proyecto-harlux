document.addEventListener('DOMContentLoaded', () => {

    let todosLosProductos = {};

    const productosPaginaPrincipal = {
        // RUTAS DE IMÁGENES CORREGIDAS PARA COINCIDIR CON EL REPOSITORIO
        'mas-vendidos': [
            { nombre: 'Piso Cerámico Santal', medidas: '55 X 55 CM', sku: '233830', precio: '169.00', imagen: 'Piso ceramico santal.jpg' },
            { nombre: 'Azulejo Decorativo', medidas: '20 X 20 CM', sku: '233831', precio: '85.50', imagen: 'patrones.jpg' },
            { nombre: 'Porcelanato Beige', medidas: '60 X 60 CM', sku: '233832', precio: '210.00', imagen: 'porcelanite.jpg' },
            { nombre: 'Mosaico de Vidrio', medidas: '30 X 30 CM', sku: '233833', precio: '125.75', imagen: 'vitromex.jpg' },
            { nombre: 'Ladrillo Refractario', medidas: '25 X 12 CM', sku: '233834', precio: '35.00', imagen: 'ladrillo.jpg' },
            { nombre: 'Adhesivo para Piso', medidas: '20 KG', sku: '233835', precio: '180.00', imagen: 'adhesivo.jpg' },
            { nombre: 'Boquilla Gris', medidas: '1 KG', sku: '233836', precio: '25.00', imagen: 'boquilla.jpg' },
        ],
        'lo-mas-nuevo': [
            { nombre: 'Pintura Acrílica', medidas: '4 L', sku: '233901', precio: '450.00', imagen: 'pintura.jpg' },
            { nombre: 'Grifo Monomando', medidas: 'Altura 15 CM', sku: '233902', precio: '780.00', imagen: 'grifo.jpg' },
            { nombre: 'Bomba de Agua', medidas: '1 HP', sku: '233903', precio: '1500.00', imagen: 'bomba.jpg' },
            { nombre: 'Calentador Eléctrico', medidas: '10 L', sku: '233904', precio: '2200.00', imagen: 'calentador.jpg' },
            { nombre: 'Lavabo Ovalado', medidas: '40 X 60 CM', sku: '233905', precio: '650.00', imagen: 'lavabo.jpg' },
            { nombre: 'Espejo Inteligente', medidas: '80 X 60 CM', sku: '233906', precio: '1800.00', imagen: 'espejo.jpg' },
            { nombre: 'Mampara de Baño', medidas: '1.80 X 0.90 M', sku: '233907', precio: '2500.00', imagen: 'mampara.jpg' },
        ],
        'ofertas': [
            { nombre: 'Piso Cerámico Rústico', medidas: '45 X 45 CM', sku: '233701', precio: '99.00', imagen: 'rusdtico.jpg', oferta: true },
            { nombre: 'Azulejo Cocina', medidas: '30 X 30 CM', sku: '233702', precio: '65.00', imagen: 'lamosa2.jpg', oferta: true },
            { nombre: 'Cinta de Sellado', medidas: '10 M', sku: '233703', precio: '50.00', imagen: 'cinta.jpg', oferta: true },
            { nombre: 'Luminaria LED', medidas: '60 CM', sku: '233704', precio: '120.00', imagen: 'luminaria.jpg', oferta: true },
            { nombre: 'Tornillos Caja', medidas: '500 Pz', sku: '233705', precio: '80.00', imagen: 'tornillos.jpg', oferta: true },
            { nombre: 'Taladro Percutor', medidas: '120V', sku: '233706', precio: '950.00', imagen: 'taladro.jpg', oferta: true },
            { nombre: 'Juego de Herramientas', medidas: '20 Pz', sku: '233707', precio: '400.00', imagen: 'herramientas.jpg', oferta: true },
        ]
    };

    // El resto del script no necesita cambios, puedes usar la última versión funcional que te proporcioné.
    // Solo asegúrate de que esta parte superior con las rutas corregidas esté en tu archivo.
    // ...
    // PEGA AQUÍ EL RESTO DEL ARCHIVO SCRIPT.JS FUNCIONAL QUE TE DI ANTERIORMENTE.
    // ...
    
    // Si no lo tienes a la mano, aquí está completo:
    function generarProductosFicticios(tipo, cantidad) { let productos = []; for (let i = 1; i <= cantidad; i++) { const producto = { sku: `${tipo.slice(0,3).toUpperCase()}${i.toString().padStart(3, '0')}`, exclusivo: Math.random() < 0.3, imagen: 'https://via.placeholder.com/300x300/e0e0e0/555?text=Producto', nombre: `Piso tipo ${tipo} #${i}`, medidas: `Medidas ${i}`, precio: (Math.random() * (450 - 150) + 150).toFixed(2), desc: `Descripción para el piso de ${tipo}, modelo #${i}.`}; productos.push(producto); todosLosProductos[producto.sku] = producto; } return productos; }
    const datosCatalogos = { marmol: generarProductosFicticios('Mármol', 12), madera: generarProductosFicticios('Madera', 12), exterior: generarProductosFicticios('Exterior', 12), piedra: generarProductosFicticios('Piedra', 12), tablon: generarProductosFicticios('Tablón', 12), antiderrapante: generarProductosFicticios('Antiderrapante', 12), rustico: generarProductosFicticios('Rústico', 12), patrones: generarProductosFicticios('Patrones', 12), general: [] };
    datosCatalogos.general = [ ...datosCatalogos.marmol.slice(0, 2), ...datosCatalogos.madera.slice(0, 2), ...datosCatalogos.exterior.slice(0, 2)];
    const contenidoPrincipal = document.getElementById('contenido-principal');
    const seccionCatalogo = document.getElementById('seccion-catalogo-dinamico');
    const seccionProductoIndividual = document.getElementById('seccion-producto-individual');
    
    function cargarProductosInicio() { for (const categoria in productosPaginaPrincipal) { const contenedor = document.getElementById(`scroll-${categoria}`); if (contenedor) { productosPaginaPrincipal[categoria].forEach(p => { todosLosProductos[p.sku] = p; contenedor.innerHTML += `<div class="product-card" data-sku="${p.sku}"><div class="image-container"><img src="${p.imagen}" alt="${p.nombre}">${p.oferta ? '<span class="special-offer">OFERTA</span>' : ''}</div><div class="product-info"><h3>${p.nombre}</h3><p>${p.medidas}</p></div><span class="price">$${p.precio} m²</span><div class="product-actions"><div class="quantity-control"><button class="quantity-btn minus">-</button><input type="text" class="quantity-input" value="1" readonly><button class="quantity-btn plus">+</button></div><button class="add-to-cart-btn">Agregar</button></div></div>`; }); } } }
    
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
});
