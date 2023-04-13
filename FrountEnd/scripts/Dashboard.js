let isAuth = (localStorage.getItem("isAuthenticatedForINSAID")) || false;
    function CheckAuth() {
        if (isAuth) {
            document.getElementById("HideDiv").style.display = "none"
        } else {
            document.getElementById("HideDiv").style.display = "block"
        }
    }
    CheckAuth()
    function Login() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username.length != 5) {
            alert("try username as 'admin' :) ")
            document.getElementById("username").style.border = "2px solid red"
            return;
        }
        if (password.length != 8) {
            alert("try password as 'password' :) ");
            document.getElementById("password").style.border = "2px splid red"
            return;
        }
        let data = { username: username, password: password };
        document.getElementById("LoginButton").innerText = null;
        document.getElementById("LoginButton").innerText = "Loading";
        fetch("https://insaidapi.onrender.com/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(r => r.json())
            .then((r) => {
                console.log(r.msg)
                if (r.msg === "Login Success") {
                    document.getElementById("LoginButton").innerText = null;
                    document.getElementById("LoginButton").innerText = "SUBMIT";
                    localStorage.setItem("isAuthenticatedForINSAID", true)
                    alert(r.msg);
                    window.location.href = "./Dashboard.html"
                } else {
                    document.getElementById("LoginButton").innerText = null;
                    document.getElementById("LoginButton").innerText = "SUBMIT";
                    alert(r.msg)
                }
            })
            .catch((e) => {
                document.getElementById("LoginButton").innerText = null;
                document.getElementById("LoginButton").innerText = "SUBMIT";
                console.log(e);
            })
    }


    function fetchData() {
        fetch("https://insaidapi.onrender.com/quary/")
            .then(r => r.json())
            .then((r) => {
                console.log(r.data)
                AppEndData(r.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }
    fetchData()

    function AppEndData(data) {
        let container = document.getElementById("Table");
        container.innerHTML = null;
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerText = "Quary"
        let th2 = document.createElement("th");
        th2.innerText = "Name"
        let th3 = document.createElement("th");
        th3.innerText = "Toggle"
        // <tr>
        //         <th>Quary</th>
        //         <th>Name</th>
        //         <th>Toggle</th>
        //     </tr>
        container.append(tr, th1, th2, th3)
        data.forEach((e) => {
            let tr = document.createElement("tr");

            let textareaContainer = document.createElement("td");  //td1
            textareaContainer.setAttribute("class", "TextArea_Container");
            // let teaxtarea = document.createElement("textarea");
            // teaxtarea.setAttribute("class", "textarea_ele")
            // teaxtarea.readOnly = true
            // teaxtarea.innerText = e.quary;
            // textareaContainer.append(teaxtarea);
            textareaContainer.innerText = e.quary

            let EmailContainer = document.createElement("td") //td2
            EmailContainer.setAttribute("class", "Email_Conatiner")
            EmailContainer.innerText = e.name

            let btnsContainer = document.createElement("td") //td3
            btnsContainer.setAttribute("class", "Buttons_Conatinaer");

            let ancor = document.createElement("a");
            ancor.innerText = "Respond";
            ancor.href = `mailto:${e.email}`

            let ToggleButton = document.createElement("button");
            ToggleButton.innerText = "Mark As Respoded";

            btnsContainer.append(ancor);

            tr.append(textareaContainer, EmailContainer, btnsContainer)
            container.append(tr)
        })
    }