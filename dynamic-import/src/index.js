// import pdxI18n from 'pdx-i18n';
import pdxI18n from './pdxI18n';
window.onload = function () {
  const i18nObj = {};

  // 实例化国际化
  // Instantiation internationalization
  const myI18n = initI18N('zh-hant', 'add');

  // 简体中文
  // Simplified Chinese
  document.querySelector('#cn').addEventListener('click', ()=>{
    myI18n.setInnerHtml('zh-cn');
    myI18n.setPlaceholderLang('zh-cn');
    myI18n.setObjsLang('i18nObj', 'zh-cn', data => {
      console.log(data);
    });
  });

  // 繁体中文
  // traditional Chinese
  document.querySelector('#hant').addEventListener('click', ()=>{
    myI18n.setInnerHtml('zh-hant');
    myI18n.setPlaceholderLang('zh-hant');
    myI18n.setObjsLang('i18nObj', 'zh-hant', data => {
      console.log(data);
    });
  });

  // 英文
  // english
  document.querySelector('#en').addEventListener('click', ()=>{
    myI18n.setInnerHtml('en');
    myI18n.setPlaceholderLang('en');
    myI18n.setObjsLang('i18nObj', 'en', data => {
      console.log(data);
    });
  })
};

// 初始化国际化
// Initialization internationalization
function initI18N(currentlang, currentFile) {
  const i18n =  new pdxI18n({
    currentLang: currentlang,
    useFileName: currentFile
  });
  i18n.setInnerHtml();
  i18n.setPlaceholderLang();
  i18n.setObjsLang('i18nObj', currentlang, data => {
    console.log(data);
  });
  return i18n;
}

