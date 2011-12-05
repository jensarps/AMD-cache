/**
 * AMD-cache, a loader plugin for AMD loaders.
 *
 * Available via the MIT or new BSD license.
 *
 * Copyright (c) 2011 Jens Arps
 *
 * The xhr code is taken from the RequireJS text plugin:
 *
 * @license RequireJS text 0.26.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * see: http://github.com/jrburke/requirejs for details
 */

(function () {

var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
    hasLocalStorage = (function(){
      var supported = false;
      try{
        supported = window && ("localStorage" in window) && ("getItem" in localStorage);
      }catch(e){}
      return supported;
    })();

define(function () {

  var cache = {

    createXhr: function () {
      //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
      var xhr, i, progId;
      if (typeof XMLHttpRequest !== "undefined") {
        return new XMLHttpRequest();
      } else {
        for (i = 0; i < 3; i++) {
          progId = progIds[i];
          try {
            xhr = new ActiveXObject(progId);
          } catch (e) {}

          if (xhr) {
            progIds = [progId];  // so faster next time
            break;
          }
        }
      }

      if (!xhr) {
        throw new Error("createXhr(): XMLHttpRequest not available");
      }

      return xhr;
    },

    get: function (url, callback) {
      var xhr = cache.createXhr();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function (evt) {
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      };
      xhr.send(null);
    },

    load: function (name, req, load, config) {
      var cached, url = req.toUrl(name); // TODO: prepend location.pathname?

      if (hasLocalStorage) { // in build context, this will be false, too
        cached = localStorage.getItem(url);
        if (cached !== null) {
          load.fromText(name, cached);
        } else {
          cache.get(url, function (content) {
            load.fromText(name, content);

            // can't just fall through here, as we
            // will already have returned at this time.
            req([name], function (content) {
              load(content);
            });

            try { // need to wrap this to catch potential QUOTA_EXCEEDED
              localStorage.setItem(url, content);
            } catch(e) {}
          });
          // need to return here to prevent a second
          // request being sent over the network.
          return;
        }
      }
      req([name], function (content) {
        load(content);
      });
    }
  };

  return cache;
});

}());
