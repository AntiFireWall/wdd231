import {sites} from "../data/sites.mjs"
const siteGallery = document.querySelector(".sites-gallery");
console.log(siteGallery)

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
    imageFig.appendChild(image);
    learnMore.textContent = `Learn More`
    
    siteCard.appendChild(name);
    siteCard.appendChild(imageFig);
    siteCard.appendChild(description);
    siteCard.appendChild(address);
    siteCard.appendChild(learnMore);

    siteGallery.appendChild(siteCard);
});