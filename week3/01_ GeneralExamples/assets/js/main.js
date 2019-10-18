console.log("JS is connected");

//document.getElementById("device").innerHTML = window.navigator.userAgent;

let myDevice = window.navigator.userAgent;
document.getElementById("device").innerHTML = myDevice;

if(myDevice.indexof("Mobile") >-1){
    window.location.replace("assets/html/mobile.html")
}

if(myDevice.indexof("Macintosh") >-1){
    window.location.replace("assets/html/desktop.html")
}

