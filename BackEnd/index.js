const express = require("express");
const cors = require("cors");
const AdminModel = require("./Models/AdminModel");

const connection = require("./db");
const QuaryModel = require("./Models/QuaryModel");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hii");
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let Admin = await AdminModel.find({ username: username });
    if (Admin.length > 0) {
      if (Admin[0].password === password) {
        res.send({ msg: "Login Success" });
      } else {
        res.send({ msg: "Wrong Password" });
      }
    } else {
      res.send({ msg: "Admin Not Exist" });
    }
  } catch (e) {
    res.send({ msg: e });
  }
});
app.post("/reg", async (req, res) => {
  const { username, password } = req.body;
  try {
    let newAdmin = new AdminModel({ username, password });
    await newAdmin.save();
    res.send({ msg: "Admin Added" });
  } catch (e) {
    res.send({ msg: "Server Error" });
  }
});
app.post("/quary", async (req, res) => {
  const { name, email, quary,responded } = req.body;
  try{
   let newQuary = new QuaryModel({name, email , quary,responded});
   await newQuary.save();
   res.send({msg:"Your request is Submitted"})
  }catch(e){
    res.send({msg:"Server Error"})
  }
});
app.patch("/quary/:id",async (req,res)=>{
   let id = (req.params.id);
     try{
        let itme = await QuaryModel.findByIdAndUpdate(id,{responded : true});
        res.send({msg:"Status Changed"})
     }catch(e){
        console.log(e);
        res.send({msg:"Error"})
     }
})
app.get("/quary", async (req, res) => {
    try{
     let All = await QuaryModel.find();
     res.send({data:All})
    }catch(e){
      res.send({msg:"Server Error"})
    }
  });



app.listen(8080, async () => {
  try {
    connection;
    console.log("Connected");
  } catch (e) {
    console.log(e);
  }
  console.log("Server Running");
});
