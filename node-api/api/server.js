const dotenv = require('dotenv');

dotenv.config('../.env');

const app = require('./app');
const db = require('./database');

db.connect();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
