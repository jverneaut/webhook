const express = require('express');
const exec = require('child_process').exec;

const config = require('./config.json');

const app = express();

app.post('/:projectName', (req, res) => {
  const { projectName } = req.params;
  const { projects } = config;
  const project = projects.filter(({ name }) =>
    name === projectName
  );
  if (project.length) {
    const { file } = project[0];
    exec(file,
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
