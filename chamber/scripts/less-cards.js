const cards = document.querySelector(".less-cards");

async function displayMembers()
{
    const members = await fetch("../chamber/data/members.json").then(async function(resp) {return await resp.json()});
    const topMembers = shuffleArray(members.filter((item) => item.membership_level > 1)).slice(0, 3);
    topMembers.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card")
        const cardInfo = document.createElement("div");
        cardInfo.classList.add("cardInfo");
        const cardInfoBox = document.createElement("div");
        cardInfoBox.classList.add("cardInfoBox");
        const name = document.createElement("h2");
        const tagLine = document.createElement("p");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const url = document.createElement("p");
        const image = document.createElement("img");
        image.setAttribute("alt", "logo");
        image.setAttribute("loading", "lazy");
        
        name.textContent = member.name;
        tagLine.textContent = member.other_information;
        address.innerHTML = `<b>Address</b>: ` + member.address;
        phone.innerHTML = `<b>Phone</b>: ` + member.phone_number;
        url.innerHTML = `<b>URL</b>: ` + member.website_url;
        image.setAttribute("src", `images/${member.image_icon_file}`);

        if(member.membership_level == 3)
        {
            cardInfo.classList.add("level3")
        } if (member.membership_level == 2) {
            cardInfo.classList.add("level2")
        } else {
            cardInfo.classList.add("level1")
        }

        card.appendChild(name);
        card.appendChild(tagLine);
        cardInfo.appendChild(image)
        cardInfoBox.appendChild(address);
        cardInfoBox.appendChild(phone);
        cardInfoBox.appendChild(url);
        cardInfo.appendChild(cardInfoBox);
        card.appendChild(cardInfo);

        cards.appendChild(card)
    });
}

function shuffleArray(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

displayMembers();
