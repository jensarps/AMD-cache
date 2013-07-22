/**
 * AMD-cache, a loader plugin for AMD loaders.
 *
 * Available via the MIT or new BSD license.
 * Copyright (c) 2011 Jens Arps
 * Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 */

(function(){var g=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],h=function(){var c=!1;try{c=window&&"localStorage"in window&&"getItem"in localStorage}catch(a){}return c}();define(function(){var c={createXhr:function(){var a,d,b;if("undefined"!==typeof XMLHttpRequest)return new XMLHttpRequest;for(d=0;3>d;d++){b=g[d];try{a=new ActiveXObject(b)}catch(c){}if(a){g=[b];break}}if(!a)throw Error("createXhr(): XMLHttpRequest not available");return a},get:function(a,d){var b=c.createXhr();b.open("GET",
a,!0);b.onreadystatechange=function(a){4===b.readyState&&d(b.responseText)};b.send(null)},load:function(a,d,b,e){var f=d.toUrl(a);if(h)if(e=localStorage.getItem(f),null!==e)b.fromText(a,e);else{c.get(f,function(c){c+="\n //@ sourceURL="+a;b.fromText(a,c);d([a],function(a){b(a)});try{localStorage.setItem(f,c)}catch(e){}});return}d([a],function(a){b(a)})}};return c})})();