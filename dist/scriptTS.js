"use strict";
var _a;
//hide insturctions
(_a = document.querySelector(".instructions")) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
//hide instructions
let year = new Date().getFullYear();
let month = new Date().getMonth();
const currentYear = document.querySelector(".current-year");
console.log("written with TypeScript. " + currentYear);
console.log(year);
