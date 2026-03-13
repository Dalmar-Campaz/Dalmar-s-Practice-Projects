
export function animarSprite(spriteData, velocidad) {
    setInterval(() => {
      spriteData.currentFrame =
        (spriteData.currentFrame + 1) % spriteData.totalFrames;
    }, velocidad);
  }
  