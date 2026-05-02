let isFlakey = false;

module.exports = (req, res, next) => {
  if (req.path === '/flaky') {
    if (req.method === 'POST') {
      isFlakey = !isFlakey;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    return res.jsonp({ isFlakey });
  }

  const reliability = isFlakey ? 0.8 : 1;
  setTimeout(function () {
    if (Math.random() > reliability) {
      res.status(500).jsonp({
        error: "Oh no! Flaky backend :( Try again...",
      });
    } else {
      next();
    }
  }, Math.max(200, Math.min(700, Math.random() * 1000)));
};
