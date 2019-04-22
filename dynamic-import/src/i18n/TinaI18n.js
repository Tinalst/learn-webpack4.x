export class TinaI18n {
  constructor (obj){
    this.currentLang = obj['currentLang'];
    this.useFileName = obj['useFileName'];
  }

  checkLang(){
    if(/^zh/i.test(this.currentLang)){
      if(/^zh[-—](cn|SG)/gi.test(this.currentLang)){
        this.currentLang = 'zh-cn';
      }else {
        this.currentLang = 'zh-hant';
      }
    }else {
      this.currentLang = JsSrc.slice(0,2).toLowerCase();
    }
  }

  setInnerHtml(){
    console.log(2)
    let ele = document.querySelectorAll('.i18n');
    if (!(ele.length > 0)) {
      return new Error('请检查class是否有添加i18n');
    }
    this.checkLang();
    console.log(`./${this.currentLang}/${this.useFileName}.js`);

    // let url = `./${this.currentLang}/${this.useFileName}.js`;
    // for (let i = 0; i < ele.length; i++) {
    //   if (this.currentLang && pack[this._type][this._lang]) {
    //     if (!ele[i].getAttribute('placeholder')) {
    //       ele[i].innerText = pack[this._type][this._lang][ele[i].getAttribute('data-i18n')];
    //     }
    //   } else {
    //     if (!(pack[this._type])) {
    //       console.error('未指定' + this._lang + '文件国际化js文件未配置');
    //       return
    //     } else if (!(pack[this._type][this._lang])) {
    //       console.error('指定的' + this._lang + '语言js文件未引入');
    //       return
    //     }
    //   }
    // }
  }
}
