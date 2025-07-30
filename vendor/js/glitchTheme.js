class GlitchTheme {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.isActive = false;
    this.glitchIntensity = 0.1;
    this.glitchFrequency = 0.05;
    this.time = 0;
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
    this.isActive = true;
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createGlitchEffect() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // 기본 배경
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, width, height);
    
    // Glitch 효과 생성
    this.time += 0.016;
    
    // RGB 분리 효과
    if (Math.random() < this.glitchFrequency) {
      const offset = Math.random() * 10 - 5;
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillRect(offset, 0, width, height);
      
      this.ctx.fillStyle = '#00ff00';
      this.ctx.fillRect(-offset, 0, width, height);
      
      this.ctx.fillStyle = '#0000ff';
      this.ctx.fillRect(0, 0, width, height);
    }
    
    // 수평 라인 glitch
    for (let i = 0; i < height; i += 20) {
      if (Math.random() < this.glitchIntensity) {
        const y = i + Math.random() * 10 - 5;
        const lineHeight = Math.random() * 5 + 1;
        const offset = Math.random() * 20 - 10;
        
        this.ctx.fillStyle = `rgba(255, 0, 255, ${Math.random() * 0.3})`;
        this.ctx.fillRect(offset, y, width, lineHeight);
      }
    }
    
    // 수직 라인 glitch
    for (let i = 0; i < width; i += 30) {
      if (Math.random() < this.glitchIntensity) {
        const x = i + Math.random() * 10 - 5;
        const lineWidth = Math.random() * 3 + 1;
        const offset = Math.random() * 20 - 10;
        
        this.ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.3})`;
        this.ctx.fillRect(x, offset, lineWidth, height);
      }
    }
    
    // 노이즈 효과
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
      this.ctx.fillRect(x, y, size, size);
    }
    
    // 스캔라인 효과
    for (let i = 0; i < height; i += 2) {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
      this.ctx.fillRect(0, i, width, 1);
    }
  }

  animate() {
    if (!this.isActive) return;

    this.createGlitchEffect();
    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.isActive = false;
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// 전역 변수로 glitch 테마 인스턴스 관리
let glitchTheme = null;

function initGlitchTheme() {
  if (glitchTheme) {
    glitchTheme.destroy();
  }
  glitchTheme = new GlitchTheme();
  glitchTheme.init();
}

function destroyGlitchTheme() {
  if (glitchTheme) {
    glitchTheme.destroy();
    glitchTheme = null;
  }
}

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', () => {
  if (glitchTheme && glitchTheme.isActive) {
    glitchTheme.resize();
  }
}); 