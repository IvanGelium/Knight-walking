import './index.css'

class vert {
    constructor(v1 = null, v2 = null) {
        this.v1 = v1
        this.v2 = v2
        this.visited = null
    }
}

class node {
    constructor(pos) {
        this.pos = pos
        this.neib = []
        this.steps = null
    }
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
                    row += `│${i}▮${k}│`
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

    buildGraph() {
        let graph = []
        for (let i = 0; i < 8; i++) {
            for (let k = 0; k < 8; k++) {
                graph.push(new node([i, k]))
            }
        }
        for (let i = 0; i < 64; i++) {
            graph[i].neib = this.knightNextStep(graph[i].pos)
        }
        return graph
    }

    findNodeInd(pos) {
        return pos[0] * 8 + pos[1]
    }

    knightWalk(start = [0, 0], end = [7, 7]) {
        let c = 0
        let way = []
        let variants = []
        let steps = 0
        let curNode = null
        let startNode = this.graph[this.findNodeInd(start)]
        let endNode = this.graph[this.findNodeInd(end)]
        startNode.steps = 0
        let stack = []
        stack.push(startNode)

        while (stack.length > 0 && c < 100) {
            c++
            curNode = stack.pop()
            way = way.slice(0, curNode.steps)
            way.push(curNode)
            if (this.isWin(curNode, endNode)) {
                variants.push(way)
            }

            steps = way.length
            const possib = this.knightNextStep(curNode.pos)
            for (let i = 0; i < possib.length; i++) {
                const aaa = this.graph[this.findNodeInd(possib[i])]
                if (this.visit(aaa, way) === null) {
                    aaa.steps = steps
                    stack.push(aaa)
                }
            }
        }
    }

    visit(node, ar) {
        for (let i = 0; i < ar.length; i++) {
            if (node.pos[0] === ar[i].pos[0] && node.pos[1] === ar[i].pos[1]) {
                return 1
            }
        }
        return null
    }

    isWin(curNode, endNode) {
        if (
            curNode.pos[0] === endNode.pos[0] &&
            curNode.pos[1] === endNode.pos[1]
        ) {
            return true
        }
        false
    }

    constructor() {
        this.x = 8
        this.y = 8
        this.board = this.buildBoard()
        this.graph = this.buildGraph()
    }
}

const x = new chessBoard()
x.knightWalk()
x.visual
