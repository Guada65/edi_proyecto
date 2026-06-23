class ServicioAPI {
    static BASE_URL = 'http://localhost:3000/api';

    static async obtenerContenido() {
        try {
            const respuesta = await fetch(`${this.BASE_URL}/contenido`);
            if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');
            return await respuesta.json();
        } catch (error) {
            console.error('Error al obtener contenido:', error);
            return [];
        }
    }
}

export default ServicioAPI;