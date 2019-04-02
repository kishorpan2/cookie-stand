'use strick';
//list of all the store
var storeList =[];
//array to hold all operation hours
var hourList =['6am: ','7am: ', '8am: ','9am: ','10am: ','11am: ','12pm:','1pm: ','2pm: ','3pm: ','4pm: ','5pm: ','6pm: ','7pm: ','8pm: '];
//object for first store
var store1 = {
  location:'1st and Pike',
  min: 23 ,
  max: 65,
  avgPerCus: 6.3,
  customer: [],
  sales: [],
  totalSale: 0
};
//2nd store
var store2 = {
  location:'SeaTac Airport',
  min: 3 ,
  max: 24,
  avgPerCus: 1.2,
  customer: [],
  sales: [],
  totalSale: 0,
};
//3rd store
var store3 = {
  location:'Seattle Center',
  min: 11 ,
  max: 38,
  avgPerCus: 3.7,
  customer: [],
  sales: [],
  totalSale: 0,
};
//4th store
var store4 = {
  location:'Capitol Hill',
  min: 20,
  max: 38,
  avgPerCus: 2.3,
  customer: [],
  sales: [],
  totalSale: 0,
};
//5th store
var store5 = {
  location:'Alki',
  min: 2,
  max: 16,
  avgPerCus: 4.6,
  customer: [],
  sales: [],
  totalSale: 0,
};
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
    store.customer[i] = Math.floor(Math.random() * (store.max - store.min+1))+store.min;
  }
}
//To populates the sales each hour and total sale at the end
function popSales(store){
  for(var i = 0 ; i <15; i++){
    store.sales[i] = Math.floor(store.customer[i]*store.avgPerCus);
    store.totalSale += store.sales[i];
  }
}
//To work with the DOM
for(var index = 0 ; index <storeList.length ; index++){
  var id = storeList[index].location;
  var ulEL = document.getElementById(id);
  for(var j = 0 ; j <hourList.length; j++){
    var liEl = document.createElement('li');
    liEl.textContent =hourList[j]+storeList[index].sales[j]+ ' cookies';
    ulEL.appendChild(liEl);
  }
  liEl.textContent='Total: ' + storeList[index].totalSale + ' cookies';
  ulEL.appendChild(liEl);
}

