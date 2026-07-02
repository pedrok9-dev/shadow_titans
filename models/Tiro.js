class Tiro extends Obj {
    constructor(x, y, velX, velY, dono) {
        // dono: 'heroi' ou 'vilao'
        super(x, y, 14, 6, null)
        this.velX = velX
        this.velY = velY
        this.dono = dono
        this.ativo = true
    }

    mov() {
        this.x += this.velX
        this.y += this.velY

        // Tiro do herói: sai pela borda direita → desativa
        if (this.dono === 'heroi' && this.x > 1210) {
            this.ativo = false
            return
        }

        // Tiro do vilão: rebate nas bordas top/bottom, sai pela esquerda → desativa
        if (this.dono === 'vilao') {
            if (this.y <= 0) {
                this.y = 0
                this.velY *= -1
            }
            if (this.y >= 700 - this.h) {
                this.y = 700 - this.h
                this.velY *= -1
            }
            // Sai pela borda esquerda
            if (this.x < -20) {
                this.ativo = false
            }
            // Sai pela borda direita (caso de ângulo estranho)
            if (this.x > 1210) {
                this.ativo = false
            }
        }
    }

    des_tiro() {
        if (!this.ativo) return

        if (this.dono === 'heroi') { // <── troque este bloco por des.drawImage(...) para usar um sprite no tiro do herói
            // Tiro do herói: projétil azul ciano com brilho
            // Núcleo brilhante
            des.fillStyle = '#ffffff'
            des.fillRect(this.x + 4, this.y + 1, 6, 4)

            // Corpo do tiro
            des.fillStyle = '#00eeff'
            des.fillRect(this.x, this.y, this.w, this.h)

            // Cauda brilhante
            des.fillStyle = 'rgba(0, 238, 255, 0.4)'
            des.fillRect(this.x - 8, this.y + 1, 10, 4)

            // Brilho frontal
            des.fillStyle = 'rgba(255,255,255,0.6)'
            des.fillRect(this.x + this.w - 4, this.y + 1, 4, 4)

        } else { // <── troque este bloco por des.drawImage(...) para usar um sprite no tiro do vilão
            // Tiro do vilão: projétil vermelho com rastro
            // Rastro
            des.fillStyle = 'rgba(255, 50, 0, 0.35)'
            des.fillRect(this.x + this.w - 2, this.y + 1, 10, 4)

            // Corpo
            des.fillStyle = '#ff2200'
            des.fillRect(this.x, this.y, this.w, this.h)

            // Núcleo
            des.fillStyle = '#ffaa00'
            des.fillRect(this.x + 2, this.y + 1, 6, 4)

            // Ponta
            des.fillStyle = '#ffffff'
            des.fillRect(this.x, this.y + 2, 3, 2)
        }
    }
}