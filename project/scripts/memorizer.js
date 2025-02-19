const memorizerMenu = document.querySelector("#memorizer-menu");

// Getting data Methods

async function getLocalScripture()
{
    const popularScriptures = await (await fetch("../data/popularscriptures.json")).json()
    console.log(await popularScriptures)
}

async function getApiScripture()
{
    const popularScriptures = await (await fetch("https://api.nephi.org/scriptures/?q=mormon+1%3A1-")).json()
    console.log(await popularScriptures)
}

async function apiFetch(url)
{
    try {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'include'
          });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
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

// Memorizer Methods


apiFetch("https://api.nephi.org/scriptures/?q=mormon+1%3A1-");