React App Utils
===============

Usage:
------

```sh
npm install react-app-utils react react-router --save
```

Server side rendering:

```js
var reactAppUtils = require('react-app-utils');

app.use(new reactAppUtils.reactRender({
   src: 'views/',
   layout: 'layout',
   routes: 'routes'
}));

app.get('/', function (req, res) {
   res.reactRender({ name: 'testing' });
});
```
