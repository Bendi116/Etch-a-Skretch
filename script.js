//Consts
const container = document.querySelector("#container")
const height = parseInt(window.getComputedStyle(container).height)
const btn = document.querySelector(".btn")
const randBtn = document.querySelector(".random-btn")
const lightBtn = document.querySelector(".l-btn")



//event listener
btn.addEventListener("click",showPromptMenu)
randBtn.addEventListener("click",toogleRandomized)
lightBtn.addEventListener("click",lightIncreaseMode)

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
            col_div.style.backgroundColor = "hsl(0,0%,0%)"

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

    if(randBtn.classList.contains("active") && !lightBtn.classList.contains("increase")){
        e.target.style.backgroundColor = randomizeColor()
    }else if(!randBtn.classList.contains("active") && lightBtn.classList.contains("increase")){
        e.target.style.backgroundColor = increaseLightness(e.target.style.backgroundColor)
    }else{
        e.target.style.backgroundColor = "hsl(0,0%,100%)"
    }
   
    
}

function removeHoverEffect(e){
    
    if(!lightBtn.classList.contains("increase") || (randBtn.classList.contains("active") && lightBtn.classList.contains("increase")))
    {
        setTimeout(()=>{
            e.target.style.backgroundColor = "hsl(0,0%,0%)"
        },700)
    }
        
    
   
    
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

function lightIncreaseMode(){
    lightBtn.classList.toggle("increase")
    
}

function increaseLightness(color){
    let rgb = getRGB(color)
    hsl = RGBtoHSL(...rgb)
    return changaLightness(10,hsl)

}

//from others
function getRGB(rgb){
    let rgb_array = rgb.split(",")
    //r
    let r = rgb_array[0].slice(rgb_array[0].indexOf("(")+1)

    //g
    let g = rgb_array[1].trim()
    
    //b
    let b = rgb_array[2].slice(0,rgb_array[2].indexOf(")"))
    return [r,g,b]
}
function RGBtoHSL(r,g,b){
    //make r, g and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    //find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax-cmin,
        h = 0,
        s = 0,
        l = 0
    
    //calculate hue
    //no difference
    if (delta == 0) h = 0;
    else if( cmax == r) h = ((g - b) / delta)%6;
    else if(cmax == g)h = (b-r)/delta +2;
    else h = (r - g)/delta + 4;

    h = Math.round(h*60);

    //make negatives hues positive behind 360°
    if(h<0) h += 360;

    //calculate ligtness
    l = (cmax + cmin) / 2;

    //calculate saturation
    s = delta == 0 ?  0 : delta/(1- Math.abs(2 * l -1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl("+h+","+s+"%,"+l+"%)"


    
}
function changaLightness(delta, hslStr){
    const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
    
    
    const newLightness = Math.max(
        0,
        Math.min(100, lightness + Number.parseFloat(delta))
    );

    return `hsl(${hue},${saturation}%,${newLightness}%)`
}
//main


createGrid(50)
getRGB("rgb(100,100,100)")