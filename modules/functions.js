/**
 * Funciones adicionales con uso global
 */



/**
 * @param string Cadena para formatear
 * @param size Tamaño final de la cadena para formateo
 */
global.formatSize = function(string, size = 15) {
    try {
        return ' ' + string + ' '.repeat(size - 1 - string.length);
    } catch {
        return ' ' + string;
    }
}