const message = document.querySelector("#thankyou")
const data = document.URL.split("?")[1].split("&")

function displayInformation()
{
    const firstName = document.createElement("p");
    const lastName = document.createElement("p");
    const email = document.createElement("p");
    const phoneNumber = document.createElement("p");
    const businessName = document.createElement("p");
    const timeStamp = document.createElement("p");

    firstName.innerHTML = `<b>First Name</b>: ${getData("fname")}`
    lastName.innerHTML = `<b>Last Name</b>: ${getData("lname")}`
    email.innerHTML = `<b>Email</b>: ${getData("email")}`
    phoneNumber.innerHTML = `<b>Phone Number</b>: ${getData("phone")}`
    businessName.innerHTML = `<b>Business Name</b>: ${getData("organization")}`
    timeStamp.innerHTML = `<b>Time Stamp</b>: ${getData("timestamp")}`

    message.appendChild(firstName)
    message.appendChild(lastName)
    message.appendChild(email)
    message.appendChild(phoneNumber)
    message.appendChild(businessName)
    message.appendChild(timeStamp)
}

function getData(item)
{
    let value = ""
    data.forEach(line => {
        if(line.startsWith(item))
            {
                value = line.split("=")[1].replace("%40", "@").replaceAll("+", " ").replaceAll("%28", "(").replaceAll("%29", ")").replaceAll("%2B", "+").replaceAll("%3A", ":")
            }
    });
    return value;
}

displayInformation();