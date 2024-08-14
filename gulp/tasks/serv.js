import { filePaths } from '../config/paths.js';

const serv = (instance) => {
  instance.init({
    server: {
      baseDir: filePaths.buildFolder
    },
    logLevel: 'info',
    cors: true,
    notify: true,
    reloadOnRestart: true,
    port: 9003,
    logPrefix: 'Front-end',
    middleware: [function (req, res, next) { // https://github.com/BrowserSync/browser-sync/issues/1458#issuecomment-417169447
      if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() === 'POST') {
        console.log('[POST => GET] : ' + req.url);
        req.method = 'GET';
      }
      next();
    }]
  });
};

export { serv };
