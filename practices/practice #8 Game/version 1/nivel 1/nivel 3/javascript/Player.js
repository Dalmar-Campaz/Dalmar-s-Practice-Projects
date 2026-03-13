//lógica completa del personaje
export class Jugador {
    constructor({ x, y, width, height, color, speed, jumpPower, controles, sprites, contexto, gravedad, suelo, plataformas, spriteOffsetY = 0 }) {
      this.contexto = contexto;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed;
      this.jumpPower = jumpPower;
      this.controles = controles;
      this.sprites = sprites;
      this.estado = "idle";
      this.direccion = "derecha";
      this.enSuelo = true;
      this.fallSpeed = 0;
      this.gravedad = gravedad;
      this.suelo = suelo;
      this.plataformas = plataformas;
      this.spriteOffsetY = spriteOffsetY;
    }
  
    saltar() {
      this.fallSpeed -= this.jumpPower;
      this.enSuelo = false;
    }
  
    actualizarMovimiento(keys) {
      let corriendo = false;
      if (keys[this.controles.arriba] && this.enSuelo) this.saltar();
      if (keys[this.controles.izquierda]) {
        this.x -= this.speed;
        this.direccion = "left";
        corriendo = true;
      }
      if (keys[this.controles.derecha]) {
        this.x += this.speed;
        this.direccion = "derecha";
        corriendo = true;
      }
  
      this.estado = !this.enSuelo ? "jump" : corriendo ? "run" : "idle";
  
      this.fallSpeed += this.gravedad;
      this.y += this.fallSpeed;
      this.enSuelo = false;
  
      this.detectarColisiones();
      this.limitarPantalla();
    }
  
    detectarColisiones() {
      this.plataformas.forEach((p) => {
        if (
          this.x < p.x + p.width &&
          this.x + this.width > p.x &&
          this.y < p.y + p.height &&
          this.y + this.height > p.y
        ) {
          const estaSobre = this.y + this.height - this.fallSpeed <= p.y;
          if (estaSobre) {
            this.y = p.y - this.height;
            this.fallSpeed = 0;
            this.enSuelo = true;
          }
        }
      });
  
      if (this.y >= this.suelo) {
        this.y = this.suelo;
        this.enSuelo = true;
        this.fallSpeed = 0;
      }
    }
  
    limitarPantalla() {
      if (this.y < 0) this.y = 0;
      if (this.x < 12) this.x = 12;
      if (this.x + this.width > 1186) this.x = 1186 - this.width;
    }
  
    dibujar() {
      let sprite, datos;
      let frameY = 0;
  
      switch (this.estado) {
        case "run":
          sprite = this.sprites.run;
          datos = this.sprites.runData;
          if (this.direccion === "left") frameY = datos.frameHeight;
          break;
        case "jump":
          sprite = this.sprites.jump;
          datos = this.sprites.jumpData;
          frameY = this.fallSpeed > 0 ? datos.frameHeight : 0;
          break;
        default:
          sprite = this.sprites.idle;
          datos = this.sprites.idleData;
      }
  
      const offsetX = (datos.drawWidth - this.width) / 2;
      const offsetY = datos.drawHeight - 50;
      console.log("sprite:", sprite.src, "frame:", datos.currentFrame, "frameWidth:", datos.frameWidth, "totalFrames:", datos.totalFrames);
      this.contexto.drawImage(
        sprite,
        datos.frameWidth * datos.currentFrame,
        frameY,
        datos.frameWidth,
        datos.frameHeight,
        this.x - offsetX,
        this.y - offsetY - this.spriteOffsetY,
        datos.drawWidth,
        datos.drawHeight
      );
    }
  }
  