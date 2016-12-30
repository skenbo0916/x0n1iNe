// ==UserScript==
// @name         New ES6-Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       anonymous
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://xonline.tv/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...
    window.addEventListener('load', function() {
        replaceDownloadURL(getVideoURL());
    }, false);

    /* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */

function getVideoURL() {
    var videos = document.getElementsByTagName('video');

    for (var i = 0; i < videos.length; i++) {
        return videos[i].getAttribute("src");
    }

    return "";
}

function replaceDownloadURL(url) {
    var as = document.getElementsByTagName('a');

    for (var i = 0; i < as.length; i++) {
        if(as[i].getAttribute("class") == "btn-actions down") {
            as[i].href = url;
            as[i].setAttribute("download", "");
            as[i].setAttribute("target", "_blank");

            return true;
        }
    }

    return false;
}
