require("dotenv").config();

const app = require("./app");

const port = process.env.APP_PORT || 5000;

app.listen(port, () => console.log(`The server is running on port ${port}`));
