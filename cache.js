/**
 * AMD-cache, a loader plugin for AMD loaders.
 *
 * Available via the MIT or new BSD license.
 * Copyright (c) 2011 Jens Arps
 * Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 */

(function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=function(){var a=!1;try{a=window&&"localStorage"in window&&"getItem"in localStorage}catch(b){}return a}();define(function(){var c={createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}if(!b)throw new Error("createXhr(): XMLHttpRequest not available");return b},get:function(a,b){var d=c.createXhr();d.open("GET",a,!0),d.onreadystatechange=function(a){d.readyState===4&&b(d.responseText)},d.send(null)},load:function(a,d,e,f){var g,h=d.toUrl(a);if(b){g=localStorage.getItem(h);if(g!==null)e.fromText(a,g);else{c.get(h,function(b){e.fromText(a,b),d([a],function(a){e(a)});try{localStorage.setItem(h,b)}catch(c){}});return}}d([a],function(a){e(a)})}};return c})})()