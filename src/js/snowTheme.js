class SnowTheme {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.petals = [];
    this.isActive = false;
    this.maxPetals = 50;
    this.petalColors = [
      { start: 'rgba(255, 255, 255, 0.9)', end: 'rgba(240, 248, 255, 0.9)' },
      { start: 'rgba(248, 248, 255, 0.9)', end: 'rgba(230, 230, 250, 0.9)' },
      { start: 'rgba(255, 250, 250, 0.9)', end: 'rgba(245, 245, 245, 0.9)' }
    ];
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

  createPetal() {
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
    const petal = {
      x: Math.random() * this.canvas.width,
      y: -20,
      size: Math.random() * 8 + 6,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      sway: Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
      color: color,
      life: 0
    };
    this.petals.push(petal);
  }

  drawPetal(petal) {
    this.ctx.save();
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate(petal.rotation);
    
    // 실제 벚꽃잎 모양 그리기 (5개의 꽃잎)
    this.ctx.beginPath();
    
    // 벚꽃잎의 중심점
    const centerX = 0;
    const centerY = 0;
    const radius = petal.size;
    
    // 5개의 꽃잎 그리기
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const nextAngle = ((i + 1) * 2 * Math.PI) / 5;
      
      // 꽃잎의 바깥쪽 끝점
      const outerX = centerX + Math.cos(angle) * radius;
      const outerY = centerY + Math.sin(angle) * radius;
      
      // 꽃잎의 안쪽 끝점 (중심으로부터 약간 안쪽)
      const innerX = centerX + Math.cos(angle) * (radius * 0.3);
      const innerY = centerY + Math.sin(angle) * (radius * 0.3);
      
      // 다음 꽃잎의 안쪽 끝점
      const nextInnerX = centerX + Math.cos(nextAngle) * (radius * 0.3);
      const nextInnerY = centerY + Math.sin(nextAngle) * (radius * 0.3);
      
      // 꽃잎의 곡선 그리기
      if (i === 0) {
        this.ctx.moveTo(outerX, outerY);
      } else {
        this.ctx.lineTo(outerX, outerY);
      }
      
      // 꽃잎의 곡선 부분 (베지어 곡선 사용)
      const controlX1 = centerX + Math.cos(angle + Math.PI/10) * (radius * 0.7);
      const controlY1 = centerY + Math.sin(angle + Math.PI/10) * (radius * 0.7);
      const controlX2 = centerX + Math.cos(nextAngle - Math.PI/10) * (radius * 0.7);
      const controlY2 = centerY + Math.sin(nextAngle - Math.PI/10) * (radius * 0.7);
      
      this.ctx.quadraticCurveTo(controlX1, controlY1, innerX, innerY);
      this.ctx.quadraticCurveTo(controlX2, controlY2, nextInnerX, nextInnerY);
    }
    
    this.ctx.closePath();
    
    // 그라데이션 생성 (중심에서 바깥쪽으로)
    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius
    );
    gradient.addColorStop(0, petal.color.start);
    gradient.addColorStop(0.7, petal.color.end);
    gradient.addColorStop(1, petal.color.end.replace('0.9', '0.6'));
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // 꽃잎의 테두리 (선택적)
    this.ctx.strokeStyle = petal.color.start.replace('0.9', '0.3');
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
    
    this.ctx.restore();
  }

  updatePetals() {
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const petal = this.petals[i];
      
      // 위치 업데이트
      petal.y += petal.speed;
      petal.x += Math.sin(petal.life * petal.sway + petal.swayOffset) * 0.5;
      petal.rotation += petal.rotationSpeed;
      petal.life += 0.01;
      
      // 화면 밖으로 나간 벚꽃잎 제거
      if (petal.y > this.canvas.height + 50) {
        this.petals.splice(i, 1);
      }
    }
    
    // 새로운 벚꽃잎 생성
    if (this.petals.length < this.maxPetals && Math.random() < 0.1) {
      this.createPetal();
    }
  }

  animate() {
    if (!this.isActive) return;

    // 배경을 투명하게 지우기
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 벚꽃잎 업데이트 및 그리기
    this.updatePetals();
    this.petals.forEach(petal => this.drawPetal(petal));
    
    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.isActive = false;
    this.petals = [];
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// 전역 변수로 Snow 테마 인스턴스 관리
let snowTheme = null;

function initSnowTheme() {
  if (snowTheme) {
    snowTheme.destroy();
  }
  snowTheme = new SnowTheme();
  snowTheme.init();
}

function destroySnowTheme() {
  if (snowTheme) {
    snowTheme.destroy();
    snowTheme = null;
  }
}

// 윈도우 리사이즈 이벤트 처리
window.addEventListener('resize', () => {
  if (snowTheme && snowTheme.isActive) {
    snowTheme.resize();
  }
}); 