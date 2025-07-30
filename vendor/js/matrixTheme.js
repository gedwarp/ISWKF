class MatrixTheme {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.characters = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허기니디리미비시이지치키티피히구누두루무부수우주추쿠투푸후그느드르므브스으즈츠크트프흐긔늬듸리미비시이지치키티피히';
    this.drops = [];
    this.fontSize = 14;
    this.columns = 0;
    this.width = 0;
    this.height = 0;
    this.isActive = false;
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resize();
    this.setupDrops();
    this.isActive = true;
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.columns = Math.floor(this.width / this.fontSize);
    this.setupDrops();
  }

  setupDrops() {
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
  }

  animate() {
    if (!this.isActive) return;

    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#0F0';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.isActive = false;
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// 전역 변수로 매트릭스 테마 인스턴스 관리
let matrixTheme = null;

function initMatrixTheme() {
  if (matrixTheme) {
    matrixTheme.destroy();
  }
  matrixTheme = new MatrixTheme();
  matrixTheme.init();
}

function destroyMatrixTheme() {
  if (matrixTheme) {
    matrixTheme.destroy();
    matrixTheme = null;
  }
}

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', () => {
  if (matrixTheme && matrixTheme.isActive) {
    matrixTheme.resize();
  }
}); 