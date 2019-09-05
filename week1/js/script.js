
var information = "Hello World!";
var attributes = ["Blue" , "Pink" , "Green", "Yellow"];
var myMSG = document.getElementsByClassName("msg");

// console.log("Hello");
// alert("Greetings" + " " + information);


//document.write("<p>"+ information + "</p>");

// console.log(attributes[1]);

for(var i = 0; i < attributes.length; i++ ) {
    // document.write("<p>" + attributes[i] + "<p>");
    myMSG[i].innerHTML = attributes[i];
    
}