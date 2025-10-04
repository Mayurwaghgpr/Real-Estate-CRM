const app = require("./app");
const connect = require("./config/mongodb");
const PORT = process.env.PORT || 5500;

connect()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
