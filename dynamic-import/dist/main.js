/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/pdx-i18n/index.js":
/*!****************************************!*\
  !*** ./node_modules/pdx-i18n/index.js ***!
  \****************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports) {

class pdxI18n {
  constructor (obj){
    this.currentLang = obj['currentLang'];
    this.useFileName = obj['useFileName'];
  }

  // Set the current international language
  // 设置当前国际化语言
  setLang(){
    if(/^zh/i.test(this.currentLang)){
      if(/^zh[-—](cn|SG)/gi.test(this.currentLang)){
        this.currentLang = 'zh-cn';
      }else {
        this.currentLang = 'zh-hant';
      }
    }else {
      this.currentLang = this.currentLang.slice(0,2).toLowerCase();
    }
  }

  // Get current international language translation copy
  // 获取当前国际化语言翻译文案
  static getI18nFile(fileUrl){
    return import(/* webpackIgnore: true */ fileUrl).then(({default: ctx}) => {
      return ctx;
    })
  }

  // Transform internationalization
  // 变换国际化
  setInnerHtml(lang){
    lang && (this.currentLang = lang);
    let ele = document.querySelectorAll('.i18n');
    if (!(ele.length > 0)) {
      return new Error('Please check if the class has added i18n class');
    }
    this.setLang();
    // switch (this.currentLang) {
    //   case 'zh-cn':
    //     import(/* webpackIgnore: true */ `./i18n/${this.currentLang}/${this.useFileName}.js`).then(({default: ctx}) => {
    //       console.log('ctx-1', ctx);
    //     });
    //     break;
    //   case 'zh-hant':
    //
    //     // import('./zh-hant/addWallet.js').then(({default: ctx}) => {
    //     //   console.log('ctx', ctx);
    //     // });
    //     break;
    // }
    // console.log(`./i18n/${this.currentLang}/${this.useFileName}.js`);
    // TinaI18n.getI18nFile(`./i18n/${this.currentLang}/${this.useFileName}.js`).then(ctx => {
    pdxI18n.getI18nFile(`${window.location.href}i18n/${this.currentLang}/${this.useFileName}.js`)
    .then(ctx => {
      // TinaI18n.getI18nFile(`http://127.0.0.1:33333/i18n/${this.currentLang}/${this.useFileName}.js`).then(ctx => {
      for (let i = 0; i < ele.length; i++) {
        if (this.currentLang && ctx) {
          if (!ele[i].getAttribute('placeholder')) {
            ele[i].innerText = ctx[ele[i].getAttribute('data-i18n')];
          }
        } else {
          if (!(ctx)) {
            console.error('Failed to get copy： Path specification error？ file does not exist？');
            return
          }
        }
      }
    }).catch(err => {
      console.log('err', err);
    });
  }
  // 国际化placeholder类型
  setPlaceholderLang (lang) {
    lang && (this.currentLang = lang);
    let ele = document.querySelectorAll('.i18n');
    !(ele.length > 0) && (console.log('Please check if the class has added i18n class'));
    this.setLang();
    pdxI18n.getI18nFile(`${window.location.href}i18n/${this.currentLang}/${this.useFileName}.js`)
    .then(ctx => {
      for (let i = 0; i < ele.length; i++) {
        if (this.currentLang && ctx && ele[i].getAttribute('placeholder')) {
          ele[i].setAttribute('placeholder', ctx[ele[i].getAttribute('data-i18n')])
        } else {
          if (!this.currentLang) {
            console.error('unspecified' + this.currentLang + 'File internationalization js file not configured')
          } else if (!(ctx)) {
            console.error('unspecified' + this.currentLang + 'Language js file not introduced')
          }
        }
      }
    })
    .catch(err => {
      console.log('err', err);
    });
  }

  // 国际化变量类型
  setObjsLang (valName, lang = "", callback) {
    lang && (this.currentLang = lang);
    pdxI18n.getI18nFile(`${window.location.href}i18n/${this.currentLang}/${this.useFileName}.js`)
    .then(ctx => {
      if (this.currentLang && ctx) {
        callback(ctx[valName]);
      } else {
        if (!this.currentLang) {
          console.error('unspecified' + this.currentLang + 'File internationalization js file not configured')
        } else if (!(pack[this._type][this.currentLang])) {
          console.error('unspecified' + this.currentLang + '\'Language js file not introduced')
        }
      }
    })
    .catch(err => {
      console.log('err', err);
    })

  }
}

module.exports = pdxI18n;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var pdx_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdx-i18n */ "./node_modules/pdx-i18n/index.js");
/* harmony import */ var pdx_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pdx_i18n__WEBPACK_IMPORTED_MODULE_0__);
 // import pdxI18n from './pdxI18n';

window.onload = function () {
  var i18nObj = {}; // 实例化国际化
  // Instantiation internationalization

  var myI18n = initI18N('zh-hant', 'add'); // 简体中文
  // Simplified Chinese

  document.querySelector('#cn').addEventListener('click', function () {
    myI18n.setInnerHtml('zh-cn');
    myI18n.setPlaceholderLang('zh-cn');
    myI18n.setObjsLang('i18nObj', 'zh-cn', function (data) {
      console.log(data);
    });
  }); // 繁体中文
  // traditional Chinese

  document.querySelector('#hant').addEventListener('click', function () {
    myI18n.setInnerHtml('zh-hant');
    myI18n.setPlaceholderLang('zh-hant');
    myI18n.setObjsLang('i18nObj', 'zh-hant', function (data) {
      console.log(data);
    });
  }); // 英文
  // english

  document.querySelector('#en').addEventListener('click', function () {
    myI18n.setInnerHtml('en');
    myI18n.setPlaceholderLang('en');
    myI18n.setObjsLang('i18nObj', 'en', function (data) {
      console.log(data);
    });
  });
}; // 初始化国际化
// Initialization internationalization


function initI18N(currentlang, currentFile) {
  var i18n = new pdx_i18n__WEBPACK_IMPORTED_MODULE_0___default.a({
    currentLang: currentlang,
    useFileName: currentFile
  });
  i18n.setInnerHtml();
  i18n.setPlaceholderLang();
  i18n.setObjsLang('i18nObj', currentlang, function (data) {
    console.log(data);
  });
  return i18n;
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map