import './index.css'

class vert {
    constructor(v1 = null, v2 = null) {
        this.v1 = v1
        this.v2 = v2
        this.visited = null
    }
}

class graph {
    constructor() {}
}

class chessBoard {
    buildBoard() {
        let column = []
        for (let i = 0; i < this.x; i++) {
            let row = []
            for (let k = 0; k < this.y; k++) {
                const v = new vert(i, k)
                row.push(v)
            }
            column.push(row)
        }
        return column
    }

    get visual() {
        let row = ''
        for (let i = 0; i < this.board.length; i++) {
            row += '\n'
            for (let w = 0; w < 40; w++) {
                row += '—'
            }
            row += '\n'
            for (let k = 0; k < this.board[i].length; k++) {
                if (this.board[i][k].visited !== null) {
                    row += `│${i}$${k}│`
                    continue
                }
                row += `│${i} ${k}│`
            }
        }
        row += '\n'
        for (let w = 0; w < 40; w++) {
            row += '—'
        }
        console.log(row)
    }

    knightNextStep(vert) {
        let possibilites = []
        let m = []
        m[1] = [vert[0] + 1, vert[1] + 2]
        m[2] = [vert[0] + 2, vert[1] + 1]
        m[3] = [vert[0] - 1, vert[1] - 2]
        m[4] = [vert[0] - 2, vert[1] - 1]
        m[5] = [vert[0] + 1, vert[1] - 2]
        m[6] = [vert[0] + 2, vert[1] - 1]
        m[7] = [vert[0] - 1, vert[1] + 2]
        m[8] = [vert[0] - 2, vert[1] + 1]
        for (let i = 1; i <= 8; i++) {
            if (m[i][0] < 8 && m[i][1] < 8) {
                if (m[i][0] > -1 && m[i][1] > -1) {
                    possibilites.push(m[i])
                }
            }
        }
        return possibilites
    }

    knightWalk(start = [0, 0], end = [7, 7]) {
        let p = start
        console.log(this.knightNextStep(start))
        let steps = 0
        while (p[0] !== end[0] && p[1] !== end[1] && steps < 500) {
            steps++
            this.board[p[0]][p[1]].visited = 'yes'
            const hmm = this.knightNextStep(p)
            let avia = []
            for (let i = 0; i < hmm.length; i++) {
                if (this.board[hmm[i][0]][hmm[i][1]].visited === null) {
                    avia.push(hmm[i])
                }
            }
        }
    }
    constructor() {
        this.x = 8
        this.y = 8
        this.board = this.buildBoard()
    }
}

const x = new chessBoard()
x.knightWalk()

x.visual
