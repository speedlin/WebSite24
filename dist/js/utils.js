"use strict";function setCookie(e,t,o){if(o){var n=new Date;n.setTime(n.getTime()-288e5+1e3*o),document.cookie=e+"="+t+";expires="+n}else document.cookie=e+"="+t}function getCookie(o){var n="";return document.cookie.split("; ").forEach(function(e){var t=e.split("=");t[0]===o&&(n=t[1])}),n}function getRandomNum(e,t){return parseInt(Math.random()*(t-e+1)+e)}function ma(){for(var e="",t=0;t<4;t++)e+="0123456789qwertyuiopasdfghjklzxcvbnm"[getRandomNum(0,35)];return e}