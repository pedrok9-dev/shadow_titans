class Telas {
    constructor() {
        this.flashVermelho = 0
    }

    atualiza() {
        if (this.flashVermelho > 0) this.flashVermelho -= 0.05
    }

    ativar_flash() {
        this.flashVermelho = 1
    }

    // ─── FUNDO MENU ───────────────────────────────────────────────
    _fundo_menu() {
        let grad = des.createLinearGradient(0, 0, 0, 700)
        grad.addColorStop(0, '#06001a')
        grad.addColorStop(0.5, '#0d003a')
        grad.addColorStop(1, '#06001a')
        des.fillStyle = grad
        des.fillRect(0, 0, 1200, 700)

        // Estrelas
        let estrelas = [
            [80,60],[220,30],[400,80],[600,20],[850,65],[1050,40],[1150,85],
            [140,190],[360,140],[560,170],[760,110],[970,150],[1080,190],
            [190,340],[450,290],[700,310],[910,270],[1160,330],
            [70,490],[310,470],[510,510],[720,455],[940,490],[1100,470],
            [55,150],[185,310],[430,200],[690,430],[830,175],[975,385],[1090,255],
            [330,555],[570,615],[745,570],[895,635],[1025,545]
        ]
        estrelas.forEach(([x, y], i) => {
            let a = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 900 + i * 0.5))
            des.globalAlpha = a
            des.fillStyle = 'white'
            des.beginPath()
            des.arc(x, y, 1.5, 0, Math.PI * 2)
            des.fill()
        })
        des.globalAlpha = 1
    }

    // ─── BOTÃO ────────────────────────────────────────────────────
    _botao(texto, x, y, cor, corSombra) {
        des.fillStyle = corSombra || '#222'
        des.fillRect(x - 200, y - 30, 400, 55)
        des.fillStyle = cor
        des.fillRect(x - 200, y - 35, 400, 55)
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(x - 200, y - 35, 400, 10)
        des.fillStyle = '#000'
        des.font = '13px "Press Start 2P"'
        des.textAlign = 'center'
        des.textBaseline = 'middle'
        des.fillText(texto, x, y - 8)
        des.textBaseline = 'alphabetic'
    }

    // ─── MENU INICIAL ─────────────────────────────────────────────
    desenha_menu() {
        this._fundo_menu()

        // Logo / Título
        des.font = 'bold 42px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#1a0060'
        des.fillText('JOVENS TITÃS', 603, 153)
        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 700))
        des.fillStyle = `rgba(140, 80, 255, ${a})`
        des.fillText('JOVENS TITÃS', 600, 150)

        des.fillStyle = 'rgba(255,255,255,0.55)'
        des.font = '10px "Press Start 2P"'
        des.fillText('Proteja a Torre. Derrote o mal.', 600, 200)

        this._botao('▶  JOGAR', 600, 285, '#5c00c7', '#2e0060')
        this._botao('📖  MANUAL', 600, 375, '#00609c', '#003050')
        this._botao('ℹ️  SOBRE', 600, 465, '#006040', '#002a1a')

        des.textAlign = 'left'
    }

    // ─── MANUAL ───────────────────────────────────────────────────
    desenha_manual() {
        this._fundo_menu()

        des.fillStyle = '#a060ff'
        des.font = '20px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('📖 MANUAL', 600, 55)

        let linhas = [
            { t: '🎮 CONTROLES', cor: '#a060ff', sz: '13px' },
            { t: 'Mover: W / A / S / D', cor: 'white', sz: '10px' },
            { t: 'Atirar: ESPAÇO', cor: 'white', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '❤️  VIDAS', cor: '#a060ff', sz: '13px' },
            { t: 'Você começa com 5 vidas', cor: 'white', sz: '10px' },
            { t: 'Tiro do vilão = -1 vida', cor: '#ff5555', sz: '10px' },
            { t: 'Coração coletado = +1 vida', cor: '#ff6ea0', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '💀 VILÃO', cor: '#a060ff', sz: '13px' },
            { t: 'Vilão tem 10 de vida', cor: 'white', sz: '10px' },
            { t: 'Seus tiros acertam e removem vida', cor: 'white', sz: '10px' },
            { t: 'Tiros do vilão rebatam nas bordas!', cor: '#ffaa00', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '🗺️  FASES', cor: '#a060ff', sz: '13px' },
            { t: 'São 4 fases com vilões diferentes', cor: 'white', sz: '10px' },
            { t: 'Cada fase tem uma cutscene', cor: 'white', sz: '10px' },
        ]

        linhas.forEach((l, i) => {
            if (!l.t) return
            des.fillStyle = l.cor
            des.font = `${l.sz} "Press Start 2P"`
            des.fillText(l.t, 600, 100 + i * 30)
        })

        this._botao('VOLTAR', 600, 665, '#5c00c7', '#2e0060')
        des.textAlign = 'left'
    }

    // ─── SOBRE ────────────────────────────────────────────────────
    desenha_sobre() {
        this._fundo_menu()

        des.fillStyle = '#a060ff'
        des.font = '20px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('ℹ️  SOBRE', 600, 55)

        // Card dev
        des.strokeStyle = '#a060ff'
        des.lineWidth = 2
        des.strokeRect(180, 90, 840, 180)
        des.fillStyle = 'rgba(140,80,255,0.07)'
        des.fillRect(180, 90, 840, 180)

        des.fillStyle = '#a060ff'
        des.font = '11px "Press Start 2P"'
        des.fillText('👨‍💻 DESENVOLVEDOR', 600, 118)
        des.fillStyle = 'white'
        des.font = '16px "Press Start 2P"'
        des.fillText('SEU NOME AQUI', 600, 155)
        des.fillStyle = 'rgba(255,255,255,0.5)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Técnico em Desenvolvimento de Sistemas', 600, 180)
        des.fillStyle = 'rgba(180,120,255,0.8)'
        des.font = '9px "Press Start 2P"'
        des.fillText('📸 @seu_instagram  ← clique aqui', 600, 210)
        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '9px "Press Start 2P"'
        des.fillText('🐙 GitHub: seu_github  ← clique aqui', 600, 238)
        des.fillStyle = 'rgba(255,255,255,0.3)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Sesi Senai - 2026', 600, 258)

        // Card professor
        des.strokeStyle = '#00e5aa'
        des.lineWidth = 2
        des.strokeRect(180, 290, 840, 120)
        des.fillStyle = 'rgba(0,229,170,0.05)'
        des.fillRect(180, 290, 840, 120)
        des.fillStyle = '#00e5aa'
        des.font = '11px "Press Start 2P"'
        des.fillText('🎓 PROFESSOR ORIENTADOR (PRODUCT OWNER)', 600, 320)
        des.fillStyle = 'white'
        des.font = '15px "Press Start 2P"'
        des.fillText('Prof. Carlos', 600, 358)
        des.fillStyle = 'rgba(255,255,255,0.35)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Programação de Aplicativos', 600, 390)

        // Tecnologias
        des.strokeStyle = '#a060ff'
        des.lineWidth = 2
        des.strokeRect(180, 430, 840, 70)
        des.fillStyle = 'rgba(140,80,255,0.05)'
        des.fillRect(180, 430, 840, 70)
        des.fillStyle = '#a060ff'
        des.font = '10px "Press Start 2P"'
        des.fillText('🛠️ HTML5 | Canvas API | JavaScript ES6+', 600, 460)
        des.fillStyle = 'rgba(255,255,255,0.3)'
        des.font = '9px "Press Start 2P"'
        des.fillText('© 2026 Shadow Titans - Todos os direitos reservados', 600, 485)

        this._botao('VOLTAR', 600, 625, '#5c00c7', '#2e0060')
        des.textAlign = 'left'
    }

    // ─── HUD ──────────────────────────────────────────────────────
    desenha_hud(heroi, vilao, fase) {
        // Barra superior semitransparente
        des.fillStyle = 'rgba(0,0,0,0.55)'
        des.fillRect(0, 0, 1200, 60)

        // == BARRA DE VIDA HERÓI ==
        des.fillStyle = '#a060ff'
        des.font = '10px "Press Start 2P"'
        des.textAlign = 'left'
        des.fillText('HERÓI', 15, 18)

        let largBarra = 220
        let barraX = 15
        let barraY = 24
        // fundo cinza
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(barraX, barraY, largBarra, 16)
        // vida atual
        let pctH = heroi.vida / heroi.vidaMax
        des.fillStyle = pctH > 0.5 ? '#4cff82' : pctH > 0.25 ? '#ffdd00' : '#ff3333'
        des.fillRect(barraX, barraY, largBarra * pctH, 16)
        // borda
        des.strokeStyle = '#a060ff'
        des.lineWidth = 1.5
        des.strokeRect(barraX, barraY, largBarra, 16)
        // texto vida
        des.fillStyle = 'white'
        des.font = '9px "Press Start 2P"'
        des.fillText(`${heroi.vida} / ${heroi.vidaMax}`, barraX + 80, barraY + 12)

        // == FASE CENTRO ==
        des.fillStyle = 'white'
        des.font = '14px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('FASE ' + fase, 600, 38)

        // == BARRA DE VIDA VILÃO ==
        des.fillStyle = '#ff4444'
        des.font = '10px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText('VILÃO', 1185, 18)

        let barraVX = 1185 - largBarra
        // fundo
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(barraVX, barraY, largBarra, 16)
        // vida vilão
        let pctV = vilao.vida / vilao.vidaMax
        des.fillStyle = pctV > 0.5 ? '#ff4444' : pctV > 0.25 ? '#ff8800' : '#ffee00'
        des.fillRect(barraVX, barraY, largBarra * pctV, 16)
        // borda
        des.strokeStyle = '#ff4444'
        des.lineWidth = 1.5
        des.strokeRect(barraVX, barraY, largBarra, 16)
        // texto vida vilão
        des.fillStyle = 'white'
        des.font = '9px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText(`${vilao.vida} / ${vilao.vidaMax}`, barraVX + largBarra - 8, barraY + 12)

        des.textAlign = 'left'
    }

    // ─── FLASH ────────────────────────────────────────────────────
    desenha_flash() {
        if (this.flashVermelho > 0) {
            des.fillStyle = `rgba(229,57,53,${this.flashVermelho * 0.35})`
            des.fillRect(0, 0, 1200, 700)
        }
    }

    // ─── VITÓRIA ──────────────────────────────────────────────────
    desenha_vitoria() {
        this._fundo_menu()

        des.fillStyle = 'rgba(140,80,255,0.08)'
        des.beginPath()
        des.arc(600, 220, 220, 0, Math.PI * 2)
        des.fill()

        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 600))
        des.font = '42px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#3a0080'
        des.fillText('🏆 VITÓRIA!', 603, 223)
        des.fillStyle = `rgba(160,100,255,${a})`
        des.fillText('🏆 VITÓRIA!', 600, 220)

        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '10px "Press Start 2P"'
        des.fillText('Os Titãs salvaram a Torre!', 600, 300)
        des.fillText('Zul\'Kahr foi derrotado!', 600, 330)

        this._botao('JOGAR NOVAMENTE', 600, 430, '#5c00c7', '#2e0060')
        this._botao('MENU', 600, 520, '#006040', '#002a1a')

        des.textAlign = 'left'
    }

    // ─── DERROTA ──────────────────────────────────────────────────
    desenha_derrota(fase) {
        this._fundo_menu()

        des.fillStyle = 'rgba(150,0,0,0.08)'
        des.beginPath()
        des.arc(600, 220, 220, 0, Math.PI * 2)
        des.fill()

        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 600))
        des.font = '42px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#4a0000'
        des.fillText('GAME OVER', 603, 223)
        des.fillStyle = `rgba(255,50,50,${a})`
        des.fillText('GAME OVER', 600, 220)

        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.font = '10px "Press Start 2P"'
        des.fillText('Os Titãs foram derrotados...', 600, 295)
        des.fillStyle = 'rgba(255,200,100,0.8)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Você chegou até a Fase ' + fase, 600, 340)

        this._botao('TENTAR NOVAMENTE', 600, 440, '#8b0000', '#4a0000')
        this._botao('MENU', 600, 530, '#5c00c7', '#2e0060')

        des.textAlign = 'left'
    }
}
