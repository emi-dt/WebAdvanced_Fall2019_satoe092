/* To store your JSON file online you can usee http://myjson.com/
 You would get a URL and you can make calls to that URL*/

// You could also use https://jsonlint.com/ to valid the formating of your JSON file. 

// The reason why we preffer to use JSON is because is human readable


// JSON - Stans for Java Script Object Noation 




/*

	1. Understanding how to build an object and call information inside the object.
	Objects are everything in the {} !!
*/

// let myData = {
// 	"people":[
// 	{	"fistName":"Emi",
// 		"lastName":"Sato",
// 		"faveAnimal":"Cats"	},
// 	{	"fistName":"Karla",
// 		"lastName":"Polo",
// 		"faveAnimal":"Dogs"	},
// 	{	"fistName":"Jason",
// 		"lastName":"Smith",
// 		"faveAnimal":"Birds"	}
// ]}




// $(".json-container").append(myData.people[0].firstName + " " + myData.people[1].lastName + " " + "is" + " " + myData.people[2].age);

// let stringpeople = JSON.stringify(myData);
// console.log(stringpeople);

// let backtojson = JSON.parse(stringpeople);
// console.log(backtojson);



/*

	2. creating a data set that contains an array of objects

*/






 /*

	3. Stringify the JSON Data and converting it back to JSON format

*/
	





 /*


	4. Understanding for loops and pulling data from a json file.
*/
	




$.getJSON("./assets/data.json", function(data){
	console.log(data);

	let myUsers = data.people;
	for(let i in myUsers){
		$(".json-container").append(myUsers[i].firstName + " " + myUsers[i].lastName + " " + "likes" + " " + myUsers[i].faveAnimal + "." + "<br>");
	}
})

