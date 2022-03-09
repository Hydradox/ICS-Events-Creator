// Import modules
import { join } from 'path';


export default function(app) {

    app.get('*', (req, res) => {
        res.sendFile(join(app.get('public'), '/index.html'));
    })

}