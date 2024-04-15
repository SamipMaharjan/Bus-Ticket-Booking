fetch('http:localhost:3500/login', {
    method: "POST",
    body: {
        email: "samip@gmail.com",
        password: "1234qwer",
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}).then(res => res.json()).then(data => {
    localStorage.setItem()
    console.log(data)
})