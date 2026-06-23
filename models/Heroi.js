class Heroi extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.vida = 5
        this.vidaMax = 5
        this.dirX = 0
        this.dirY = 0
        this.vel = 5
        this.cooldownTiro = 0
    }

    mov() {
        this.x += this.dirX * this.vel
        this.y += this.dirY * this.vel

        // Limites da tela
        if (this.x < 0) this.x = 0
        if (this.x > 1200 - this.w) this.x = 1200 - this.w
        if (this.y < 0) this.y = 0
        if (this.y > 700 - this.h) this.y = 700 - this.h

        if (this.cooldownTiro > 0) this.cooldownTiro--
    }

    // Desenha o herói como nave/personagem pixel art
    des_heroi() {
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        // Corpo principal - robô/armadura
        des.fillStyle = '#1a3a6e'
        des.fillRect(this.x + 8, this.y + 10, this.w - 16, this.h - 15)

        // Ombros
        des.fillStyle = '#2255aa'
        des.fillRect(this.x, this.y + 15, 12, 30)
        des.fillRect(this.x + this.w - 12, this.y + 15, 12, 30)

        // Capacete
        des.fillStyle = '#0d2a55'
        des.fillRect(this.x + 12, this.y, this.w - 24, 22)

        // Visor capacete
        des.fillStyle = '#00eeff'
        des.fillRect(this.x + 18, this.y + 5, this.w - 36, 12)

        // Brilho visor
        des.fillStyle = 'rgba(255,255,255,0.4)'
        des.fillRect(this.x + 20, this.y + 6, 8, 4)

        // Detalhes peito
        des.fillStyle = '#00eeff'
        des.fillRect(cx - 8, cy - 5, 16, 3)
        des.fillRect(cx - 4, cy, 8, 3)

        // Pernas
        des.fillStyle = '#0d2a55'
        des.fillRect(this.x + 12, this.y + this.h - 15, 14, 15)
        des.fillRect(this.x + this.w - 26, this.y + this.h - 15, 14, 15)

        // Canhão (braço direito)
        des.fillStyle = '#4fc3f7'
        des.fillRect(this.x + this.w - 5, cy - 5, 18, 10)
        des.fillStyle = '#00eeff'
        des.fillRect(this.x + this.w + 10, cy - 3, 8, 6)

        // Borda brilhante
        des.strokeStyle = '#4fc3f7'
        des.lineWidth = 1.5
        des.strokeRect(this.x + 8, this.y + 10, this.w - 16, this.h - 15)
    }
}