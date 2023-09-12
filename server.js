const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");



// console.log(process.env)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
