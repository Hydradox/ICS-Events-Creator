/**
 * @module Express.js Módulo para la configuración
 * del servidor Web de Express
 */


// Import modules
import { join } from 'path';
import { createServer } from 'http';

import express from 'express';
import chalk from 'chalk';

import routes from './routes.js';


// Init const Express
const port = 3000;

// Init const Chalk
const expressTitle = chalk.bold.magenta;
const expressSubtitle = chalk.bold.bgMagenta;


// Init package variables
let server;
let app;



class App {
    constructor() {
        app = express();
        server = createServer(app);

        // Middleware
        app.set('port', port);
        app.set('public', join(process.cwd(), 'public'));
        
        app.set('/', routes(app));


        // Iniciar servidor escuchando a puerto predefinido
        server.listen(app.get('port'), () => {
            console.log(expressTitle(`Servidor Web iniciado`));
            console.log(expressSubtitle(formatSize('Dir. Local:')) + `\t\thttp://localhost:${app.get('port')}/`);
        });
    }
}

export default App;