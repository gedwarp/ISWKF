let settingsGear = document.getElementsByClassName('settings')[0];
let closeButton = document.getElementsByClassName('close')[0];
let closeButtonTooltip = document.getElementsByClassName('tooltip-close')[0];

let connectedDarkThemeOption = document.getElementById('connectedDark');
let clearDarkThemeOption = document.getElementById('clearDark');
let matrixThemeOption = document.getElementById('matrix');
let glitchThemeOption = document.getElementById('glitch');
let snowThemeOption = document.getElementById('snow');

let quote = '';
let author = '';
let book = '';
let collector = '';
let like = '';
let collectDate = '';

function loadJSON(callback) {

  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './src/data/quotes.json', true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

function newQuote() {
  loadJSON((response) => {
    let quotes = JSON.parse(response);
    let randomNumber = Math.random() * (Object.keys(quotes).length - 1);
    randomNumber = Math.round(randomNumber);

    quote = quotes[randomNumber].quote;
    author = quotes[randomNumber].author;
    book = quotes[randomNumber].book || '';
    collector = quotes[randomNumber].collector || '';
    like = quotes[randomNumber].like || 0;
    collectDate = quotes[randomNumber].collectDate || '';

    setQuote(quote, author, book, collector, like, collectDate);
  });
}

function setQuote(quote, author, book, collector, like, collectDate) {
  console.log("setting quote :", quote);
  document.getElementById('quote').innerHTML = quote;
  document.getElementById('author').innerHTML = author;
  document.getElementById('book').innerHTML = book;
  document.getElementById('collector').innerHTML = collector;
  document.getElementById('like').innerHTML = like;
  
  // 날짜 형식 변환 (YYYY-MM-DD -> YYYY. MM. DD.)
  if (collectDate) {
    const date = new Date(collectDate);
    const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}.`;
    document.getElementById('collectDate').innerHTML = formattedDate;
  } else {
    document.getElementById('collectDate').innerHTML = '';
  }
}

// 기존 캔버스 요소들을 정리하는 함수
function cleanupCanvas() {
  // 기존 캔버스 요소들 제거
  const existingCanvas = document.getElementById('canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }
  
  // 매트릭스 캔버스 제거
  const matrixCanvas = document.querySelector('canvas[style*="z-index: -1"]');
  if (matrixCanvas) {
    matrixCanvas.remove();
  }
  
  // glitch 캔버스 제거
  destroyGlitchTheme();
  
  // snow 캔버스 제거
  destroySnowTheme();
}

let applyTheme = () => {
  let theme = localStorage.getItem('theme');

  // 기존 캔버스 정리
  cleanupCanvas();
  
  // 매트릭스 테마 정리
  destroyMatrixTheme();

  // 기존 테마 클래스 제거
  document.body.classList.remove('theme-matrix', 'theme-glitch', 'theme-snow');

  if (!theme || theme === 'clearDark') {
    settingGearColorInvert(true);
    clear('#fff', '#000');
  } else if (theme === 'connectedDark') {
    settingGearColorInvert(true);
    canvasDots('#fff', '#000', '#fff');
  } else if (theme === 'matrix') {
    settingGearColorInvert(true);
    document.body.classList.add('theme-matrix');
    initMatrixTheme();
  } else if (theme === 'glitch') {
    settingGearColorInvert(true);
    document.body.classList.add('theme-glitch');
    destroyGlitchTheme();
    initGlitchTheme();
  } else if (theme === 'snow') {
    settingGearColorInvert(false);
    document.body.classList.add('theme-snow');
    destroySnowTheme();
    initSnowTheme();
  }
}

let setTheme = function (theme) {
  localStorage.setItem('theme', theme);
  applyTheme();
}

/* ADD ONLOAD EVENTS */

window.onload = applyTheme();
window.onload = newQuote();

/* ADD ALL THE ON CLICK EVENT LISTERNERS */
settingsGear.addEventListener('click', () => {
  openNav();
  turnTooltipOff();
});

closeButton.addEventListener('click', () => {
  closeNav();
});

closeButtonTooltip.addEventListener('click', () => {
  turnTooltipOff();
})



connectedDarkThemeOption.addEventListener('click', () => {
  setTheme('connectedDark');
  closeNav();
});

clearDarkThemeOption.addEventListener('click', () => {
  setTheme('clearDark');
  closeNav();
})

matrixThemeOption.addEventListener('click', () => {
  setTheme('matrix');
  closeNav();
})

glitchThemeOption.addEventListener('click', () => {
  setTheme('glitch');
  closeNav();
})

snowThemeOption.addEventListener('click', () => {
  setTheme('snow');
  closeNav();
})

function checkStorageForTooltipInformation() {
  try {
    let hide = localStorage.getItem('hideTooltip');

    if (hide) {
      let tooltipElements = document.getElementsByClassName('tooltip');
      if (tooltipElements.length > 0) {
        let tooltipElement = tooltipElements[0];
        if (tooltipElement && tooltipElement.parentElement) {
          let parent = tooltipElement.parentElement;
          // Remove the element
          parent.removeChild(tooltipElement);
        }
      }
    }
  } catch (error) {
    console.log('Tooltip cleanup error:', error);
  }
}

/* CHECK TO SEE IF TOOLTIP HAS ALREADY BEEN SHOW */
checkStorageForTooltipInformation();

function turnTooltipOff() {
  let show = localStorage.setItem('hideTooltip', true);

  checkStorageForTooltipInformation();
}

function settingGearColorInvert(invert) {
  if (invert) {
    // Create the <style> tag
    let style = document.createElement('style');
    style.id = 'style';

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    // Add the <style> element to the page
    document.head.appendChild(style);

    let sheet = style.sheet;

    sheet.insertRule("img.settings { filter: invert(100%); }");
  } else {
    let headElement = document.getElementsByTagName('head')[0];
    let styleElement = document.getElementById('style');

    // Remove the style element if it exists
    if (styleElement) {
      headElement.removeChild(styleElement);
    }
  }
}
