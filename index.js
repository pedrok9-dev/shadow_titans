let des = document.getElementById('des').getContext('2d')
 

let tela = 'menu'
let fase = 1
 
// ─── PRÉ-CARREGAMENTO DAS IMAGENS ─────────────────────────────
let IMG = {}
;[
    ['torre',   'img/cenario1_torre.png'],   
    ['cidade',  'img/cenario2_cidade.png'],  
    ['praia',   'img/cenario3_praia.png'],   
    ['vitoria', 'img/cenario3_vitoria.png'], 
    ['lab',          'img/cenario4_lab.png'],        
    ['lab_vitoria',  'img/cenario4_lab_vitoria.png'],  
    ['cobertura',         'img/cenario5_cobertura.png'],        
    ['cobertura_vitoria', 'img/cenario5_cobertura_vitoria.png'], 
    ['lutaFinal',         'img/cenario7_lutaFinal.png'],        
    ['lutaFinal_vitoria', 'img/cenario7_lutaFinal_vitoria.png'],
    ['heroi_parado1',   'img/krefta_parado_01.png'],   
    ['heroi_parado2',   'img/krefta_parado_02.png'],   
    ['heroi_parado3',   'img/krefta_parado_03.png'],   
    ['heroi_correndo1', 'img/krefta_correndo_01.png'], 
    ['heroi_correndo3', 'img/krefta_correndo_02.png'], 
    ['heroi_correndo4', 'img/krefta_correndo_03.png'], 
    ['heroi_atirando',  'img/krefta_atirando_02.png'], 
    ['tiro_heroi1',     'img/krefta_tiro_02.png'],     
    ['tiro_heroi2',     'img/krefta_tiro_03.png'],    
    ['davi_parado1',    'img/davi_parado_01.png'],     
    ['davi_parado2',    'img/davi_parado_02.png'],     
    ['davi_parado3',    'img/davi_parado_03.png'],     
    ['davi_correndo1',  'img/davi_correndo_01.png'],   
    ['davi_correndo4',  'img/davi_correndo_02.png'],   
    ['davi_atirando',   'img/davi_atirando_01.png'],  
    ['tiro_davi1',      'img/tiro_davi_01.png'],
    ['pedrion_parado1',   'img/theis_parado_01.png'],   
    ['pedrion_parado2',   'img/theis_parado_02.png'],   
    ['pedrion_parado3',   'img/theis_parado_03.png'],   
    ['pedrion_correndo1', 'img/theis_correndo_01.png'], 
    ['pedrion_correndo2', 'img/theis_correndo_02.png'], 
    ['pedrion_atirando',  'img/theis_atirando_01.png'], 
    ['tiro_pedrion1',     'img/theis_tiro_01.png'], 
    ['mutavio_parado1',   'img/paulo_parado_01.png'],   
    ['mutavio_parado2',   'img/paulo_parado_02.png'],   
    ['mutavio_parado3',   'img/paulo_parado_03.png'],   
    ['mutavio_correndo1', 'img/paulo_correndo_01.png'], 
    ['mutavio_correndo2', 'img/paulo_correndo_02.png'], 
    ['mutavio_atirando',  'img/paulo_atirando_01.png'], 
    ['tiro_mutavio1',     'img/paulo_tiro_01.png'],   
].forEach(([k, src]) => {
    IMG[k] = new Image()
    IMG[k].src = src
})
 
// ═══════════════════════════════════════════════════════════════
//  OBJETOS
// ═══════════════════════════════════════════════════════════════
let heroi = new Heroi(100, 300, 60, 70, null)
let vilao = new Vilao(1050, 280, 80, 90, null)
let telas = new Telas()
let cena  = new Cutscene()
 
let tirosHeroi   = []
let tirosVilao   = []
let coletaveis   = []
let timerCoracao = 0
const INTERVALO_CORACAO = 480
 
// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 1
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE1 = [
    // ── CENA 1: Torre Amanhecer ─────────────────────────────
    {
        personagem: 'Narrador',
        fala: 'Uma manhã calma na Torre dos Titãs. Ravena e Estelar saíram cedo para investigar uma anomalia energética. Pedrion, Daviborg, Kreftalad e Mutávio estão na sala principal.',
        cor: '#c8b8ff',
        fundo: 'torre'
    },
    {
        personagem: 'Pedrion',
        fala: 'A cidade está quieta demais... Alerta! Múltiplos picos de energia no centro! Alguém está tentando sobrecarregar a rede elétrica.',
        cor: '#4fc3f7',
        fundo: 'torre'      // ainda na torre
    },
 
    // ── CENA 2: Cidade (fundo muda aqui) ────────────────────
    {
        personagem: 'Daviborg',
        fala: 'É o Doutor Solaris. Consigo rastrear a assinatura dele. Ele quer apagar a cidade!',
        cor: '#81c784',
        fundo: 'cidade'     // TROCA para cidade nesta fala
    },
    {
        personagem: 'Pedrion',
        fala: 'Kreftalad, você vai na frente e cuida do Doutor Solaris na costa antes que ele desative os geradores! Daviborg, fique aqui e reforce a segurança dos computadores, sinto que isso pode ser uma armadilha.',
        cor: '#4fc3f7',
        fundo: 'cidade'
    },
    {
        personagem: 'Pedrion',
        fala: 'Mutávio, patrulhe os níveis inferiores da Torre. Eu vou dar cobertura tática. Titãs, ATACAR!',
        cor: '#4fc3f7',
        fundo: 'cidade'
    },
    {
        personagem: 'Kreftalad',
        fala: 'O Pedrion me mandou para apagar o seu brilho, Doutor Solaris! Daqui você não passa!',
        cor: '#00eeff',
        fundo: 'cidade'
    },
]
 
// ─── Fala pós-luta (vilão derrotado) ─────────────────────────
const FALAS_POS_LUTA = [
    {
        personagem: 'Doutor Solaris',
        fala: 'Heh... o plano nunca foi a cidade. O plano sempre foi... a Torre!',
        cor: '#ffaa00',
        fundo: 'vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 2: Invasão no Salão Principal
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE2 = [
    {
        personagem: 'Narrador',
        fala: 'Na sala de comando, os alarmes de invasão disparam. O misterioso Senhor X surge quebrando as janelas e hackeando o sistema central.',
        cor: '#c8b8ff',
        fundo: 'lab'
    },
    {
        personagem: 'Daviborg',
        fala: 'O Pedrion estava certo, era uma armadilha! Senhor X, saia de perto dos meus computadores! Hoje você não rouba nenhuma tecnologia nossa!',
        cor: '#81c784',
        fundo: 'lab'
    },
    {
        personagem: 'Senhor X',
        fala: 'Tarde demais, latinha. Vim pegar o que é meu e abrir caminho para o verdadeiro mestre.',
        cor: '#ff5555',
        fundo: 'lab'
    },
]

// ─── Fala pós-luta Fase 2 (Senhor X encurralado) ──────────────
const FALAS_POS_LUTA_FASE2 = [
    {
        personagem: 'Senhor X',
        fala: 'Você defendeu seus computadores, Daviborg... mas o General Shade já subiu atrás do seu líder!',
        cor: '#ffaa00',
        fundo: 'lab_vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 3: O Acerto de Contas
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE3 = [
    {
        personagem: 'Narrador',
        fala: 'Sabendo do perigo, Pedrion corre em direção ao elevador do telhado para interceptar a ameaça principal, mas as portas se abrem e seu pior inimigo surge das sombras.',
        cor: '#c8b8ff',
        fundo: 'cobertura'
    },
    {
        personagem: 'General Shade',
        fala: 'Olá, Pedrion. Mandou seus amigos para longe para me enfrentar? Você sempre foi previsível.',
        cor: '#ff5555',
        fundo: 'cobertura'
    },
    {
        personagem: 'Pedrion',
        fala: 'General Shade! Eu sabia que você estava por trás de tudo isso! Acaba aqui e agora, eu vou proteger essa Torre!',
        cor: '#4fc3f7',
        fundo: 'cobertura'
    },
]

// ─── Fala pós-luta Fase 3 (General Shade desarmado) ───────────
const FALAS_POS_LUTA_FASE3 = [
    {
        personagem: 'General Shade',
        fala: 'Você falhou, Pedrion... olhe para o céu. Eu fui apenas o peão do verdadeiro fim.',
        cor: '#ffaa00',
        fundo: 'cobertura_vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 4: O Chefão Apocalíptico
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE4 = [
    {
        personagem: 'Narrador',
        fala: 'O céu fica completamente vermelho-sangue e o telhado da Torre começa a rachar. O gigantesco e demoníaco Zul\'Kahr surge do portal místico. Ele usou toda a distração dos vilões anteriores para capturar Ravena e Estelar, que agora estão presas em runas de energia mística no topo da Torre.',
        cor: '#c8b8ff',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Zul\'Kahr',
        fala: 'O MUNDO DOS MORTAIS CAIRÁ DIANTE DE MIM! NINGUÉM PODE ME IMPEDIR!',
        cor: '#ff2200',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Mutávio',
        fala: 'O Pedrion me mandou defender a Torre... e ninguém toca nos meus amigos! Vocês pegaram a Estelar e... NINGUÉM MACHUCA A RAVENA! Agora o bicho vai pegar!',
        cor: '#66ff66',
        fundo: 'lutaFinal'
    },
]

// ─── Epílogo pós-luta Fase 4 (final do jogo) ──────────────────
const FALAS_POS_LUTA_FASE4 = [
    {
        personagem: 'Narrador',
        fala: 'Com um último ataque devastador em sua forma de T-Rex, Mutávio quebra as runas místicas de Zul\'Kahr. O portal colapsa, sugando o demônio de volta para a sua dimensão escura. O céu vermelho se dissipa, revelando a noite em Itapema City.',
        cor: '#c8b8ff',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Estelar',
        fala: 'Glorioso! Sabíamos que vocês conseguiriam!',
        cor: '#ffd166',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Ravena',
        fala: 'Obrigada, Mutávio... e obrigado a todos. Vocês chegaram bem na hora.',
        cor: '#b388ff',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Pedrion',
        fala: 'Excelente trabalho, Titãs! Kreftalad conteve o Doutor Solaris, Daviborg salvou nossos sistemas, eu enfrentei o General Shade e o Mutávio garantiu a nossa vitória final.',
        cor: '#4fc3f7',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Daviborg',
        fala: 'É isso aí! Ninguém mexe com a nossa Torre e sai ileso! O que acham de comemorarmos com uma disputa de videogame e muita pizza?',
        cor: '#81c784',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Mutávio',
        fala: 'Desde que a pizza seja vegetariana, eu topo na hora! Ganhamos o dia, galera!',
        cor: '#66ff66',
        fundo: 'lutaFinal_vitoria'
    },
    {
        personagem: 'Narrador',
        fala: 'E assim, trabalhando em equipe e confiando na liderança e nas habilidades de cada um, os Jovens Titãs salvaram as meninas, protegeram sua casa e trouxeram a paz de volta para Jump City.',
        cor: '#c8b8ff',
        fundo: 'lutaFinal_vitoria'
    },
]
 
// ═══════════════════════════════════════════════════════════════
//  FLUXO
// ═══════════════════════════════════════════════════════════════
function iniciar_luta() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5 // Velocidade de movimentação do vilão aumentada (era 2.5)
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 1
    tela = 'jogando'
}

function iniciar_luta_fase2() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 2
    tela = 'jogando'
}

function iniciar_luta_fase3() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 3
    tela = 'jogando'
}

function iniciar_luta_fase4() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 4
    tela = 'jogando'
}
 
function iniciar_cutscene_intro() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE1, IMG, () => {
        iniciar_luta()          // ao terminar as falas → vai pra luta
    })
}

function iniciar_cutscene_fase2() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE2, IMG, () => {
        iniciar_luta_fase2()    // ao terminar as falas → vai pra luta da Fase 2
    })
}

function iniciar_cutscene_fase3() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE3, IMG, () => {
        iniciar_luta_fase3()    // ao terminar as falas → vai pra luta da Fase 3
    })
}

function iniciar_cutscene_fase4() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE4, IMG, () => {
        iniciar_luta_fase4()    // ao terminar as falas → vai pra luta da Fase 4
    })
}
 
function iniciar_cutscene_pos_luta() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA, IMG, () => {
        tela = 'vitoria_fase1'  // ao terminar → tela de vitória
    })
}

function iniciar_cutscene_pos_luta_fase2() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE2, IMG, () => {
        tela = 'vitoria_fase2'  // ao terminar → tela de vitória da Fase 2
    })
}

function iniciar_cutscene_pos_luta_fase3() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE3, IMG, () => {
        tela = 'vitoria_fase3'  // ao terminar → tela de vitória da Fase 3
    })
}

function iniciar_cutscene_pos_luta_fase4() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE4, IMG, () => {
        tela = 'vitoria'        // ao terminar → tela final do jogo (Zul'Kahr derrotado)
    })
}
 
// ═══════════════════════════════════════════════════════════════
//  CONTROLES TECLADO
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
    if (tela === 'jogando') {
        if (e.key === 'w' || e.key === 'W') heroi.dirY = -1
        if (e.key === 's' || e.key === 'S') heroi.dirY =  1
        if (e.key === 'a' || e.key === 'A') heroi.dirX = -1
        if (e.key === 'd' || e.key === 'D') heroi.dirX =  1
        if (e.key === ' ') { e.preventDefault(); atirar_heroi() }
    }
    if (tela === 'cutscene') {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cena.avancar() }
    }
})
document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W') heroi.dirY = 0
    if (e.key === 's' || e.key === 'S') heroi.dirY = 0
    if (e.key === 'a' || e.key === 'A') heroi.dirX = 0
    if (e.key === 'd' || e.key === 'D') heroi.dirX = 0
})
 
// ─── CLIQUE ───────────────────────────────────────────────────
document.getElementById('des').addEventListener('click', (e) => {
    let r  = document.getElementById('des').getBoundingClientRect()
    let cx = e.clientX - r.left
    let cy = e.clientY - r.top
 
    // Botão genérico: clicou(centroX, centroY, largura, altura)
    function btn(bx, by, lw = 400, lh = 55) {
        return cx > bx - lw/2 && cx < bx + lw/2 &&
               cy > by - lh   && cy < by + 10
    }
 
    if (tela === 'menu') {
        if (btn(600, 285)) iniciar_cutscene_intro()
        if (btn(600, 375)) tela = 'manual'
        if (btn(600, 465)) tela = 'sobre'
    }
    if (tela === 'manual')  { if (btn(600, 665)) tela = 'menu' }
    if (tela === 'sobre')   { if (btn(600, 625)) tela = 'menu' }
    if (tela === 'cutscene') cena.avancar()
 
    if (tela === 'vitoria_fase1') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase2()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria_fase2') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase3()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria_fase3') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase4()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria') {
        // Tela final (telas.desenha_vitoria): "JOGAR NOVAMENTE" e "MENU"
        if (btn(600, 430)) iniciar_cutscene_intro()
        if (btn(600, 520)) tela = 'menu'
    }
    if (tela === 'derrota') {
        if (btn(600, 440)) {
            // <── "Tentar Novamente" reinicia a fase atual (não volta pro início do jogo)
            if      (fase === 2) iniciar_luta_fase2()
            else if (fase === 3) iniciar_luta_fase3()
            else if (fase === 4) iniciar_luta_fase4()
            else iniciar_luta()
        }
        if (btn(600, 530)) tela = 'menu'
    }
})
 
// ═══════════════════════════════════════════════════════════════
//  MECÂNICA DE JOGO
// ═══════════════════════════════════════════════════════════════
function atirar_heroi() {
    if (heroi.cooldownTiro > 0) return
    heroi.cooldownTiro = 18
    // Velocidade do tiro do herói aumentada (era 14)
    tirosHeroi.push(new Tiro(heroi.x + heroi.w, heroi.y + heroi.h/2 - 3, 20, 0, 'heroi'))
}
 
function atirar_vilao() {
    let tx = vilao.x
    let ty = vilao.y + vilao.h / 2
    // Velocidade do tiro do vilão diminuída (valores absolutos menores que antes)
    ;[
        {vx:-7, vy:  0},
        {vx:-6, vy: -3},
        {vx:-6, vy:  3},
    ].forEach(a => tirosVilao.push(new Tiro(tx, ty, a.vx, a.vy, 'vilao')))
}
 
function spawn_coracao() {
    timerCoracao++
    if (timerCoracao >= INTERVALO_CORACAO) {
        timerCoracao = 0
        coletaveis.push(new Coletavel(Math.floor(Math.random() * 800 + 100), -30))
    }
}
 
function colisoes() {
    tirosHeroi.forEach(t => {
        if (t.ativo && t.colid(vilao)) { t.ativo = false; vilao.vida-- }
    })
    tirosVilao.forEach(t => {
        if (t.ativo && t.colid(heroi)) {
            t.ativo = false; heroi.vida--; telas.ativar_flash()
        }
    })
    coletaveis.forEach(c => {
        if (c.ativo && heroi.colid(c)) {
            c.ativo = false
            heroi.vida = Math.min(heroi.vida + 1, heroi.vidaMax)
        }
    })
}
 
function verificar_estado() {
    if (heroi.vida <= 0)  { tela = 'derrota'; return }
    if (vilao.vida <= 0)  {
        if      (fase === 2) iniciar_cutscene_pos_luta_fase2()
        else if (fase === 3) iniciar_cutscene_pos_luta_fase3()
        else if (fase === 4) iniciar_cutscene_pos_luta_fase4()
        else iniciar_cutscene_pos_luta()
    }
}
 
// ═══════════════════════════════════════════════════════════════
//  DESENHO DO FUNDO DE LUTA
// ═══════════════════════════════════════════════════════════════
function desenha_fundo_luta() {
    let fundo = fase === 2 ? IMG.lab
              : fase === 3 ? IMG.cobertura
              : fase === 4 ? IMG.lutaFinal
              : IMG.praia // <── fundo da luta troca conforme a fase
    if (fundo.complete && fundo.naturalWidth > 0) {
        des.drawImage(fundo, 0, 0, 1200, 700)
        des.fillStyle = 'rgba(0,0,0,0.22)'
        des.fillRect(0, 0, 1200, 700)
    } else {
        des.fillStyle = '#06001a'
        des.fillRect(0, 0, 1200, 700)
    }
}
 
// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 1
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase1() {
    // Fundo = imagem de vitória
    if (IMG.vitoria.complete && IMG.vitoria.naturalWidth > 0) {
        des.drawImage(IMG.vitoria, 0, 0, 1200, 700)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }
    des.fillStyle = 'rgba(0,0,0,0.40)'
    des.fillRect(0, 0, 1200, 700)
 
    // ── TÍTULO VITÓRIA ─────────────────────────────────────
    des.textAlign = 'center'
 
    // Sombra título
    des.font      = 'bold 64px "Press Start 2P"'
    des.fillStyle = '#3a2000'
    des.fillText('VITÓRIA!', 603, 154)
    // Dourado pulsante
    let ab = 0.75 + 0.25 * Math.abs(Math.sin(Date.now() / 500))
    des.fillStyle = `rgba(255,210,0,${ab})`
    des.fillText('VITÓRIA!', 600, 151)
 
    // Subtítulo
    des.font      = '21px "Press Start 2P"'
    des.fillStyle = '#ffe055'
    des.fillText('DOUTOR SOLARIS DERROTADO!', 600, 205)
 
    des.font      = '12px "Press Start 2P"'
    des.fillStyle = 'rgba(255,255,255,0.85)'
    des.fillText('Kreftalad garantiu o gerador costeiro.', 600, 245)
 
    // Separador
    des.strokeStyle = 'rgba(255,210,0,0.4)'
    des.lineWidth   = 1.5
    des.beginPath() ; des.moveTo(280,268) ; des.lineTo(920,268) ; des.stroke()
 
    // Fala do vilão derrotado
    des.font      = '11px "Press Start 2P"'
    des.fillStyle = '#ff8844'
    des.fillText('Doutor Solaris: "Heh... o plano nunca foi a cidade.', 600, 308)
    des.fillText('O plano sempre foi... a Torre!"', 600, 334)
 
    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx = 600, by = 504, bw = 360, bh = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx - bw/2 + 4, by - bh/2 + 4, bw, bh)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx - bw/2, by - bh/2, bw, bh)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx - bw/2, by - bh/2, bw, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx - bw/2, by - bh/2, bw, bh)
    // Texto pulsante
    let ap = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx, by)
 
    des.fillStyle    = 'rgba(255,255,255,0.30)'
    des.font         = '9px "Press Start 2P"'
    des.textBaseline = 'alphabetic'
    des.fillText('(demais fases em breve)', 600, by + 42)
 
    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx = 600, my = 600, mw = 270, mh = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx - mw/2, my - mh/2, mw, mh)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx - mw/2, my - mh/2, mw, mh)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx, my)
    des.textBaseline = 'alphabetic'
 
    des.textAlign = 'left'
}

// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 2
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase2() {
    // Fundo = imagem de vitória
    if (IMG.lab_vitoria.complete && IMG.lab_vitoria.naturalWidth > 0) {
        des.drawImage(IMG.lab_vitoria, 0, 0, 1200, 700)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }
    des.fillStyle = 'rgba(0,0,0,0.40)'
    des.fillRect(0, 0, 1200, 700)

    // ── TÍTULO VITÓRIA ─────────────────────────────────────
    des.textAlign = 'center'

    // Sombra título
    des.font      = 'bold 64px "Press Start 2P"'
    des.fillStyle = '#3a2000'
    des.fillText('VITÓRIA!', 603, 154)
    // Dourado pulsante
    let ab2 = 0.75 + 0.25 * Math.abs(Math.sin(Date.now() / 500))
    des.fillStyle = `rgba(255,210,0,${ab2})`
    des.fillText('VITÓRIA!', 600, 151)

    // Subtítulo
    des.font      = '21px "Press Start 2P"'
    des.fillStyle = '#ffe055'
    des.fillText('SENHOR X DERROTADO!', 600, 205)

    des.font      = '12px "Press Start 2P"'
    des.fillStyle = 'rgba(255,255,255,0.85)'
    des.fillText('Daviborg garantiu o processador quântico.', 600, 245)

    // Separador
    des.strokeStyle = 'rgba(255,210,0,0.4)'
    des.lineWidth   = 1.5
    des.beginPath() ; des.moveTo(280,268) ; des.lineTo(920,268) ; des.stroke()

    // Fala do vilão derrotado
    des.font      = '11px "Press Start 2P"'
    des.fillStyle = '#ff8844'
    des.fillText('Senhor X: "Você defendeu seus computadores, Daviborg...', 600, 308)
    des.fillText('mas o General Shade já subiu atrás do seu líder!"', 600, 334)

    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx2 = 600, by2 = 504, bw2 = 360, bh2 = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx2 - bw2/2 + 4, by2 - bh2/2 + 4, bw2, bh2)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx2 - bw2/2, by2 - bh2/2, bw2, bh2)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx2 - bw2/2, by2 - bh2/2, bw2, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx2 - bw2/2, by2 - bh2/2, bw2, bh2)
    // Texto pulsante
    let ap2 = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap2})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx2, by2)

    des.fillStyle    = 'rgba(255,255,255,0.30)'
    des.font         = '9px "Press Start 2P"'
    des.textBaseline = 'alphabetic'
    des.fillText('(demais fases em breve)', 600, by2 + 42)

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx2 = 600, my2 = 600, mw2 = 270, mh2 = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx2 - mw2/2, my2 - mh2/2, mw2, mh2)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx2 - mw2/2, my2 - mh2/2, mw2, mh2)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx2, my2)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}

// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 3
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase3() {
    // Fundo = imagem de vitória
    if (IMG.cobertura_vitoria.complete && IMG.cobertura_vitoria.naturalWidth > 0) {
        des.drawImage(IMG.cobertura_vitoria, 0, 0, 1200, 700)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }
    des.fillStyle = 'rgba(0,0,0,0.40)'
    des.fillRect(0, 0, 1200, 700)

    // ── TÍTULO VITÓRIA ─────────────────────────────────────
    des.textAlign = 'center'

    // Sombra título
    des.font      = 'bold 64px "Press Start 2P"'
    des.fillStyle = '#3a2000'
    des.fillText('VITÓRIA!', 603, 154)
    // Dourado pulsante
    let ab3 = 0.75 + 0.25 * Math.abs(Math.sin(Date.now() / 500))
    des.fillStyle = `rgba(255,210,0,${ab3})`
    des.fillText('VITÓRIA!', 600, 151)

    // Subtítulo
    des.font      = '21px "Press Start 2P"'
    des.fillStyle = '#ffe055'
    des.fillText('GENERAL SHADE DERROTADO!', 600, 205)

    des.font      = '12px "Press Start 2P"'
    des.fillStyle = 'rgba(255,255,255,0.85)'
    des.fillText('Pedrion garantiu a segurança da Torre.', 600, 245)

    // Separador
    des.strokeStyle = 'rgba(255,210,0,0.4)'
    des.lineWidth   = 1.5
    des.beginPath() ; des.moveTo(280,268) ; des.lineTo(920,268) ; des.stroke()

    // Fala do vilão derrotado
    des.font      = '11px "Press Start 2P"'
    des.fillStyle = '#ff8844'
    des.fillText('General Shade: "Você falhou, Pedrion... olhe para o céu.', 600, 308)
    des.fillText('Eu fui apenas o peão do verdadeiro fim."', 600, 334)

    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx3 = 600, by3 = 504, bw3 = 360, bh3 = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx3 - bw3/2 + 4, by3 - bh3/2 + 4, bw3, bh3)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx3 - bw3/2, by3 - bh3/2, bw3, bh3)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx3 - bw3/2, by3 - bh3/2, bw3, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx3 - bw3/2, by3 - bh3/2, bw3, bh3)
    // Texto pulsante
    let ap3 = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap3})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx3, by3)

    des.fillStyle    = 'rgba(255,255,255,0.30)'
    des.font         = '9px "Press Start 2P"'
    des.textBaseline = 'alphabetic'
    des.fillText('(fase final: o Chefão Apocalíptico)', 600, by3 + 42)

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx3 = 600, my3 = 600, mw3 = 270, mh3 = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx3 - mw3/2, my3 - mh3/2, mw3, mh3)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx3 - mw3/2, my3 - mh3/2, mw3, mh3)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx3, my3)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}
 
// ═══════════════════════════════════════════════════════════════
//  LOOP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
function desenha() {
    des.clearRect(0, 0, 1200, 700)
 
    if      (tela === 'menu')          telas.desenha_menu()
    else if (tela === 'manual')        telas.desenha_manual()
    else if (tela === 'sobre')         telas.desenha_sobre()
    else if (tela === 'cutscene')      cena.desenha()
    else if (tela === 'vitoria_fase1') desenha_vitoria_fase1()
    else if (tela === 'vitoria_fase2') desenha_vitoria_fase2()
    else if (tela === 'vitoria_fase3') desenha_vitoria_fase3()
    else if (tela === 'vitoria')       telas.desenha_vitoria()
    else if (tela === 'derrota')       telas.desenha_derrota(fase)
    else if (tela === 'jogando') {
        desenha_fundo_luta()
        coletaveis.forEach(c => c.des_coracao())
        tirosHeroi.forEach(t => t.des_tiro())
        tirosVilao.forEach(t => t.des_tiro())
        heroi.des_heroi()
        vilao.des_vilao()
        telas.desenha_flash()
        telas.desenha_hud(heroi, vilao, fase)
    }
}
 
function atualiza() {
    telas.atualiza()
 
    if (tela === 'cutscene') { cena.atualiza(); return }
    if (tela !== 'jogando')  return
 
    heroi.mov()
    vilao.mov()
    if (vilao.podeAtirar()) atirar_vilao()
 
    tirosHeroi.forEach(t => t.mov())
    tirosHeroi = tirosHeroi.filter(t => t.ativo)
 
    tirosVilao.forEach(t => t.mov())
    tirosVilao = tirosVilao.filter(t => t.ativo)
 
    coletaveis.forEach(c => c.mov())
    coletaveis = coletaveis.filter(c => c.ativo)
 
    spawn_coracao()
    colisoes()
    verificar_estado()
}
 
function main() {
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
 
main()