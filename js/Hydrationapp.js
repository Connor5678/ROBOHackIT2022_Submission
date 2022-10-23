let TimeArray = new Array(29);
let WaterArray = new Array(29);
let IdealArray = new Array(29);
let Time = 7;
let idealValue = 3700/28;
var breakfastFlag = false;
var lunchFlag = false;
var dinnerFlag = false;
var recommendedFlag = false;

for (var i=0; i < 29; i++) {
	let iMod = i % 2
	//document.write(iMod)
	if (!iMod){
		//document.write("zero")
		TimeArray[i] = Time + parseInt(i/2) + ":00";
		//TimeArray[i] = (Time + parseInt(i/2) ) * 100;
	}else{
		//document.write("one")
		TimeArray[i] = Time + parseInt(i/2) + ":30";
		//TimeArray[i] = (Time + parseInt(i/2) ) * 100 + 30;
	}
	WaterArray[i] = 0;
	IdealArray[i] = parseInt(idealValue*i);

}



theChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: TimeArray,
    datasets: [{
      data: IdealArray,
      borderColor: "red",
      label: "ideal ml",
      fill: false

    },{
      data: WaterArray,
      borderColor: "blue",
      label: "your current ml",
      fill: false
    }]
  },
  options: {
    legend: {display: true},
    title: {
      display: true,
      text: "Monitoring Hydration Level from 7am to 9pm",
      font: {
      	size: 24
      }
    },
    scales: {
    		yAxes: [{
      		scaleLabel: {
        		display: true,
        		labelString: "Water (ml)"
      		}
    		}],
    		xAxes: [{
      		scaleLabel: {
        		display: true,
        		labelString: "Time (hours)"
      		}
    		}]
  		}   
    
  }
});	

function AddNewArrayItem(list,item) {
	var newListItem = document.createElement("li");
	newListItem.innerHTML = item;
	list.appendChild(newListItem);
	console.log("new item added");
}

function AddNewArrayPoint(list,point) {
	var newListItem = document.createElement("li");
	newListItem.innerHTML = point;
	list.appendChild(newListItem);
	console.log("new item added");
}


function AddDrinkMl(Type, Size, Time) {
	var drinkMl = 0
	var drinkFlag = 0
	switch(Size){
		case "small":
		drinkMl = 250;
		break;
		case "medium":
		drinkMl = 330;
		break;
		case "large":
		drinkMl = 500;
		break;
	}
	switch(Type){
		case "juice":
		drinkMl *= 0.8;
		break;
		case "coffee":
		drinkMl *= 0.5;
		break;
		case "tea":
		drinkMl *= 0.7;
		break;
		case "fizzydrink":
		drinkMl *= 0.6;
		break;
	}
	for (var i=0; i < 29; i++) {
		if (drinkFlag === 0) {
			if (TimeArray[i] === Time){
				WaterArray[i] = drinkMl + WaterArray[i];
				drinkFlag = 1
			}
		}else{
			WaterArray[i] = drinkMl + WaterArray[i];
		}

	}
}

function DelDrinkMl(Type, Size, Time) {
	var drinkMl = 0;
	var drinkFlag = 0;
	switch(Size){
		case "small":
		drinkMl = 250;
		break;
		case "medium":
		drinkMl = 330;
		break;
		case "large":
		drinkMl = 500;
		break;
	}
	switch(Type){
		case "juice":
		drinkMl *= 0.8;
		break;
		case "coffee":
		drinkMl *= 0.5;
		break;
		case "tea":
		drinkMl *= 0.7;
		break;
		case "fizzydrink":
		drinkMl *= 0.6;
		break;
	}
	for (var i=0; i < 29; i++) {
		if (drinkFlag === 0) {
			if (TimeArray[i] === Time){
				WaterArray[i] = WaterArray[i] - drinkMl;
				drinkFlag = 1
			}
		}else{
			WaterArray[i] = WaterArray[i] - drinkMl;
		}

	}
}

function AddFoodMl(Type, Time) {
	var foodMl = 0;
	var foodFlag = 0;
	console.log("su " +Type);
	switch(Type){
		case "breakfast":
		foodMl = 175;
		console.log("r" + foodMl);
		break;
		case "lunch":
		foodMl = 210;
		break;
		case "dinner":
		foodMl = 245;
		break;
		case "snack":
		foodMl = 70;
		console.log("s" + foodMl);
		break;
		default:
	}
	for (var i=0; i < 29; i++) {
		if (foodFlag === 0) {
			if (TimeArray[i] === Time){
				WaterArray[i] = foodMl + WaterArray[i];
				foodFlag = 1
			}
		}else{
			WaterArray[i] = foodMl + WaterArray[i];
		}
	}
}

function DelFoodMl(Type, Time) {
	var foodMl = 0
	var foodFlag = 0
	switch(Type){
		case "breakfast":
		foodMl = 175;
		break;
		case "lunch":
		foodMl = 210;
		break;
		case "dinner":
		foodMl = 245;
		break;
		case "snack":
		foodMl = 70;
		break;
	}
	for (var i=0; i < 29; i++) {
		if (foodFlag === 0) {
			if (TimeArray[i] === Time){
				WaterArray[i] = WaterArray[i] - foodMl;
				foodFlag = 1
			}
		}else{
			WaterArray[i] = WaterArray[i] - foodMl;
		}
	}
}



function printArrays() {
	for (var i=0; i < 29; i++) {
		console.log(i + " " + TimeArray[i]+ " " + WaterArray[i]+ " " + IdealArray[i]);

		}
	}

function findTime(hours, minutes) {
	var returnTime = " ";
	if (minutes < 15){
		returnTime = hours + ":00";
	} else if(minutes > 45) {
		returnTime = parseInt(hours)+1 + ":00";
	} else {
		returnTime = hours + ":30";
	}
	return returnTime

}

function giveRec(difference, time) {
	var returnRec = "default";
	var returnMeal = "m";
	var returnDrink = "d";
	var tempDifference = difference;

	switch(time){
		case "7:00":
		returnMeal = "breakfast";
		tempDifference -= 175;
		break;
		case "7:30":
		returnMeal = "breakfast";
		tempDifference -= 175;
		break;
		case "8:00":
		returnMeal = "breakfast";
		tempDifference -= 175;
		break;
		case "8:30":
		returnMeal = "breakfast";
		tempDifference -= 175;
		break;
		case "9:00":
		returnMeal = "breakfast";
		tempDifference -= 175;
		break;
		case "12:00":
		returnMeal = "lunch";
		tempDifference -= 210;
		break;
		case "12:30":
		returnMeal = "lunch";
		tempDifference -= 210;
		break;
		case "13:00":
		returnMeal = "lunch";
		tempDifference -= 210;
		break;
		case "13:30":
		returnMeal = "lunch";
		tempDifference -= 210;
		break;
		case "14:00":
		returnMeal = "lunch";
		tempDifference -= 210;
		break;
		case "17:00":
		returnMeal = "dinner";
		tempDifference -= 245;
		break;
		case "17:30":
		returnMeal = "dinner";
		tempDifference -= 245;
		break;
		case "18:00":
		returnMeal = "dinner";
		tempDifference -= 245;
		break;
		case "18:30":
		returnMeal = "dinner";
		tempDifference -= 245;
		break;
		case "19:00":
		returnMeal = "dinner";
		tempDifference -= 245;
		break;

	}

	if (tempDifference > 450 ) {
		returnDrink = "large";
	} else if (tempDifference > 300) {
		returnDrink = "medium";
	} else if (tempDifference > 200) {
		returnDrink = "small";
	}

	if (returnMeal === "breakfast") {
		if(breakfastFlag) {
			returnMeal = "m"
		}
	}
	if (returnMeal === "lunch") {
		if(lunchFlag) {
			returnMeal = "m"
		}
	}
	if (returnMeal === "dinner") {
		if(dinnerFlag) {
			returnMeal = "m"
		}
	}

	if (returnMeal != "m") {
		if (returnDrink != "d"){
			returnRec = "It is recommended to have " + returnMeal + " with a " + returnDrink + " sized drink in the next half hour.";
		} else {
			returnRec = "It is recommended to have " + returnMeal + " in the next half hour.";
		}

	} else {
		returnRec = "It is recommended to have a " + returnDrink + " sized drink in the next half hour.";
	}

	return returnRec
		
}

function getEventTarget(evt) {
	evt = evt || window.event;
	return evt.target || evt.srcElement;
}

var btnDrink = document.getElementById("drinkButton");
var drinkList = document.getElementById("drinkDisplay");

var btnFood = document.getElementById("foodButton");
var foodList = document.getElementById("foodDisplay");

var btnRec = document.getElementById("scorebutton");
var recList = document.getElementById("recDisplay");

btnDrink.onclick = function() {
	var newType = document.getElementById("drinkType").value;
	var newSize = document.getElementById("drinkSize").value;
	var newTime = document.getElementById("drinkTime").value;
	var newEntry = newType + " " + newSize + " " + newTime;
	AddDrinkMl(newType, newSize, newTime);
	AddNewArrayItem(drinkList,newEntry);
	printArrays();
	theChart.update();
}

btnFood.onclick = function() {
	//look to validate meal times the same as recommendations
	var newType = document.getElementById("foodType").value;
	var newTime = document.getElementById("foodTime").value;
	var newEntry = newType + " " + newTime;
	console.log(newEntry);
	if (newType === "breakfast") {
		console.log("breakfast " + newEntry);
		if (!breakfastFlag) {
			AddFoodMl(newType, newTime);
			AddNewArrayItem(foodList,newEntry);
			breakfastFlag = true ;
		}
	}
	if (newType === "lunch") {
		console.log("lunch " + newEntry);
		if (!lunchFlag) {
			AddFoodMl(newType, newTime);
			AddNewArrayItem(foodList,newEntry);
			lunchFlag = true ;
		}
	}
	if (newType === "dinner") {
		console.log("dinner " + newEntry);
		if (!dinnerFlag) {
			AddFoodMl(newType, newTime);
			AddNewArrayItem(foodList,newEntry);
			dinnerFlag = true ;
		}
	}
	if (newType === "snack") {
		AddFoodMl(newType, newTime);
		AddNewArrayItem(foodList,newEntry);
	}
	printArrays();
	theChart.update();
}

btnRec.onclick = function() {
	const list = document.getElementById("recDisplay");
	if (recommendedFlag) {
		list.removeChild(list.firstElementChild);
	}

	const date = new Date();
	var checkTime = " ";
	var idealMl = 0;
	var currentMl = 0;
	var newEntry = " ";
	checkTime = findTime(date.getHours(), date.getMinutes());
	for (var i=0; i < 29; i++) {
		if (TimeArray[i] === checkTime){
			var idealMl = IdealArray[i];
			var currentMl = WaterArray[i];
		}
	}
	newEntry = "The time right now is  " + checkTime + " ideal is " +  idealMl + " current is " + currentMl;
	var Mldifference = idealMl - currentMl
	if (Mldifference > 300 ) {
		//set a rec
		newEntry = giveRec(Mldifference, checkTime);
	} else {
		newEntry = "You are within 300ml of the recommended hydration, no action needed";
	}

	AddNewArrayItem(recDisplay,newEntry);
	recommendedFlag = true;

}

drinkList.onclick = function(event) {
	var target = getEventTarget(event);
	var textValue = target.innerHTML;
	const tempArray = textValue.split(" ");
	console.log(tempArray);
	DelDrinkMl(tempArray[0], tempArray[1], tempArray[2]);
	target.parentNode.removeChild(target);
	theChart.update();
}

foodList.onclick = function(event) {
	var target = getEventTarget(event);
	var textValue = target.innerHTML;
	const tempArray = textValue.split(" ");
	console.log(tempArray);
	DelFoodMl(tempArray[0], tempArray[1]);
	switch(tempArray[0]) {
		case "breakfast":
		breakfastFlag = false;
		break;
		case "lunch":
		lunchFlag = false;
		break;
		case "dinner":
		dinnerFlag = false;
		break;
	}
	target.parentNode.removeChild(target);
	theChart.update();
}




//document.write(TimeArray+"<br>")
//document.write(WaterArray+"<br>")
//document.write(IdealArray+"<br>")
