fetch('http:localhost:3500/login', {
    method: "POST",
    body: JSON.stringify({
        email: "samip@gmail.com",
        password: "1234qwer",
    }),
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie('token')}`
    }

}).then(res => res.json()).then(data => {
    localStorage.setItem()
    console.log(data)
})

// fetch("", { method: "", {} })

const getCookie = (c_name) => {
    const cookie = document.cookie;

    const ls = cookie.split(";");
    const reqCookie = ls.find((c) => c.includes(c_name));
    if (reqCookie) {
        return reqCookie.split("=")[1];
    }
    return "";
};