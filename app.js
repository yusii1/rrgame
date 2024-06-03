const gameboard = document.querySelector("#gameboard")
const playerdisplay= document.querySelector("#player")
const infodisplay = document.querySelector("info-display")
const width = 8
let playerGo = 'black'
playerdisplay.textContent='black'

const startpieces= [
    cannon,titan,tank,semiRicochet,ricochet,'','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','',cannon,titan,tank,semiRicochet,ricochet

]

function createboard() {
    startpieces.forEach((startpieces, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML=startpieces
        square.firstChild && square.firstChild.setAttribute('draggable',true)
        square.setAttribute('square-id',i)
        //square.classList.add('beige')
        const row= Math.floor((63-i)/8)+1
        if ( row % 2 === 0 ){
            square.classList.add(i%2===0 ? "beige" : "brown")
        } else{
            square.classList.add(i%2===0 ? "brown" : "beige")
        }
        if (i <=4){
            square.firstChild.firstChild.classList.add('black')
        }
        if(i>=59){
            square.firstChild.firstChild.classList.add('white')

        }

        gameboard.append(square)

    })
}
createboard()



 const allsquares = document.querySelectorAll(".square")
 allsquares.forEach(square=>{
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)

 })

 let startPositionId 
 let draggedElement
function dragStart(e) {
    startPositionId= e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target

}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e. target.classList.contains('piece')
    const valid =checkIfValid(e.target)
    const opponentGo= playerGo==='white' ?  'black ': 'white'
    const takenByOpponent =e.target.firstChild?.classList.contains(opponentGo)
    if (correctGo) {
        if(takenByOpponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkForWin()
            changePlayer()
            return


        }
        if(taken && !takenByOpponent){
            infodisplay.textContent = "you cannot go here!"
            setTimeout(()=> infodisplay.textContent="",2000)
            return
        }
        if(valid){
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
            
        }
    }


    
    changePlayer()



}

function checkIfValid(target){
    const targetId = Number( target.getAttribute('square-id')) ||Number( target.parentNode.getAttribute('square-id'))
    const startId= Number(startPositionId )
    const piece = draggedElement.id
    console.log(targetId)
    console.log('startId',startId)
    console.log('targetId', targetId)
    console.log('piece',piece) 



    switch(piece) {
        case 'cannon' :
            if (
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild ||
                startId + 3 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild ||
                startId + 4 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild ||
                startId + 5 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild ||
                startId + 6 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId + 5}"]').firstChild ||
                startId + 7 === targetId && !document.querySelector('[square-id="${startId + 1}"]').firstChild && !document.querySelector('[square-id="${startId + 2}"]').firstChild && !document.querySelector('[square-id="${startId + 3}"]').firstChild && !document.querySelector('[square-id="${startId + 4}"]').firstChild && !document.querySelector('[square-id="${startId + 5}"]').firstChild && !document.querySelector('[square-id="${startId + 6}"]').firstChild ||
                // --
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild ||
                startId - 3 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild ||
                startId - 4 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild ||
                startId - 5 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild ||
                startId - 6 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild ||
                startId - 7 === targetId && !document.querySelector('[square-id="${startId - 1}"]').firstChild && !document.querySelector('[square-id="${startId - 2}"]').firstChild && !document.querySelector('[square-id="${startId - 3}"]').firstChild && !document.querySelector('[square-id="${startId - 4}"]').firstChild && !document.querySelector('[square-id="${startId - 5}"]').firstChild && !document.querySelector('[square-id="${startId - 6}"]').firstChild 
            ) {
                return true
            }
            break;
        case 'titan' :
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId

            ) {
                return true
            }
            break;
        case 'tank' :
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId

            ) {
                return true
            }
            break;
        case 'semi ricochet' :
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId
            ) {
                return true
            }
            break;
         case ' ricochet':
            if(
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId
            ) {
                return true
            }

    }
     

}


function changePlayer(){
    if (playerGo ==="black"){
        reverseIds
        playerGo=" white"
        playerdisplay.textContent ='white'
    } else{
        revertIds
        playerGo= "black"
        playerdisplay.textContent ='black'
    }

}

function reverseIds(){
    const allSquares= document.querySelectorAll(".square")
    allSquares.forEach((square,i)=> 
        square.setAttribute('square-id', (width* width-1)-i))
}
function revertIds(){
    const allSquares= document.querySelectorAll(".square")
    allSquares.forEach((square, i)=> square.setAttribute('square-id', i))

}

function checkForWin() {
    const titans = Array.from(document.querySelectorAll('#Titan'))
    console.log(titans)
    if(!titans.some(titan=> titan.firstChild.classList.contains('white'))){
        infodisplay.innerHTML = "blackplayer wins!"
        const allsquares= querySelectorAll('.square')
        allsquares.forEach(square=> square.firstChild?.setAttribute('draggable',false))
    }
    if(!titans.some(titan=> titan.firstChild.classList.contains('black'))){
        infodisplay.innerHTML = "player wins!"
        const allsquares= querySelectorAll('.square')
        allsquares.forEach(square=> square.firstChild?.setAttribute('draggable',false))
    }
}
let timers = {
    1: {
        time: 300,  // 5 minutes in seconds
        running: false,
        interval: null
    },
    2: {
        time: 300,  // 5 minutes in seconds
        running: false,
        interval: null
    }
};

function updateTimer(player) {
    let mins = Math.floor(timers[player].time / 60);
    let secs = timers[player].time % 60;
    document.getElementById(`timer${player}`).textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(player) {
    if (!timers[player].running) {
        timers[player].running = true;
        timers[player].interval = setInterval(() => {
            timers[player].time--;
            updateTimer(player);
            checkWinner(player);
        }, 1000);
    }
}

function stopTimer(player) {
    if (timers[player].running) {
        timers[player].running = false;
        clearInterval(timers[player].interval);
    }
}

function resetTimer(player) {
    stopTimer(player);
    timers[player].time = 300;  // Reset to 5 minutes
    updateTimer(player);
    document.getElementById("result").textContent='time has reset';
}

function checkWinner(player) {
    if (timers[player].time <= 0) {
        stopTimer(1);
        stopTimer(2);
        const winner = player === 1 ? 2 : 1;
        document.getElementById("result").textContent = `Player ${winner} wins!`;
    }
}