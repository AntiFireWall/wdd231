const currentyear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const hiddenInput = document.querySelector('#hidden');
const lastModifiedDate = new Date(document.lastModified);
const today = new Date();
if (hiddenInput) {
    hiddenInput.value = Date()
}

currentyear.innerHTML = today.getFullYear()
lastModified.innerHTML = `Last Modified: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;