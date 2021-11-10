const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("../database/connection");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const rows = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
            if (rows.length > 0) {
                const user = rows[0];
                const passwordIsCorrect = await bcrypt.compareSync(password, user.password);
                if (passwordIsCorrect) {
                    done(
                        null,
                        user,
                        user
                    );
                } else {
                    done(
                        null,
                        false,
                        req.flash("warning", "Contraseña incorrecta")
                    );
                }
            } else {
                done(
                    null,
                    false,
                    req.flash("warning", "No existe un usuario con ese email")
                );
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
    done(null, rows[0]);
});
