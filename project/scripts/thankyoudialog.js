const dialog = document.querySelector("#thankyou");
const closeBtn = document.querySelector("#exit");

if (document.URL.includes("?")) 
{
    dialog.showModal();

    // storing data into local storage
    const data = document.URL.split("?")[1]
    .replaceAll("%40", "@")
    .replaceAll("+", " ")
    .replaceAll("%28", "(")
    .replaceAll("%29", ")")
    .replaceAll("%3A", "-")
    .split("&")
    // console.log(data)

    let object = {};
    let array = []
    data.forEach(element => {
        let stuff = element.split("=");
        object[stuff[0]] = stuff[1];

        array.push(element);
    });
    // console.log(object);
    // console.log(array);


    localStorage.setItem("bugReport", array)
}



closeBtn.addEventListener("click", hide);

function hide () 
{
    dialog.close();
    window.location.href = "./thankyou.html";
}