import {sites} from "../data/sites.mjs"
const siteGallery = document.querySelector(".sites-gallery");
const message = document.querySelector("#visit");
const lastDate = localStorage.getItem("lastDate");
console.log(lastDate)

sites.forEach(site => {
    const name = document.createElement("h2");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const imageFig = document.createElement("figure");
    const image = document.createElement("img");
    const siteCard = document.createElement("div");
    const learnMore = document.createElement("button");

    siteCard.classList.add("site-card");
    name.textContent = site.name;
    address.textContent = site.address;
    description.textContent = site.description;
    image.src = site.image_url;
    image.alt = site.name;
    imageFig.appendChild(image);
    learnMore.textContent = `Learn More`
    
    siteCard.appendChild(name);
    siteCard.appendChild(imageFig);
    siteCard.appendChild(description);
    siteCard.appendChild(address);
    siteCard.appendChild(learnMore);

    siteGallery.appendChild(siteCard);
});

function setLastDate() 
{
    localStorage.setItem("lastDate", new Date())
}

function setMessage()
{
    if(lastDate == null)
    {
        message.textContent = `Welcome! Let us know if you have any questions.`;
    } else if(((new Date().getHours()) - (new Date(lastDate).getHours())) <= 24) 
    {
        message.textContent = `Back so soon! Awesome!`;
    } else
    {
        let days = (new Date().getDate()) - (new Date(lastDate).getDate())
        message.textContent = `You last visited ${days != 1 ? `${days} days` : `${days} day`} ago.`; 
    }
}

setLastDate();
setMessage();