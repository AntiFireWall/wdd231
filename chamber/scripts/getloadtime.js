const timeStamp1 = document.querySelector("#timestamp")

function getTime(event) 
{
    const time = new Date()
    timeStamp1.setAttribute("value", time)
}

document.addEventListener("DOMContentLoaded", getTime)