const memorizerMenu = document.querySelector("#memorizer-menu");
function clearLocalStorage()
{
    localStorage.removeItem("scriptures")
}

// Getting data Method

async function apiFetch(url)
{
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// Animation Methods

function fadeOut(element)
{
    memorizerMenu.classList.toggle("fade-out")
}

function fadeIn(element)
{
    memorizerMenu.classList.toggle("fade-in")
}

// Memorizer Methods Var

const memorizerGame = document.querySelector("#memorizer-game");
const sListBox = document.querySelector("#s-list");
const sRef = document.querySelector("#s-ref");
const cardBox = document.querySelector("#card-box")
let sList = [];

// List methods

sRef.addEventListener("keydown", isEnter)

function isEnter(key)
{
    let isTrue = key.code == "Enter" 
    isTrue ? getScriptureFromInput(sRef.value) : false
}

async function getScriptureFromInput(ref)
{
    const refInfo = ref.split(" ");
    sRef.value = ""
    let script;
    refInfo.length > 1 ? script = (await apiFetch(`https://proxy.corsfix.com/?https://api.nephi.org/scriptures/?q=${refInfo[0]}+${refInfo[1].replaceAll(":", "%3A")}`)) : console.log("Invalid Text");
    script != null && script.scriptures.length != 0 ? addScriptureToList(script.scriptures[0]) : false
}

function addScriptureToList(script)
{   
    let scriptures = localStorage.getItem("scriptures") != null ? localStorage.getItem("scriptures") : "";
    
    const item = document.createElement("li");
    const ref = document.createElement("h3");
    const text = document.createElement("p");

    const scriptText = `${script.scripture}+${script.text}`

    ref.innerHTML = `<strong>${script.scripture}</strong>`;
    text.textContent = `"${script.text}"`;
    item.appendChild(ref);
    // item.appendChild(text);

    sListBox.appendChild(item);
    
    scriptures = scriptures + "%" + scriptText
    localStorage.setItem("scriptures", scriptures);
}

async function getScriptureFromLocal(amount)
{
    const scriptList = await apiFetch("../data/popularscriptures.json");

    for(let i = 0; i < amount; i++ )
    {
        let rnd = Math.floor(Math.random() * scriptList.length);
        addScriptureToList(scriptList[rnd]);
    }
}

async function getVerseFromLS(index)
{
    let verse = localStorage.getItem("scriptures").split("%")[index].split("+")
    console.log(verse)
    return verse
}

function displayVerse(vers)
{
    const title = document.createElement("h3");
    const text = document.createElement("p");

    title.textContent = `${vers[0]}`;
    text.textContent = `${vers[1]}`;

    cardBox.appendChild(title);
    cardBox.appendChild(text);
}

// Button Methods

function customScriptureListButton()
{
    memorizerMenu.classList.toggle("fade-out")
    memorizerMenu.style.display = "none"
    memorizerGame.style.display = "flex"
    memorizerGame.classList.toggle("fade-in")
}

function preScriptureListButton()
{
    memorizerMenu.classList.toggle("fade-out")
    memorizerMenu.style.display = "none"
    memorizerGame.style.display = "flex"
    memorizerGame.classList.toggle("fade-in")
    getScriptureFromLocal(5)
}