(function(e){function r(r){var a=r[0];var l=r[1];var u=r[2];var i,c,s=0,p=[];for(;s<a.length;s++){c=a[s];if(o[c]){p.push(o[c][0])}o[c]=0}for(i in l){if(Object.prototype.hasOwnProperty.call(l,i)){e[i]=l[i]}}if(f)f(r);while(p.length){p.shift()()}t.push.apply(t,u||[]);return n()}function n(){var e;for(var r=0;r<t.length;r++){var n=t[r];var a=true;for(var u=1;u<n.length;u++){var i=n[u];if(o[i]!==0)a=false}if(a){t.splice(r--,1);e=l(l.s=n[0])}}return e}var a={};var o={29:0};var t=[];function l(r){if(a[r]){return a[r].exports}var n=a[r]={i:r,l:false,exports:{}};e[r].call(n.exports,n,n.exports,l);n.l=true;return n.exports}l.m=e;l.c=a;l.d=function(e,r,n){if(!l.o(e,r)){Object.defineProperty(e,r,{configurable:false,enumerable:true,get:n})}};l.r=function(e){Object.defineProperty(e,"__esModule",{value:true})};l.n=function(e){var r=e&&e.__esModule?function r(){return e["default"]}:function r(){return e};l.d(r,"a",r);return r};l.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)};l.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[];var i=u.push.bind(u);u.push=r;u=u.slice();for(var c=0;c<u.length;c++)r(u[c]);var f=i;t.push([467,0]);return n()})({466:function(e,r,n){"use strict";n.r(r);var a=n(570);var o=n.n(a);var t=n(303);var l=n(56);var u=n(23);var i=n(59);var c=n(37);var f=n(46);var s={};s.module=angular.module("gmfapp",["gettext",t["a"].name,l["a"].name,u["a"].module.name]);s.module.value("gmfTreeUrl","https://geomapfish-demo.camptocamp.com/2.3/wsgi/themes?"+"version=2&background=background");s.module.constant("angularLocaleScript","../build/angular-locale_{{locale}}.js");s.MainController=function(e){e.loadThemes();this.map=new c["a"]({layers:[],view:new f["a"]({center:[632464,185457],projection:i["a"],minZoom:3,zoom:3})})};s.MainController.$inject=["gmfThemes"];s.module.controller("MainController",s.MainController);r["default"]=s},467:function(e,r,n){n(74);n(73);e.exports=n(466)},570:function(e,r){}});
//# sourceMappingURL=backgroundlayerselector.7eeaa8.js.map