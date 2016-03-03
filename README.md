React Utils
===========

Usage:
------

```js
var reactUtils = require('react-utils'),
    app = require('express')();

require("babel-register")({
    presets: ["react"]
});

app.use(new reactUtils.reactRender({
    layout: require('../public/views/layout'),
    routes: require('../public/views/routes')
}));

app.get('/', function (req, res) {
   res.reactRender({ name: 'testing' });
});
```
