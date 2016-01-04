About
===

AMD-cache is a plugin for [AMD loaders](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins).
It will store loaded modules in localStorage, if available. For subsequent page loads
that module will be loaded from localStorage and not trigger a network request.

Usage
===

Download the `chache.js` file. In your code, prefix the module that you `require()` with `cache!` like this:

```javascript
require(['cache!myModule'], function(myModule){
  myModule.doSomething();
});
```
