

const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

document.getElementById("submit-signup").addEventListener("click", async () => {
    Notify("")
    const username = document.getElementById("username-box").value
    const email = document.getElementById("email-box").value
    const password1 = document.getElementById("password1-box").value
    const password2 = document.getElementById("password2-box").value

    if (!(password1 === password2)) return Notify("Passwords must match")
    if (!email.match(emailValidationPattern)) return Notify("Email is not valid")
    if (!(username.length >= 6)) return Notify("Username must be at least 6 characters")

    const response = await fetch("/api/users/signup", {
        method: "post",
        mode: "cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, username, password: password1})
    })

    const responseJSON = await response.json();
    if (responseJSON.error) {
        ClearAll()
        return Notify(responseJSON.error)
    }
    
    Notify("account created successfully")
    ClearAll()
})

function ClearAll() {
    document.getElementById("username-box").value = ""
    document.getElementById("email-box").value = ""
    document.getElementById("password2-box").value = ""
    document.getElementById("password1-box").value = ""
}

function Notify(message) {
    document.getElementById("user-notification").innerText = message
}