//Consts
const container = document.querySelector("#container")
const height = parseInt(window.getComputedStyle(container).height)
const btn = document.querySelector(".btn")
const randBtn = document.querySelector(".random-btn")




//event listener
btn.addEventListener("click",showPromptMenu)
randBtn.addEventListener("click",toogleRandomized)


//functions
function createGrid(square){

    //clear container 
    container.innerHTML = ""


    //const
    const row_width = height
    const row_height = parseInt(height/square)
    const col_height = parseInt(height/square)
    

    for (let i = 0; i < square; i++) {
        //create row div
        const row_div = document.createElement("div")

        //row div basic css properties
        row_div.style.display = "flex"
        row_div.style.height = convertToPX(row_height)
        row_div.style.width = convertToPX(row_width)

        //create col dives
        for (let j = 0; j < square; j++) {
            //create col div
            const col_div = document.createElement("div")

            //col div basic css property
            col_div.style.height = convertToPX(col_height)
            col_div.style.width = convertToPX(col_height)
            col_div.style.border = "1px solid #999999"
            col_div.style.backgroundColor = "black"

            //add event listener
            col_div.addEventListener("mouseenter",createHoverEffect)
            col_div.addEventListener("mouseleave",removeHoverEffect)

            //add to row div
            row_div.appendChild(col_div)
        }




        //add row to container
        container.appendChild(row_div)      
    }

}

function convertToPX(num){
    return num + "px"

}

function createHoverEffect(e){

    if(randBtn.classList.contains("active")){
        e.target.style.backgroundColor = randomizeColor()
    }else{
        e.target.style.backgroundColor = "white"
    }
   
    
}

function removeHoverEffect(e){
        setTimeout(()=>{
            e.target.style.backgroundColor = "black"
        },700)
    
   
    
}
function showPromptMenu(){
    let input;
    do{
    input = parseInt(prompt("Hoy many square do you want?"))}
    while(isNaN(input) || input > 100)
    createGrid(input)

}

function randomizeColor(){
    let hue; //0-360
    let saturation; //0-100%
    let lightness = "50"; 
    hue = parseInt(Math.random()*361)
    saturation = parseInt(Math.random()*101)
    return `hsl(${hue},${saturation}%,${lightness}%)`


}

function toogleRandomized(e){
    randBtn.classList.toggle("active")
    

}

createGrid(50)
randomizeColor()

