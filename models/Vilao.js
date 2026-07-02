class Vilao extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.vida = 10
        this.vidaMax = 10
        this.velY = 1.5
        this.timerTiro = 0
        this.intervalTiro = 80 // frames entre rajadas
    }

    mov() {
        // Movimenta verticalmente sozinho, rebate nas bordas
        this.y += this.velY
        if (this.y <= 10) {
            this.y = 10
            this.velY *= -1
        }
        if (this.y >= 700 - this.h - 10) {
            this.y = 700 - this.h - 10
            this.velY *= -1
        }
        if (this.timerTiro > 0) this.timerTiro--
    }

    // Retorna true se é hora de atirar
    podeAtirar() {
        if (this.timerTiro <= 0) {
            this.timerTiro = this.intervalTiro
            return true
        }
        return false
    }

    // Desenha o vilão - figura robótica maligna / vilão
    des_vilao() { // <── troque o conteúdo deste método por des.drawImage(...) para usar um sprite do vilão
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        // Aura malígna ao redor
        des.globalAlpha = 0.15 + 0.1 * Math.abs(Math.sin(Date.now() / 400))
        des.fillStyle = '#ff2200'
        des.beginPath()
        des.arc(cx, cy, this.w * 0.7, 0, Math.PI * 2)
        des.fill()
        des.globalAlpha = 1

        // Corpo central
        des.fillStyle = '#3a0000'
        des.fillRect(this.x + 10, this.y + 12, this.w - 20, this.h - 18)

        // Ombros largos e ameaçadores
        des.fillStyle = '#5a0000'
        des.fillRect(this.x, this.y + 10, 14, 35)
        des.fillRect(this.x + this.w - 14, this.y + 10, 14, 35)

        // Spikes nos ombros
        des.fillStyle = '#ff2200'
        des.beginPath()
        des.moveTo(this.x, this.y + 10)
        des.lineTo(this.x - 8, this.y)
        des.lineTo(this.x + 14, this.y + 10)
        des.fill()
        des.beginPath()
        des.moveTo(this.x + this.w, this.y + 10)
        des.lineTo(this.x + this.w + 8, this.y)
        des.lineTo(this.x + this.w - 14, this.y + 10)
        des.fill()

        // Capacete/cabeça
        des.fillStyle = '#1a0000'
        des.fillRect(this.x + 14, this.y, this.w - 28, 24)

        // Olhos brilhantes (2 olhos vermelhos)
        des.fillStyle = '#ff0000'
        des.fillRect(this.x + 18, this.y + 7, 14, 8)
        des.fillRect(this.x + this.w - 32, this.y + 7, 14, 8)

        // Brilho nos olhos
        des.fillStyle = '#ffaa00'
        des.fillRect(this.x + 20, this.y + 8, 5, 4)
        des.fillRect(this.x + this.w - 30, this.y + 8, 5, 4)

        // Detalhes do peito - energia
        des.fillStyle = '#ff4400'
        des.fillRect(cx - 10, cy - 6, 20, 4)
        des.fillRect(cx - 6, cy + 2, 12, 4)

        // Pernas
        des.fillStyle = '#1a0000'
        des.fillRect(this.x + 14, this.y + this.h - 16, 16, 16)
        des.fillRect(this.x + this.w - 30, this.y + this.h - 16, 16, 16)

        // Canhão (braço esquerdo - atira pra esquerda)
        des.fillStyle = '#880000'
        des.fillRect(this.x - 20, cy - 6, 22, 12)
        des.fillStyle = '#ff2200'
        des.fillRect(this.x - 22, cy - 4, 6, 8)

        // Borda
        des.strokeStyle = '#ff2200'
        des.lineWidth = 1.5
        des.strokeRect(this.x + 10, this.y + 12, this.w - 20, this.h - 18)
    }
}