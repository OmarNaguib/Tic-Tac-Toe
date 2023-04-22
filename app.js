/* eslint-disable no-underscore-dangle */
const gameboard =(() =>{
    let values = Array(9).fill(null);
    const createNew = () => {
        values = Array(9).fill(null)
    }
    function updateValue(index,sign){
        values[index]=sign
    }

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
        getLines,
        updateValue,
        createNew,

    }
})();

const game =(() =>{
    let turn ="x"
    const checkWin= (lines) =>{
        for (let i=0;i<lines.length;i++) {
            if (lines[i].toString() == Array(3).fill("x").toString()) return "x"
            if (lines[i].toString() == Array(3).fill("y").toString()) return "y"
        }
    }

    const checkDraw = (lines) => {
        for (let i=0;i<lines.length;i++) {
            for (let j=0;j<3;j++) {
                if (lines[i][j] === null) return false
            }
        }
        return "draw"
    }


    const checkGameStatus=() => {
        const lines=gameboard.getLines()
        const win=checkWin(lines);
        const draw=checkDraw(lines);

        return [!!(win||draw),win||draw]
    }
    const alternateTurn = () =>{
        if (turn==="x") turn="o"
        else turn="x"
    }
    const removeListeners = () =>{
        const buttons= document.querySelectorAll(".square")
        buttons.forEach(button=>{
            button.removeEventListener("click",squareClick)
        })
    }
    const endGame = () =>{
        removeListeners();
        displayOutput();
    }
    const squareClick=(e) => {
        e.target.textContent=turn
        e.target.removeEventListener("click",squareClick)
        gameboard.updateValue(e.target.dataset.index,turn)
        alternateTurn()
        const [gameover,winner] = checkGameStatus();
        if (gameover) endGame();
    }
    

    const createSquare = (index) => {
        const square = document.createElement("button");
        square.classList.add("square")
        square.dataset.index=index
        square.addEventListener("click",squareClick)
        return square
    }
    const newGame = () =>{
        gameboard.createNew();
        const container = document.querySelector(".container")
        container.innerHTML=""
        for (let i=0;i<9;i++) {
            const square=createSquare(i);
            container.appendChild(square);
        }

    }
    return{
        newGame,
        removeListeners,
        squareClick,
    }
})();

const playerFactory = (nameInput) =>{
    const input=document.querySelector(`#${nameInput}`)
    let name=input.value;


    function changeName(e){
        console.log(name)
        this.name=e.target.value;
        console.log(name)
    }

    

    input.addEventListener("input",changeName)




    return{
        name,
    }
}



game.newGame();
const playerX=playerFactory("player-x")
const playerY=playerFactory("player-o")


