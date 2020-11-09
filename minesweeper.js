function addNeighborAtPosition(node, node_hex_grid, x, y) {
    if (x >= 0 && x < node_hex_grid.length && y >= 0 && y < node_hex_grid[x].length) {
        node_hex_grid[x][y].addNeighbor(node)
    }
}

function Minesweeper(size, parent_element, grid_id, gameOver) {
    const board = new HexagonalGrid(size)

    board.dom_element.id = grid_id

    parent_element.replaceChild(board.dom_element, parent_element.querySelector(`#${grid_id}`))

    const totalHexagons = 1 + 3 * size * (size - 1)
    let totalMines = 0

    function placeMine(probability) {
        const mine = Math.random() < probability
        if (mine) {
            totalMines += 1
        }
        return mine
    }

    const grid = board.grid.map((column, x) =>
        column.map((hexagon, y) => new Node(hexagon, true, placeMine(0.1)))
    )

    let foundHexagons = 0

    function found(node) {
        if (node.mine) {
            return
        }

        foundHexagons += 1
        if (foundHexagons == totalHexagons - totalMines) {
            gameOver(true)
        }
    }

    grid.forEach((column, x) => {
        column.forEach((node, y) => {
            addNeighborAtPosition(node, grid, x, y + 1)
            addNeighborAtPosition(node, grid, x, y - 1)
            addNeighborAtPosition(node, grid, x - 1, y)
            addNeighborAtPosition(node, grid, x + 1, y)

            if (x < size - 1) {
                addNeighborAtPosition(node, grid, x - 1, y - 1)
                addNeighborAtPosition(node, grid, x + 1, y + 1)
            } else if (x > size - 1) {
                addNeighborAtPosition(node, grid, x - 1, y + 1)
                addNeighborAtPosition(node, grid, x + 1, y - 1)
            } else {
                addNeighborAtPosition(node, grid, x - 1, y - 1)
                addNeighborAtPosition(node, grid, x + 1, y - 1)
            }

            function checkForMines() {
                if (node.mine) {
                    grid.forEach((column) => column.forEach((node) => node.reveal(false)))
                    setTimeout(gameOver, 1000);
                }
            }

            node.hexagon.dom_element.addEventListener('click', checkForMines)
            node.addEventListener('reveal', found)
        })
    })
}