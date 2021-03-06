const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let generalItems = ["Buy food", "Prepare food", "Eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let currentDate = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = currentDate.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: generalItems });
  
});

app.post("/", function (req, res) {
  
  let item = req.body.newItem;

  if(req.body.list === "Work"){
    
    workItems.push(item);
    res.redirect("/work");

  }
  else {
    generalItems.push(item); 
    res.redirect("/");
  }
  
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.get('/about', function(req, res){
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server listening on port 3000.  Press Ctr+C to exit.");
});
