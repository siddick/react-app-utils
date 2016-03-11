React Utils
===========

Usage:
------

```sh
npm install react-utils react react-router --save
```

Server side rendering:

```js
app.use(new reactUtils.reactRender({
   src: 'views/',
   layout: 'layout',
   routes: 'routes'
}));

app.get('/', function (req, res) {
   res.reactRender({ name: 'testing' });
});
```
