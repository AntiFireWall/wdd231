let data = localStorage.getItem("bugReport").split(",");
const infobox = document.querySelector("#infobox");

const displayName = document.createElement("h2");
const email = document.createElement("p");
const report = document.createElement("p");
const date = document.createElement("p");

displayName.innerHTML = `${data[0].split("=")[1]} ${data[1].split("=")[1]}`;
email.innerHTML = `We will send you an update to <b>${data[2].split("=")[1]}</b>`;
report.innerHTML = `This is what you wrote: <b>${data[3].split("=")[1]}</b>`;
date.innerHTML = `at: ${data[4].split("=")[1]}`;

infobox.appendChild(displayName);
infobox.appendChild(email);
infobox.appendChild(report);
infobox.appendChild(date);