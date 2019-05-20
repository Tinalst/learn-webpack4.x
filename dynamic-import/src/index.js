import pdxI18n from 'pdx-i18n';
window.onload = function () {
  // 实例化国际化
  // Instantiation internationalization
  const myI18n = initI18N('zh-hant', 'add');

  // 简体中文
  // Simplified Chinese
  document.querySelector('#cn').addEventListener('click', ()=>{
    myI18n.setInnerHtml('zh-cn');
  });

  // 繁体中文
  // traditional Chinese
  document.querySelector('#hant').addEventListener('click', ()=>{
    myI18n.setInnerHtml('zh-hant');
  });

  // 英文
  // english
  document.querySelector('#en').addEventListener('click', ()=>{
    myI18n.setInnerHtml('en');
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
  return i18n;
}

