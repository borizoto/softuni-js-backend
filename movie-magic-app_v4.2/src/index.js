import express from "express";
import handlebars from "express-handlebars";
import mongoose, { mongo } from "mongoose";

import routes from "./routes.js";

const app = express();

// DB setup
try {
    const uri = 'mongodb://localhost:27017/movie-magic-jan2025';
    await mongoose.connect(uri);
    console.log('DB connected succesfully.')
} catch (error) {
    console.log('Cannot connect to DB');
    console.error(error.message);
}

// handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// express configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

// set routes
app.use(routes);

// start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));