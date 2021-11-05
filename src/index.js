require("dotenv").config();
const app = require("./app");

const PORT = app.get("PORT");

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
