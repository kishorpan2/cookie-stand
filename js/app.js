'use strick';
//list of all the store
var storeList =[];
//array to hold all operation hours
var hourList =['6am: ','7am: ', '8am: ','9am: ','10am: ','11am: ','12pm:','1pm: ','2pm: ','3pm: ','4pm: ','5pm: ','6pm: ','7pm: ','8pm: '];
// Constructor function
/*
maxCusPerHr: max-customer/hour
*/
function Store(location,minCusPerHr,maxCusPerHr,avgCusPerHr,salesArray,cusArray,totalSales){
  this.location = location;
  this.minCusPerHr = minCusPerHr;
  this.maxCusPerHr = maxCusPerHr;
  this.avgCusPerHr = avgCusPerHr;
  this.salesArray = salesArray;
  this.cusArray = cusArray;
  this.totalSales = totalSales;
}
//creating 5 different objects based for 5 different location
var store1 = new Store('1st and Pike',23,65,6.3,[],[],0);
var store2 = new Store('SeaTac Airport',3,24,1.2,[],[],0);
var store3 = new Store('Seattle Center',11,38,2.3,[],[],0);
var store4 = new Store('Capitol Hill',20,38,2.3,[],[],0);
var store5 = new Store('Alki',2,16,4.6,[],[],0);

//adding all the stores in the list
storeList.push(store1);
storeList.push(store2);
storeList.push(store3);
storeList.push(store4);
storeList.push(store5);

//populating the each location stores
for(var i = 0 ; i < 5; i++){
  popCustomer(storeList[i]);
  popSales(storeList[i]);
}
//To populate the numbers of customers
function popCustomer(store){
  //Citation: line from MDN Math.random
  for(var i = 0 ; i <15; i++){
    store.cusArray[i] = Math.floor(Math.random() * (store.maxCusPerHr - store.minCusPerHr+1))+store.minCusPerHr;
  }
}
//To populates the sales each hour and total sale at the end
function popSales(store){
  for(var i = 0 ; i <15; i++){
    store.salesArray[i] = Math.floor(store.cusArray[i]*store.avgCusPerHr);
    store.totalSales += store.salesArray[i];
  }
}
/*****To work with the DOM for HW 1 style */
// for(var index = 0 ; index <storeList.length ; index++){
//   var id = storeList[index].location;
//   var ulEL = document.getElementById(id);
//   for(var j = 0 ; j <hourList.length; j++){
//     var liEl = document.createElement('li');
//     liEl.textContent =hourList[j]+storeList[index].salesArray[j]+ ' cookies';
//     ulEL.appendChild(liEl);
//   }
//   liEl.textContent='Total: '+ storeList[index].totalSales + ' cookies';
//   ulEL.appendChild(liEl);
// }

/*HW 2*****/
//Creating table purely from JS
//function to create each object with render functions
// store1.render = function(){
//   this.avgCusPerHr = 0;
// };
//header row stand alone function
function headerRow(){
  //create,content,append
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent='Locations';
  trEl.appendChild(thEl);
  for(var i = 0; i<hourList.length;i++){
    thEl = document.createElement('th');
    thEl.textContent = hourList[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent='Daily Location Total';
  trEl.appendChild(thEl);
  var table = document.getElementById('sales');
  table.appendChild(trEl);
}
//function to create row for each location with respective data
function tableBody(store){
  //each location has its own row of data
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = store.location;
  trEl.appendChild(tdEl);
  for(var j = 0 ; j <store.salesArray.length;j++){
    //populating each row of data
    tdEl = document.createElement('td');
    tdEl.textContent = store.salesArray[j];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = store.totalSales;
  trEl.appendChild(tdEl);
  var table = document.getElementById('sales');
  table.appendChild(trEl);
}
// function that calculates total for all location per hour
function totalPerHrEaLoc(trEl){
  //to store sum off all sales per hour
  var sum;
  var tdEl;
  for(var i = 0 ; i < store1.salesArray.length;i++){
    sum = store1.salesArray[i]+store2.salesArray[i]+store3.salesArray[i]+store4.salesArray[i]+store5.salesArray[i];
    tdEl = document.createElement('td');
    tdEl.textContent = sum;
    trEl.appendChild(tdEl);
  }//end of for loop
  sum = store1.totalSales+store2.totalSales+store3.totalSales+store4.totalSales+store5.totalSales;
  tdEl = document.createElement('td');
  tdEl.textContent = sum;
  trEl.appendChild(tdEl);
}
//generates the footer for the table
function footerRow(){
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent ='Totals';
  trEl.appendChild(tdEl);
  totalPerHrEaLoc(trEl);
  var table = document.getElementById('sales');
  table.appendChild(trEl);
}
// To generate render for each location and calling render for each object
function renderAllLoc(storeList){
  for(var i = 0 ; i < storeList.length;i++){
    storeList[i].render = function(){
      tableBody(storeList[i]);
    };
    storeList[i].render();
  }
}
//headerRow funtion to initiallize table header
headerRow();
renderAllLoc(storeList);
footerRow();




