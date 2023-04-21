const gameboard =(() =>{
    const values = Array(9).fill(null)
    
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

