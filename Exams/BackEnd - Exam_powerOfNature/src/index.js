import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import routes from "./routes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { setTitle } from "./helpers/hbsHelpers.js";

const app = express();

// DB configuration
try {
    const uri = 'mongodb://localhost:27017/powerOfNature';
    await mongoose.connect(uri);

    console.log('DB connected succesfully.');
} catch (error) {
    console.log('Cannot connect to DB.');
    console.error(error.message);
}

// Handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: { setTitle }
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Express configuration
app.use(express.static('src/public'));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

// Set routes
app.use(routes);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));