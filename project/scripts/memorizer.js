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

async function isEnter(key)
{
    let isTrue = key.code == "Enter" 
    if(isTrue)
    {
        await getScriptureFromInput(sRef.value);
        cardBox.innerHTML == "" ? displayVerse(await getVerseFromLS(1), 1) : false
    } else
    {
        return
    }
}

async function getScriptureFromInput(ref)
{
    const refInfo = ref.split(" ");
    sRef.value = ""
    let script;
    refInfo.length > 1 ? script = (await apiFetch(`https://corsproxy.io/?url=https://api.nephi.org/scriptures/?q=${refInfo[0]}+${refInfo[1].replaceAll(":", "%3A")}`)) : console.log("Invalid Text");
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
    const scriptList = await apiFetch("./data/popularscriptures.json");

    for(let i = 0; i < amount; i++ )
    {
        let rnd = Math.floor(Math.random() * scriptList.length);
        addScriptureToList(scriptList[rnd]);
    }
}

async function getVerseFromLS(index)
{
    let verse = await localStorage.getItem("scriptures").split("%")[index].split("+")
    return verse
}

function displayVerse(vers, indexNum)
{
    const title = document.createElement("h3");
    const text = document.createElement("p");
    const index = document.createElement("p")
    index.textContent = indexNum;
    index.classList.add("index");

    title.textContent = `${vers[0]}`;
    text.textContent = `${vers[1]}`;

    cardBox.appendChild(title);
    cardBox.appendChild(text);
    cardBox.appendChild(index)
}

function hideWord(text)
{
    let textArray = text.split(" ")
    let rnd = 0;
    let word = "_";
    while(word.includes("_"))
    {
        rnd = Math.floor(Math.random() * textArray.length)
        word = textArray[rnd]
    }
    let length = word.length
    let newWord = "";
    for(let i = 0; i < length; i++)
    {
        newWord += "_"
    }
    textArray[rnd] = newWord
    let fullText = "";
    let indexNum = 0;
    textArray.forEach(element => {
        if((indexNum+1) != textArray.length)
        {
            fullText += `${element} `
        } else
        {
            fullText += `${element}`
        }
        indexNum++
    });
    return fullText
}

// Button Methods

async function customScriptureListButton()
{
    clearLocalStorage()
    memorizerMenu.classList.toggle("fade-out")
    memorizerMenu.style.display = "none"
    memorizerGame.style.display = "flex"
    memorizerGame.classList.toggle("fade-in")
}

async function preScriptureListButton()
{
    clearLocalStorage()
    memorizerMenu.classList.toggle("fade-out")
    memorizerMenu.style.display = "none"
    memorizerGame.style.display = "flex"
    memorizerGame.classList.toggle("fade-in")
    await getScriptureFromLocal(5)
    displayVerse(await getVerseFromLS(1), 1)
}

async function nextVerse() {
    let index = cardBox.children[2].textContent
    cardBox.innerHTML = ""
    index++
    index > sListBox.children.length ? index = 1 : index;
    displayVerse(await getVerseFromLS(index), index)
}

async function pastVerse() {
    let index = cardBox.children[2].textContent
    cardBox.innerHTML = ""
    index -= 1
    index < 1 ? index = sListBox.children.length : index;
    displayVerse(await getVerseFromLS(index), index)
}

async function hideParts() {
    let text = cardBox.children[1].textContent
    let isHidden = 0
    text.split(" ").forEach(element => {
        element.includes("_") ? isHidden++ : false
    });
    if (isHidden == text.split(" ").length)
    {
        return;
    }
    cardBox.children[1].textContent = hideWord(text);
    console.log("hide")
}

async function showVerse() {
    let index = cardBox.children[2].textContent
    cardBox.innerHTML = ""
    displayVerse(await getVerseFromLS(index), index)
}