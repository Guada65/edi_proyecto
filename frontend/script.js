//creación del header 
class HeaderMendoza extends HTMLElement {
    connectedCallback() {
        const categoria = this.getAttribute('categoria') || 'inicio' ;
        const colores = {
            inicio: '#433450', 
            historia: '#FFE683',
            geografia: '#94B9FF', 
            uva: '#BF86D2',
            cultura: '#E57070',
            naturaleza: '#9FC97B',
            lugares: '#FBA925'
        }
        const colorFondo = colores[categoria] || colores.inicio; 

        this.style.setProperty('--color-base', colorFondo);

        this.innerHTML = `
            <header class="encabezado-sitio">
                <h1 class="titulo-principal">Mendoza</h1>
            </header>
        `;
    }
}
customElements.define('header-mendoza', HeaderMendoza);

//creación del menú
class MenuPrincipal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="botones-contenedor">
                <a href="historia.html"><button class="historia">Historia</button></a>
                <a href="geografia.html"><button class="geografia">Geografía</button></a>
                <a href="uva.html"><button class="uva">La Uva</button></a>
                <a href="cultura.html"><button class="cultura">Cultura</button></a>
                <a href="naturaleza.html"><button class="naturaleza">Naturaleza</button></a>
                <a href="lugares.html"><button class="lugares">Lugares Famosos</button></a>
            </div>
        `;
        
    }
}
customElements.define('menu-mendoza', MenuPrincipal);


//creación del la frase inicial  //``
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

//transferencia de info con la bd 

class ServicioApi {
    static BD_URL = 'http://localhost:3000/api'; 

    static async obtenerContenido() {
        try{
            const respuesta = await fetch (`${this.BD_URL}/contenido`); 
            const datos = await respuesta.json();
            return datos.map(d => new Tarjeta(
                d.id, d.titulo, d.texto_largo, d.imagen_url, d.degradado_css 
            )); 
        } catch (error) {
            console.error('error',error);
            return[]; 
        }
    } 
}

class Tarjeta { 
    constructor(id, titulo, texto, imagen, degradado) {
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.imagen = imagen;
        this.degradado = degradado;
    }

    crear() {
    return `
    <div class="tarjeta-info">
        <div class="tarjeta-header" style="background: ${this.degradado};">
            <h2>${this.titulo}</h2>
        </div>
        <div class="tarjeta-body">
            <div class="tarjeta-contenido">
                <p>${this.texto}</p>
            </div>
           <img 
                src="http://localhost:3000/img/${this.imagen}" 
                onerror="this.src='http://localhost:3000/img/${this.imagen}.png'; this.onerror=function(){this.src='http://localhost:3000/img/${this.imagen}.jpg';}"
                class="foto-tarjeta" 
            >
        </div>
    </div>
    `;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('contenedor-tarjetas');
    
    if (!contenedor) {
        console.error("¡ERROR! No encontré el elemento con ID 'contenedor-tarjetas' en tu HTML");
        return;
    }

    const tarjetas = await ServicioApi.obtenerContenido();
    
    if (tarjetas.length === 0) {
        console.warn("La API respondió pero no hay tarjetas para mostrar.");
    } else {
        tarjetas.forEach(t => {
            contenedor.innerHTML += t.crear();
        });
    }
});

