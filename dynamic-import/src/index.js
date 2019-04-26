import {TinaI18n} from "./i18n/TinaI18n";

window.onload = function () {
  // 实例化国际化
  const tinaI18n = initI18N('zh-hant', 'addWallet');

  // 简体中文
  document.querySelector('#cn').addEventListener('click', ()=>{
    tinaI18n.setInnerHtml('zh-cn');
  });

  // 繁体中文
  document.querySelector('#hant').addEventListener('click', ()=>{
    tinaI18n.setInnerHtml('zh-hant');
  })
};

// 初始化国际化
function initI18N(currentlang, currentFile) {
  const tinaI18n =  new TinaI18n({
    currentLang: currentlang,
    useFileName: currentFile
  });
  tinaI18n.setInnerHtml();
  return tinaI18n;
}

