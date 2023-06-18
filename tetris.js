let tab = []
tab.length = 50
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

let bloc=pieceRandom()


const apparition = () => {    
    for (let i=0;i<bloc.length;i++){
        if(bloc[i]==1){
            tab[i+3]=1
            whereIsPiece.push(i+3)
        }
    }
}

let newPlace = []
const deplacement = (sens) => { // sens prendra la valeur -1 pour la gauche et 1 pour la droite
    for(let i = 0;i<whereIsPiece.length;i++){
        newPlace.push(whereIsPiece[i]+sens)
    }
    for(let i = 0;i<whereIsPiece.length;i++){
        tab[whereIsPiece[i]]=0
    }
    whereIsPiece = newPlace
    for(let i = 0;i<whereIsPiece.length;i++){
        tab[whereIsPiece[i]]=1
    }
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
        if(tab[newPlace[i]]==1 && whereIsPiece.includes(newPlace[i])==false || newPlace[i]>=50){
            return false
        }
    }
    return true
}

const arrayGeneration = () => {
    for(let i=0;i<tab.length;i++){
        if(tab[i]==1){
            document.body.innerHTML += '<span class="block" id="tab'+i+'"></span>'
            document.getElementById("tab"+i).innerHTML=tab[i]
            if((i-((Math.floor(i/10)*10)))==9)
                document.body.innerHTML += '</br>'
        }
        else{
            document.body.innerHTML += '<span class="rien" id="tab'+i+'"></span>'
            document.getElementById("tab"+i).innerHTML=tab[i]
            if((i-((Math.floor(i/10)*10)))==9)
                document.body.innerHTML += '</br>'
        }
        
    }
}
    

apparition()
arrayGeneration()
const testTimer = () => {
        setTimeout(() => {
            if(downIsPossible()==true){
                moveDown()
                // console.log(tab.slice(0,10)+"\n"+tab.slice(10,20)+"\n"+tab.slice(20,30)+"\n"+tab.slice(30,40)+"\n"+tab.slice(40))
                // console.log("------------------------")
                arrayGeneration()
                testTimer()
            }
        },"1000")
}


testTimer()

// apparition()
// // console.log(whereIsPiece)
// console.log(tab.slice(0,10)+"\n"+tab.slice(10,20)+"\n"+tab.slice(20,30)+"\n"+tab.slice(30,40)+"\n"+tab.slice(40))

// moveDown()
// console.log(tab.slice(0,10)+"\n"+tab.slice(10,20)+"\n"+tab.slice(20,30)+"\n"+tab.slice(30,40)+"\n"+tab.slice(40))

