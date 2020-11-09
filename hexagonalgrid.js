class Hexagon {
    constructor() {
        this.dom_element = document.createElement('div')
        this.dom_element.classList.add('hexagon')

        this.content = this.dom_element.appendChild(document.createElement('div'))
        this.content.classList.add('hexagon-content')
    }
}

class HexagonalGrid {
    constructor(size) {
        this.dom_element = document.createElement('div')
        this.dom_element.classList.add('hexagonal-grid')
        this.dom_element.style.setProperty('grid-template-columns', `repeat(${2 * size - 1}, 1fr 2fr) 1fr`)

        this.grid = Array(2 * size - 1).fill().map((_, x) =>
            Array(size + Math.min(x, 2 * size - x - 2)).fill().map((_, y) => {
                const hexagon = new Hexagon()

                this.dom_element.appendChild(hexagon.dom_element)

                hexagon.dom_element.style.setProperty('grid-row-start', size + 2 * y - Math.min(x, 2 * size - x - 2))
                hexagon.dom_element.style.setProperty('grid-column-start', 2 * x + 1)

                return hexagon
            })
        )
    }
}