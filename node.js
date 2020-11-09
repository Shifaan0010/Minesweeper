class Node {
    constructor(hexagon, hidden, mine) {
        this.hexagon = hexagon

        this.hidden = hidden

        this.neighbors = []

        this.mine = mine
        this.neighbor_mines = 0

        this.hexagon.dom_element.addEventListener('click', () => {
            if (this.hidden) {
                this.reveal()
            }
        })

        this.eventListeners = {
            reveal : []
        }
    }

    addEventListener(name, foo) {
        this.eventListeners[name].push(foo)
    }

    get mine() {
        return this._mine
    }

    set mine(value) {
        this._mine = value
        if (this._mine) {
            this.hexagon.content.classList.add('mine')
            this.hexagon.content.textContent = ''
        } else {
            this.hexagon.content.classList.remove('mine')
        }
    }

    get neighbor_mines() {
        return this._neighbor_mines
    }

    set neighbor_mines(value) {
        this._neighbor_mines = value
        if (!this.mine) {
            this.hexagon.content.textContent = this._neighbor_mines
        }
    }

    get hidden() {
        return this._hidden
    }

    set hidden(value) {
        this._hidden = value
        if (this._hidden) {
            this.hexagon.content.classList.add('hidden')
        } else {
            this.hexagon.content.classList.remove('hidden')
        }
    }

    reveal(callbacks = true) {
        if (!this.hidden) {
            return
        }

        this.hidden = false

        this.hexagon.dom_element.style.setProperty('opacity', 0.3 + 0.7 * (this.neighbor_mines / 5))

        if (this.neighbor_mines == 0 && !this.mine) {
            this.neighbors.forEach((neighbor) => {
                if (neighbor.hidden) {
                    neighbor.reveal()
                }
            })
        }

        if (callbacks) {
            this.eventListeners.reveal.forEach((f) => f(this))
        }
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor)
        if (neighbor.mine) {
            this.neighbor_mines += 1
        }
    }
}