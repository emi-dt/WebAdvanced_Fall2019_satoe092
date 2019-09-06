
// function start(){
//     for(let i = 0; i < 5; i++ ){
//         console.log(i);
//     }
// }

// start();

// let age = 18;
// if( age == 18){
//     console.log('Im sorry but no');
// } if(age > 21){
//     console.log('Welcome');
// }else{
//     console.log('Whaaaaat?');
// }


// let number = Math.floor(Math.random() * 10);

// switch(number){
//     case(4):
//     console.log('you rolled a four');
//     break;

//     case(5):
//     console.log('you rolled a five');
//     break;

//     case(6):
//     console.log('you rolled a six');
//     break;

//     default:
//     console.log('this is another number');
//     break;
// }
    





/*
 * Original Code by Lucien Huang! 
 */

// This is the array of the images

let images = [
    "newschoolbuilding.jpg",
    "050615_Festival_052_750x563.jpg",
    "745127-original.jpg",
    "1496605813404.jpeg",
    "bigimg_parsons.png",
    "D10_01.jpg",
    "DnKbS0IX4AEBA5-.jpg",
    "exterior-PortalImages.jpg",
    "newschoolbuilding.jpg",
    "Parsons_about_5607thave.jpg",
    "Parsons-about.jpg",
    "SP16_SummerIntensive_Nector_Parsons.jpg",
    "The-New-School-Student-Life-3.jpg",
    "The-New-School’s-Parsons-School-of-Design-3.jpg",
    "tish.jpg"];


    


function loadImages(){
    let imageNumber = 0;

    let columns = document.getElementsByClassName('column');
    // console.log(columns.length);
    for( let i=0;  i < images.length; i++){
        let newImg = document.createElement('img');
        newImg.className = 'images';
        newImg.id = i;
        newImg.src = './assets/images/'+images[i];

        columns[imageNumber].appendChild(newImg);
        imageNumber++;

        //every 3 colums, reset to 0
        if(imageNumber > columns.length - 1){
            imageNumber = 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('JS is working!');
    loadImages();
});



