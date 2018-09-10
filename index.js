const express = require('express');
const exec = require('child_process').exec;

const config = require('./config.json');

const app = express();

app.get('/:project', (req, res) => {
  const { project } = req.params;
  const { projects } = config;
  const find = projects.filter(({ name }) =>
    name === project
  );
  if (find.length) {
    const file = `${find[0].directory}/install.sh`;
    var yourscript = exec(file,
      (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }
      });
  }
  res.status(200).send('OK');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
});
