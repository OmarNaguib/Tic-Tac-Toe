/* eslint-disable no-underscore-dangle */
const gameboard =(() =>{
    const values = Array(9).fill(null);

    const _rows = function () {
        const rows=[]
        for (let i=0;i<9;i+=3) {
            rows.push(values.slice(i,i+3))
        }
        return rows
    }

    const _columns = function () {
        const columns=[]
        for (let i=0;i<=2;i++) {
            const column=[]
            for  (let j=0;j<9;j+=3) {
                column.push(values[i+j])
            }
            columns.push(column)
        }
        return columns
    }
    
    const _diagonals = function () {
        const diagonals = [[values[0],values[4],values[8]],
                           [values[2],values[4],values[6]]];

        return diagonals;
    }

    const getLines = function () {
        return [..._rows(),..._columns(),..._diagonals()]
    }
    return {
        _rows,
        _columns,
        _diagonals,
        getLines
    }
})();

const game =(() =>{
    const newGame = () =>{
        const container = document.querySelector(".container")
        for (let i=1;i<=9;i++) {
            let square = document.createElement("button");
            square.classList.add("square")
            container.appendChild(square)
        }

    }
    return{
        newGame,
    }
})();

const playerFactory = (number) =>{

}

game.newGame();

