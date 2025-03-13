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
        let curNode = null
        let startNode = this.graph[this.findNodeInd(start)]
        let endNode = this.graph[this.findNodeInd(end)]
        let stack = []
        stack.push({ n: startNode, s: 0 })

        while (stack.length > 0 && c < 100) {
            c++
            curNode = stack.shift()
            way = way.slice(0, curNode.s)
            way.push(curNode.n)
            const win = this.isWin(curNode.n, endNode)
            switch (win) {
                case true:
                    return 
                    // variants.push(way.map((x) => x))
                    // continue
                case false:
                    break
                default:
                    way.push(endNode)
                    variants.push(way.map((x) => x))
                    continue
            }

            const possib = this.graph[this.findNodeInd(curNode.n.pos)].neib
            for (let i = 0; i < possib.length; i++) {
                const aaa = this.graph[this.findNodeInd(possib[i])]
                if (this.visit(aaa, way) === null) {
                    stack.push({ n: aaa, s: way.length })
                }
            }
        }
        console.log(variants)
        // console.log(sort(variants))
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
        const winNodeAr = endNode.neib.map((x) => x)
        winNodeAr.push(endNode.pos)
        for (let i = 0; i < winNodeAr.length; i++) {
            if (
                curNode.pos[0] === winNodeAr[i][0] &&
                curNode.pos[1] === winNodeAr[i][1]
            ) {
                if (winNodeAr.length === i - 1) {
                    return true
                }
                return winNodeAr[i]
            }
        }
        return false
    }

    constructor() {
        this.x = 8
        this.y = 8
        this.board = this.buildBoard()
        this.graph = this.buildGraph()
    }
}

const x = new chessBoard()
x.knightWalk([0, 0], [1, 0])
x.visual

function sort(array) {
    function splitAr(array) {
        if (array.length <= 1) {
            return array
        }
        let arL = array.slice(0, Math.floor(array.length / 2))
        let arR = array.slice(Math.floor(array.length / 2))

        return mergeAr(splitAr(arL), splitAr(arR))
    }

    function mergeAr(arL, arR) {
        let L = 0
        let R = 0
        let sorted = []
        while (L < arL.length && R < arR.length) {
            if (arL[L].length < arR[R].length) {
                sorted.push(arL[L])
                L++
            } else {
                sorted.push(arR[R])
                R++
            }
        }
        while (L < arL.length) {
            sorted.push(arL[L])
            L++
        }
        while (R < arR.length) {
            sorted.push(arR[R])
            R++
        }
        return sorted
    }
    function delDupl(sorted) {
        let idx = 1
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] !== sorted[i - 1]) {
                sorted[idx++] = sorted[i]
            }
        }
        return sorted.slice(0, idx)
    }
    let sorted = splitAr(array)
    return delDupl(sorted)
}
