let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentX = 0;
    this.currentY = 0;
  }

  init(paper) {
    paper.style.touchAction = "none"; // Prevent default scroll/zoom on mobile

    paper.addEventListener("pointerdown", (e) => {
      this.holdingPaper = true;
      this.pointerStartX = e.clientX;
      this.pointerStartY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.setPointerCapture(e.pointerId);
      paper.style.zIndex = highestZ++;
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      this.velX = e.clientX - this.prevX;
      this.velY = e.clientY - this.prevY;

      this.currentX += this.velX;
      this.currentY += this.velY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener("pointerup", () => {
      this.holdingPaper = false;
      this.velX = 0;
      this.velY = 0;
    });

    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
