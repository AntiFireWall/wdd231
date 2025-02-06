const dialog = document.querySelectorAll("dialog")
const showButton = document.querySelectorAll("dialog + button");
const closeButton = document.querySelectorAll("dialog button");
console.log(dialog[0]);

for(let i = 0; i < 4; i ++)
{
    showButton[i].addEventListener("click", () => {dialog[i].showModal()})
    closeButton[i].addEventListener("click", () => {dialog[i].close()})
}