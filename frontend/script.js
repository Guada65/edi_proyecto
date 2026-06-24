const colores_cat = {
    inicio: '#866F9A', 
    historia: '#FFE683',
    geografia: '#94B9FF', 
    uva: '#BF86D2',
    cultura: '#E57070',
    naturaleza: '#9FC97B',
    lugares: '#FBA925'
};

class HeaderMendoza extends HTMLElement {
    connectedCallback() {
        const categoria = this.getAttribute('categoria') || 'inicio' ;

        const colorFondo = colores_cat [categoria] || colores_cat.inicio;

        this.style.setProperty('--color-base', colorFondo);

        this.innerHTML = `
            <header class="encabezado-sitio">
                <h1 class="titulo-principal">Mendoza</h1>
            </header>
        `;
    }
}
customElements.define('header-mendoza', HeaderMendoza);

class MenuPrincipal extends HTMLElement {
    connectedCallback() {
        const base = window.location.pathname.includes('/pages/')
        ? '../'
        : '';
        this.innerHTML = `
            <div class="botones-contenedor">
                <a href="${base}pages/historia.html"><button class="historia">Historia</button></a>
                <a href="${base}pages/geografia.html"><button class="geografia">Geografía</button></a>
                <a href="${base}pages/uva.html"><button class="uva">La Uva</button></a>
                <a href="${base}pages/cultura.html"><button class="cultura">Cultura</button></a>
                <a href="${base}pages/naturaleza.html"><button class="naturaleza">Naturaleza</button></a>
                <a href="${base}pages/lugares.html"><button class="lugares">Lugares Famosos</button></a>
            </div>
        `;
        this.marcarActivo(); 
    }
    marcarActivo() {
    const pagina = window.location.pathname; 
    const botones = this.querySelectorAll('button');
    botones.forEach(boton => {
      const link = boton.parentElement.getAttribute('href');
      if (pagina.endsWith(link)) {
        boton.classList.add('active');
      }
    });
  }
}
customElements.define('menu-mendoza', MenuPrincipal);

class BannerMendoza extends HTMLElement {
    connectedCallback() {
        const categoria = this.getAttribute('categoria') || 'inicio'
        const infoBanners = {
            inicio: {
                frase: '¡Hacé clic y comenzá a descubrir Mendoza!',
                colorInicio: '#C6BAD0',
                colorFin: '#B59CCC'
            }, 
            historia: {
                frase: '¿Listo para ir al pasado? ¡Explorá la antigua Mendoza!',
                colorInicio: '#FEE583',
                colorFin: '#E0C146'
            },
            geografia: {
                frase: '¡Mirá lo grande que es Mendoza!',
                colorInicio: '#C0D6FF',
                colorFin: '#A2C1FB'
            },
             uva: {
                frase: '¡Qué capa que es Mendoza!',
                colorInicio: '#E0BDEB',
                colorFin: '#BF86D2'
            },
            cultura: {
                frase: 'Mansas tradiciones, ¡Manso todo!',
                colorInicio: '#E2AFAF',
                colorFin: '#D97B7B'
            },
            naturaleza: {
                frase: '¡Mirá la provincia más linda del país!',
                colorInicio: '#C4E6A6',
                colorFin: '#A8D77F'
            },
            lugares: {
                frase: '¡Lo más destacado de nuestra provincia!',
                colorInicio: '#E9D3B1',
                colorFin: '#F6B345'
            },

        }
        const estilo = infoBanners[categoria] || infoBanners.inicio ; 
       document.documentElement.style.setProperty('--gradien-inicio', estilo.colorInicio);
       document.documentElement.style.setProperty('--gradien-fin', estilo.colorFin);

        this.innerHTML = `
            <div class="banner">
                <p class="banner-texto">${estilo.frase}</p>
            </div>
        `;
    }
}
    customElements.define('banner-mendoza', BannerMendoza);


class Tarjeta { 
    constructor(id, categoria_id, titulo, texto, imagen, degradado, posicion) {
        this.id = id;
        this.categoria_id = categoria_id;
        this.titulo = titulo;
        this.texto = texto;
        this.imagen = imagen;
        this.degradado = degradado;
        this.posicion = posicion; 
    }
    crear() {
        return `
        <div class="tarjeta-info">
            <div class="tarjeta-header" style="background: ${this.degradado};">
                <h2>${this.titulo}</h2>
            </div>
            <div class="tarjeta-body ${this.posicion}">
                <p>${this.texto}</p>
                <img src="http://localhost:3000/images/${this.imagen}" class="img-tarjeta">
            </div>
        </div>`;
    }
}

class ServicioApi {
    static BD_URL = 'http://localhost:3000/api'; 
    static async obtenerContenido(catId) { 
        try {
            const respuesta = await fetch(`${this.BD_URL}/contenido/${catId}`); 
            const datos = await respuesta.json();
            return datos.map(d => new Tarjeta(
                d.id, d.categoria_id, d.titulo, d.texto_largo, d.imagen_url, d.degradado_css, d.posicion
            )); 
        } catch (error) {
            console.error('Error:', error);
            return []; 
        }
    } 
}

class FooterMendoza extends HTMLElement {
    connectedCallback () {
        const categoria = this.getAttribute('categoria') || 'inicio' ;

        const colorFondo = colores_cat [categoria] || colores_cat.inicio;

        this.style.setProperty('--color-base', colorFondo);

        this.innerHTML = `
            <footer class="footer-sitio">
                <p>¡Seguí explorando mendoza!</p>
                <a href="../index.html" class="btn-inicio">IR AL INICIO →</a>
            </footer>
        `;

        
    }
}

customElements.define('footer-mendoza', FooterMendoza);
