class HeaderMendoza extends HTMLElement {
    connectedCallback() {
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
        this.innerHTML = `
            <div class="botones-contenedor">
                <a href="historia.html"><button class="historia">Historia</button></a>
                <a href="geografia.html"><button class="geografia">Geografía</button></a>
                <a href="uva.html"><button class="uva">La Uva</button></a>
                <a href="cultura.html"><button class="cultura">Cultura</button></a>
                <a href="naturaleza.html"><button class="naturaleza">Naturaleza</button></a>
                <a href="lugares.html"><button class="lugares">Lugares Famosos</button></a>
                <a href="index.html"><button class="inicio">Volver al Inicio</button></a>
            </div>
        `;
    }
}
customElements.define('menu-mendoza', MenuPrincipal);