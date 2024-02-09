//Consts
const container = document.querySelector("#container")
const height = parseInt(window.getComputedStyle(container).height)



function createGrid(square){
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
            col_div.style.border = "1px solid darkgrey"

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

createGrid(50)

