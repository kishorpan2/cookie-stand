'use strick';
//list of all the store
var storeList =[];
//HW3: getting data of form with id 'formA'
var formA = document.getElementById('formA');
//all location of stores in all lower case
var locationList =['1st and pike','seatac airport','seattle center','capitol hill','alki'];
//array to hold all operation hours
var hourList =['6am: ','7am: ', '8am: ','9am: ','10am: ','11am: ','12pm:','1pm: ','2pm: ','3pm: ','4pm: ','5pm: ','6pm: ','7pm: ','8pm: '];
// Constructor function
/*
maxCusPerHr: max-customer/hour
*/
function Store(location,minCusPerHr,maxCusPerHr,avgSalePerCus){
  this.location = location;
  this.minCusPerHr = minCusPerHr;
  this.maxCusPerHr = maxCusPerHr;
  this.avgSalePerCus = avgSalePerCus;
  this.salesArray = [];
  this.cusArray = [];
  this.totalSales = 0;
}
//creating 5 different objects based for 5 different location and storing them in a array
storeList.push(new Store('1st and Pike',23,65,6.3));
storeList.push(new Store('SeaTac Airport',3,24,1.2));
storeList.push(new Store('Seattle Center',11,38,2.3));
storeList.push(new Store('Capitol Hill',20,38,2.3));
storeList.push(new Store('Alki',2,16,4.6));

/*
To populate Customers Per Hour and Sales Per hour
in the each location's stores
Calls popCustomer(), popSales()
*/
function populateCustomerAndSales(){
  for(var i = 0 ; i < storeList.length; i++){
    popCustomer(storeList[i]);
    popSales(storeList[i]);
  }
}
/*
To populate the numbers of customers/hour
*/
function popCustomer(store){
  //Citation: line from MDN Math.random
  for(var i = 0 ; i <15; i++){
    store.cusArray[i] = Math.floor(Math.random() * (store.maxCusPerHr - store.minCusPerHr+1))+store.minCusPerHr;
  }
}
/*
To populate the sales/hour and total Sales in each location
*/
function popSales(store){
  for(var i = 0 ; i <15; i++){
    store.salesArray[i] = Math.ceil(store.cusArray[i]*store.avgSalePerCus);
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
/*
//To populate the header row of the table
*/
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
/*
//To populate the body of the table with each stores data
*/
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
/*
 //Function that calculates total for all location per hour
 */
function totalPerHrEaLoc(trEl){
  //to store sum off all sales per hour
  var sum=0;
  var totalSale = 0;
  var tdEl;
  for(var i=0 ; i < 15;i++){
    sum =0;
    for(var j=0; j<storeList.length;j++ ){
      sum += storeList[j].salesArray[i];
    }
    tdEl = document.createElement('td');
    tdEl.textContent = sum;
    trEl.appendChild(tdEl);
  }//end of for loop
  tdEl = document.createElement('td');
  for(var index=0;index<storeList.length;index++){
    totalSale+= storeList[index].totalSales;
  }
  tdEl.textContent = totalSale;
  trEl.appendChild(tdEl);
}
/*
//To populate the footer row of the table
*/
function footerRow(){
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent ='Totals';
  trEl.appendChild(tdEl);
  totalPerHrEaLoc(trEl);
  var table = document.getElementById('sales');
  table.appendChild(trEl);
}
/*
//To generate render for each location and calling render for each object
*/
function renderAllLoc(storeList){
  for(var i = 0 ; i < storeList.length;i++){
    storeList[i].render = function(){
      tableBody(storeList[i]);
    };
    storeList[i].render();
  }
}

/************************
HW 3: Adding the submittable form
*************************/

/*
 //Function that handles the submit event
*/
function handleDataSubmit(e){
  // prevents page reload on a 'submit' event
  e.preventDefault();
  //previous table
  var parent = document.getElementById('sales');
  var location = e.target.loc.value.toLowerCase();
  if(locationList.includes(location)){
    //updating one of the current locations
    for(var i =0 ; i<storeList.length; i++){
      if(storeList[i].location===e.target.loc.value){
        storeList[i].minCusPerHr = parseInt(e.target.minCus.value);
        storeList[i].maxCusPerHr = parseInt(e.target.maxCus.value);
        storeList[i].avgSalePerCus = parseInt(e.target.avgCus.value);
        storeList[i].totalSales=0;
      }
    }
    //clear previous table
    while(parent.hasChildNodes())
    {
      parent.removeChild(parent.firstChild);
    }
    //updating the table
    e.target.loc.value =null;
    e.target.minCus.value= null;
    e.target.maxCus.value = null;
    e.target.avgCus.value=null;

    renderAll();
  }
  //if the location submitted is a new location
  else{
    locationList.push(location);
    var newLocation = new Store(e.target.loc.value,parseInt(e.target.minCus.value),parseInt(e.target.maxCus.value),parseInt(e.target.avgCus.value));
    storeList.push(newLocation);
    //clear previous table
    while(parent.hasChildNodes())
    {
      parent.removeChild(parent.firstChild);
    }
    e.target.loc.value =null;
    e.target.minCus.value= null;
    e.target.maxCus.value = null;
    e.target.avgCus.value=null;
    renderAll();
  }
}
/*
//Function that render all the required functions
*/
function renderAll(){
  populateCustomerAndSales();
  //headerRow funtion to initiallize table header
  headerRow();
  renderAllLoc(storeList);
  footerRow();
}
/****
 Function that listen if submit button is clicked or not
 */
formA.addEventListener('submit',handleDataSubmit);
renderAll();




