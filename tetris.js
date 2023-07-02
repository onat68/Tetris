let tab = Array(100).fill(0)
let sens = 0
for (let i=0;i<tab.length;i++){
    tab[i]=0

}

let tetriO = [0,1,1,0,0,0,0,0,0,0,0,1,1]
let tetriI = [1,1,1,1,0,0,0,0,0,0]
let tetriT = [0,1,0,0,0,0,0,0,0,0,1,1,1]
let tetriL = [0,0,1,0,0,0,0,0,0,0,1,1,1]
let tetriJ = [1,0,0,0,0,0,0,0,0,0,1,1,1]
let tetriZ = [1,1,0,0,0,0,0,0,0,0,0,1,1]
let tetriS = [0,1,1,0,0,0,0,0,0,0,1,1,0]
let pieces = [tetriO,tetriI,tetriT,tetriL,tetriJ,tetriZ,tetriS]

let whereIsPiece = []

const pieceRandom = () => {
    return pieces[Math.floor(Math.random() * 7)]
}



const apparition = () => {
    let bloc=pieceRandom()
    for (let i=0;i<bloc.length;i++){
        if(bloc[i]==1){
            tab[i+3]=1
            whereIsPiece.push(i+3)
        }
    }
}

let newPlace = []

document.onkeyup = function(e) { 
    
    if (e.keyCode == 37){
        sens = -1
        deplacement(sens)

    }
    else if (e.keyCode == 39){
        sens = 1
        deplacement(sens)
    }

}

let newPlaceTemp = []
let whereIsPieceTemp = []
let needToBeMoved = false

function moveInTab() {
    for(let y = 0;y<whereIsPiece.length;y++){
        tab[whereIsPiece[y]]=0
    }
    whereIsPiece = newPlaceTemp
    for(let y = 0;y<whereIsPiece.length;y++){
        tab[whereIsPiece[y]]=1
    }

    document.body.innerHTML = ""
    arrayGeneration()
    sens = 0
    newPlaceTemp = []

    needToBeMoved = false

}

const deplacement = (sens) => {  // sens prendra la valeur -1 pour la gauche et 1 pour la droite
    for(let y = 0;y<whereIsPiece.length;y++){
        newPlaceTemp.push(whereIsPiece[y]+sens)
    }
    needToBeMoved = true
}

const moveDown = () => {
    for(let i = 0;i<whereIsPiece.length;i++){
        newPlace.push(whereIsPiece[i]+10)
    }
    if (downIsPossible()==true){
        for(let i = 0;i<whereIsPiece.length;i++){
            tab[whereIsPiece[i]]=0
        }
        whereIsPiece = newPlace
        for(let i = 0;i<whereIsPiece.length;i++){
            tab[whereIsPiece[i]]=1
        }
    }
    else{
        return false
    }
    newPlace = []
    
}

const downIsPossible = () => {
    for(let i = 0;i<whereIsPiece.length;i++){
        if(tab[newPlace[i]]==1 && whereIsPiece.includes(newPlace[i])==false || newPlace[i]>=tab.length){
            return false
        }
    }
    return true
}

const arrayGeneration = () => {
    let htmlContent = ''
    for (let i = 0; i < tab.length; i++) {
      const blockType = tab[i] === 1 ? 'block' : 'rien'
      const lineBreak = (i - Math.floor(i / 10) * 10) === 9 ? '</br>' : ''
      htmlContent += `<span class="${blockType}" id="tab${i}">${tab[i]}</span>${lineBreak}`
    }
    document.body.innerHTML = htmlContent
  }
    

apparition()
arrayGeneration()

let previousTime = 0;
let interval = 1000;

function gamePlay(currentTime) {
    if(currentTime - previousTime >= interval){
        previousTime = currentTime
        if(downIsPossible()==true){
            document.body.innerHTML = ""
            moveDown()
            arrayGeneration()
            if(needToBeMoved==true){
                moveInTab()
            }
    }
        else {
            whereIsPiece = []
            apparition()
            newPlace = []
            for(let i = 0;i<whereIsPiece.length;i++){
                newPlace.push(whereIsPiece[i]+10)
            }

    }
}
requestAnimationFrame(gamePlay)
}

requestAnimationFrame(gamePlay)
    

    