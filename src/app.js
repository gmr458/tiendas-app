const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const connectFlash = require("connect-flash");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "tiendas-app";

const databaseOptions = {
    host: MYSQL_HOST,
    port: 3306,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
};

const sessionStore = new MySQLStore(databaseOptions);

// Importacion de rutas
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/users.routes");

const app = express();
require("./lib/passport");

// Puerto
app.set("PORT", process.env.PORT || 3000);

// Motor de plantilla
app.set("views", path.join(__dirname, "views"));
const dirViews = app.get("views");
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(dirViews, "layout"),
        partialsDir: path.join(dirViews, "partials"),
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION || "secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.warning = req.flash("warning");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// Uso de rutas
app.use(indexRoutes);
app.use(userRoutes);

// Public
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
