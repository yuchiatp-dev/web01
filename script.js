const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const scenarioContent = {
  indoor: {
    title: '室內：就地掩護',
    text: '立即趴下，躲到堅固桌子下並抓住桌腳；若附近沒有桌子，可蹲在內牆或柱子旁，用背包或墊子保護頭頸。'
  },
  bed: {
    title: '床上：留在床上保護頭頸',
    text: '不要急著起身亂跑。留在床上，用枕頭或被子保護頭部與頸部，待搖晃停止後再確認周圍環境是否安全。'
  },
  kitchen: {
    title: '廚房：遠離爐火與危險物品',
    text: '遠離爐火、玻璃、刀具及高櫃。只有在安全可行且不會延誤保護自己的情況下才關火，否則先就地掩護。'
  },
  store: {
    title: '商店／賣場：避開貨架與玻璃',
    text: '遠離高貨架、玻璃與可能掉落的物品，蹲低並用包包或隨身物品保護頭部。不要急著衝向出口。'
  },
  outdoor: {
    title: '戶外：移至空曠處',
    text: '遠離招牌、玻璃帷幕、電線桿、外牆及施工中的建物。郊外應留意崖邊、河邊與海邊等潛在危險。'
  },
  car: {
    title: '開車中：減速靠邊停車',
    text: '不要急煞，減速後停在安全處，避開橋梁、隧道、電線與可能掉落物，關閉引擎並留在車內，收聽官方資訊。'
  },
  elevator: {
    title: '電梯內：保護自己，離開後走樓梯',
    text: '若在電梯內感受到地震，可按下各樓層按鈕，背部與頭部靠牆、屈膝保護自己。離開電梯後不要再搭電梯避難，應依安全狀況走樓梯。'
  }
};

const scenarioButtons = document.querySelectorAll('.scenario-card');
const scenarioDetail = document.getElementById('scenarioDetail');
scenarioButtons.forEach(button => {
  button.addEventListener('click', () => {
    scenarioButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const content = scenarioContent[button.dataset.scenario];
    scenarioDetail.querySelector('h4').textContent = content.title;
    scenarioDetail.querySelector('p').textContent = content.text;
  });
});

const bagChecks = [...document.querySelectorAll('#bagChecklist input[type="checkbox"]')];
const bagProgress = document.getElementById('bagProgress');
const bagProgressText = document.getElementById('bagProgressText');
function updateBagProgress() {
  const count = bagChecks.filter(input => input.checked).length;
  bagProgress.style.width = `${count / bagChecks.length * 100}%`;
  bagProgressText.textContent = `${count} / ${bagChecks.length} 類`;
}
bagChecks.forEach(input => input.addEventListener('change', updateBagProgress));
document.getElementById('resetBag').addEventListener('click', () => {
  bagChecks.forEach(input => { input.checked = false; });
  updateBagProgress();
});

const homeChecks = [...document.querySelectorAll('#homeChecklist input[type="checkbox"]')];
const checkScore = document.getElementById('checkScore');
const checkProgressBar = document.getElementById('checkProgressBar');
function updateHomeProgress() {
  const checked = homeChecks.filter(input => input.checked).length;
  const percentage = Math.round(checked / homeChecks.length * 100);
  checkScore.textContent = `${percentage}%`;
  checkProgressBar.style.width = `${percentage}%`;
}
homeChecks.forEach(input => input.addEventListener('change', updateHomeProgress));
document.getElementById('resetChecklist').addEventListener('click', () => {
  homeChecks.forEach(input => { input.checked = false; });
  updateHomeProgress();
});
document.getElementById('printChecklist').addEventListener('click', () => window.print());
