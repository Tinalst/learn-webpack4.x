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
