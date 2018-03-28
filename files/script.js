
$(document).ready(function () {
  console.log("Document Ready..");
  var flagCheckIn=false;
  /*$.ajax({
    method: 'get',
    url: it,
    data: ''
  });*/
});

//admin page -login credentials
function Landing(data){
  $.each(data, function() {
   if (this.Username=='admin' && this.Password=='1234'){
     document.location.href = 'landing.html';
     //change to dynamic view
   }
   else {
     alert("Incorrect Username or Password! Please try again.");
   }
 });
}
function Log(){
  $.ajax({
    method: 'post',
    url: '/admin-check',
    data: 'Username='+$('#Username').val()+'&Password='+$('#Password').val(),
    success: Landing
  });
}


//admin checking-start page
function startPage(data){

  $.each(data, function() {
    var div = $('<div />', {'data-role' : 'fieldcontain'}),
        btn = $('<input />', {
          type : 'button',
          value : 'STOP '+this.CheckID,
          id : 'btn_a',
          on : {
            click: function() {
              alert("CHECK-IN STOPPED!");
            }
          }
        });
    //document.location.href = 'CheckInPage.html';
    //$('<li>').html(this.CheckID+" <span> &otimes; </span>").appendTo('body>ul');
    //$('<button>').html('Stop '+this.CheckID+' Check-In Now.').appendTo('body>form');
    $('body>h1').empty();
    $('form').empty();
    var t= document.createTextNode('PLEASE CHECK-IN.');
    var x = document.createTextNode('CHECK-IN ID:'+this.CheckID);
    $('form').append(t).append(document.createElement("br"));
    $('form').append(x).append(document.createElement("br"));
    $('form').append(document.createElement("br"));
    div.append(btn).appendTo('form');
  });

}
function StartCheck() {
  $.ajax({
    method: 'post',
    url: '/admin-land',
    data: 'CheckID='+$('#CheckID').val(),
    success: startPage
  });
}


//history page wih students as list
//spit out the database
function spit(data) {
  data = JSON.parse(data);

  //define the html
  $('body>h1').empty();
  var head = document.createTextNode("HISTORY");
  $('body>h1').append(head);
  $('section').empty();
  var list = document.createElement("ul");
  $('section').append(list);
  $.each(data, function(){
    //append to the list
    console.log(this.User+" "+this.idS);
    //var li = document.createElement('li');
    //var s = document.createTextNode(this.User+" "+this.idS+" in "+this.checkStr);
    //$('ul').append(li).append(s);
    $('<li>').html(this.User+" "+this.idS+" -- "+this.checkStr+" <span> &otimes; </span>").appendTo('body>section>ul');
    $('span').off('click').click(function(){
      var name = $(this).parent().text().split(" ");
      $.ajax({
        method: 'delete',
        url: '/history/'+name[0],
        data: '&idS='+name[1],
        success: spit,
        error: function() {
          alert("error");
        }
      });
    });
  });
}
function History() {
  $.ajax({
    method: 'post',
    url: '/history',
    data: '',
    success: spit,
    error: function(){
      alert("failed");
    },
    complete: function(response, textStatus) {
    return console.log("Hey: " + textStatus+" "+response);
  }
  });
}


//check-in now page for student
function thankPage() {
    var div = $('<div />', {'data-role' : 'fieldcontain'}),
        btn = $('<input />', {
          type : 'button',
          value : 'ADD',
          //id : 'btn_a',
          on : {
            click: function() {
              checkIt();
            }
          }
        });
  $('body').empty();
  var t= document.createElement('h1');
  //var but = document.createElement('button');
  var x = document.createTextNode('Thank you for your submission!');
  $('body').append(x);
  div.append(btn).appendTo('body');

}
function checkIt() {
  $.ajax({
    method: 'post',
    url: '/checkIn',
    success: function() {
    document.location.href = 'CheckInPage.html';
    }
  });
}
function SaveStudent() {
    $.ajax({
      method: 'post',
      url: '/savedPage',
      data: 'checkStr='+$('#checkStr').val()+'&User='+$('#User').val()+'&idS='+$('#idS').val(),
      success: thankPage,
      error: function(){
        alert("Student ID already Checked!");
      }
    });
}




//-----------------------------
function removeAll() {
document.getElementById("form").reset();
}
