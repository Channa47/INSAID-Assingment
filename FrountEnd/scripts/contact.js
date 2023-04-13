
function SaveQuary() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let quary = document.getElementById("quary").value;

  if (name.length < 3) {
    alert("Please Enter a Valid Name");
    document.getElementById("name").style.border = "1px solid red"
    return;
  }
  if (email.length <= 10) {
    document.getElementById("email").style.border = "1px solid red"
    alert("Please Enter a valid Email");
    return;
  }
  if (!CheckEmail(email)) {
    alert("Please Enter a valid Email");
    return;
  }
  //  const { name, email, quary,responded } = req.body;
  document.getElementById("SubmitButton").innerText = null;
  document.getElementById("SubmitButton").innerText = "Loading";
  let data = { name: name, email: email, quary: quary, responded: false }
  fetch("https://insaidapi.onrender.com/quary/", {
    method: "post",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(data),
  })
    .then((r) => r.json())
    .then((r) => {
      document.getElementById("SubmitButton").innerText = null;
      document.getElementById("SubmitButton").innerText = "SUBMIT";
      alert(r.msg);
      window.location.href  = "index.html"
    //   console.log(r.msg);
    })
    .catch((e) => {
    //   console.log(e);
      document.getElementById("SubmitButton").innerText = null;
      document.getElementById("SubmitButton").innerText = "SUBMIT";
      alert(e);
    });
}
function CheckEmail(s) {
  let c = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "@") {
      c++;
    }
  }
  return c === 1;
}
