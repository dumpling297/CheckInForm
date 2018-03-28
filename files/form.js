var count=0;
var count2=0;
var id = "";
function init(){
  addForms();
}

function addEmail(x) {
    var b = document.getElementById(x);
    var formid = b.parentNode.id;
    var form = document.getElementById(formid);
    var nwEmail = document.createElement("input");
    nwEmail.setAttribute("placeholder", "email");
    nwEmail.setAttribute("type", "email");
    form.insertBefore(nwEmail, b);


}

function addForms() {
  //one full form sectioned to fields
  count2++;
  var form = document.getElementById("form");
  var nwField = document.createElement("fieldset");
  var idF = "field"+count2;
  nwField.setAttribute("id",idF);
  var legend = document.createElement("legend");
  var user = "user "+count2;
  var button = document.getElementById("addforms");
  legend.innerHTML = "User "+count2;

  var name = document.createElement("label");
  name.innerHTML = "Name:  ";
  var nInput = document.createElement("input");
  var lInput = document.createElement("input");
  nInput.setAttribute("placeholder", "first");
  nInput.setAttribute("type", "text");
  nInput.setAttribute("name", "FirstName");
  lInput.setAttribute("placeholder", "last");
  lInput.setAttribute("type", "text");
  lInput.setAttribute("name", "LastName");
  name.appendChild(nInput);
  name.appendChild(lInput);

  var b = document.createElement("label");
  b.innerHTML ="Birthday:  ";
  var birthday = document.createElement("input");
  birthday.setAttribute("placeholder", "birthday");
  birthday.setAttribute("type", "date");
  birthday.setAttribute("name", "birthday");
  b.appendChild(birthday);

  var e = document.createElement("label");
  e.innerHTML = "Email:  ";
  var email = document.createElement("input");
  email.setAttribute("placeholder","email");
  email.setAttribute("type", "email");
  email.setAttribute("name", "email");
  e.appendChild(email);

  var emInput = document.createElement("input");
  var ide = "email"+count2;
  emInput.setAttribute("id", ide);
  emInput.setAttribute("type", "button");
  emInput.setAttribute("value", "+");
  emInput.setAttribute("onclick", "addEmail(id)");

  nwField.appendChild(legend);
  nwField.appendChild(name);
  nwField.appendChild(document.createElement("br"));
  nwField.appendChild(b);
  nwField.appendChild(document.createElement("br"));
  nwField.appendChild(e);
  nwField.appendChild(emInput);
  form.appendChild(nwField);

}



function thank() {
if(confirm("Thank you for your submission!")) {
txt = "OK!";
}
}
