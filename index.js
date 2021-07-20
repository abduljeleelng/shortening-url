const app = require('./src');
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Find me on port ${port}`);
});