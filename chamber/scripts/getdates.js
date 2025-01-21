const currentyear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const lastModifiedDate = new Date(document.lastModified);
const today = new Date();

currentyear.innerHTML = today.getFullYear()
lastModified.innerHTML = `Last Modified: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;