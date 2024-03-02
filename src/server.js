import app from './app';

import appConfig from './config/appConfig';

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`CTRL + Clique em ${appConfig.url}:${port}`);
});
