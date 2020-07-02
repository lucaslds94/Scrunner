const app = require('./app');

app.listen(process.env.API_PORT || 3333, () => {
  console.log("[SERVER] Server running on port 3333");
});