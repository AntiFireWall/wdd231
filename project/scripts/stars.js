const starBox = document.querySelector("#starBox");

function createStars(amount)
{
    for(let i = 0; i < amount; i++)
    {
        // Time value arrays
        const delay = [0.5, 1, 1.5, 2];
        const speed = [1, 2, 3, 4, 5, 6]  
        
        // Font size array
        const size = [15, 20, 30]

        const star = document.createElement("p");
        star.textContent = "•";
        star.classList.add("stars");
        star.setAttribute("style", `top: ${Math.floor(Math.random(86) *100)}%;right: ${Math.floor(Math.random(96) *100)}%;font-size: ${size[Math.floor(Math.random() * size.length)]}px;animation: ${speed[Math.floor(Math.random() * speed.length)]}s flicker ${delay[Math.floor(Math.random() * delay.length)]}s infinite alternate;`);

        starBox.appendChild(star);
    }
}

createStars(25);