var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];
var numCupsPerPound = 16;
var coffeeShopsArray = [];

function round(num, places) { //Rounding helper function
  return parseFloat(num.toFixed(places));
};

function CoffeeShop(name, minNumCust, maxNumCust, avgCupsCust, avgToGoPndsCust) { //Object constructor
  this.name = name;
  this.minNumCust = minNumCust;
  this.maxNumCust = maxNumCust;
  this.avgCupsCust = avgCupsCust;
  this.avgToGoPndsCust = avgToGoPndsCust;
  this.customersPerHour = []; //array that holds 16 random numbers of customers, one number for each hour.
  this.cupsPerHour = []; //array that holds number of cups sold per hour (customersPerHour * avgCupsCust)
  this.poundsPerHourToGo = []; //array that holds number of pounds to-go per hour (customersPerHour * avgToGoPndsCust)
  this.poundsPerHourCups = []; //array that holds number of pounds needed for cups per hour (cupsPerHour / numCupsPerPound)
  this.totalHourlyPounds = []; //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  this.employeesPerHour = []; //array that holds number of employees needed per hour (based on customersPerHour)
  this.totalDailyCustomers = 0; //total number of customers per day at a specific location
  this.totalDailyCups = 0; //total cups sold per day
  this.totalPoundsToGo = 0; //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  this.totalPoundsForCups = 0; //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  this.totalHourlyPoundsNeeded = 0; //total pounds needed to fulfill hourly cup and to-go orders
  this.totalDailyPoundsNeeded = 0; //sum of totalPoundsToGo and totalPoundsForCups
  coffeeShopsArray.push(this); //pushes CoffeeShop objects into an array
};

CoffeeShop.prototype.getRandomNum = function(minNumCust, maxNumCust) {
  return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
};
CoffeeShop.prototype.generateCustomersPerHour = function() {
  for (i = 0; i < hours.length; i++) {
    var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.customersPerHour.push(tempCust);
    this.totalDailyCustomers += tempCust;
  }
};
CoffeeShop.prototype.generateCupsPerHour = function() {
  for (i = 0; i < this.customersPerHour.length; i++) {
    var tempCups = round((this.customersPerHour[i] * this.avgCupsCust), 1);
    this.cupsPerHour.push(tempCups);
    this.totalDailyCups += tempCups;
  }
};
CoffeeShop.prototype.generatePoundsPerHourToGo = function() {
  for (i = 0; i < this.customersPerHour.length; i++) {
    var tempPoundsToGo = round((this.customersPerHour[i] * this.avgToGoPndsCust), 1);
    this.poundsPerHourToGo.push(tempPoundsToGo);
    this.totalPoundsToGo += tempPoundsToGo;
  }
};
CoffeeShop.prototype.generatePoundsPerHourCups = function() {
  for (i = 0; i < this.customersPerHour.length; i++) {
    var tempPoundsForCups = round((this.cupsPerHour[i] / numCupsPerPound), 1);
    this.poundsPerHourCups.push(tempPoundsForCups);
    this.totalPoundsForCups += tempPoundsForCups;
  }
};
CoffeeShop.prototype.generateTotalHourlyPoundsNeeded = function() {
  for (i = 0; i < hours.length; i++) {
    var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
    this.totalHourlyPounds.push(tempTotalHourlyPounds);
    this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
  }
};
CoffeeShop.prototype.generateTotalDailyPoundsNeeded = function() {
  this.totalDailyPoundsNeeded = round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
};
CoffeeShop.prototype.generateEmployeesPerHour = function() {
  var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
  this.employeesPerHour.push(tempEmployees);
};

CoffeeShop.prototype.generateShopInformation = function() {
  this.getRandomNum(this.minNumCust, this.maxNumCust);
  this.generateCustomersPerHour();
  this.generateCupsPerHour();
  this.generatePoundsPerHourToGo();
  this.generatePoundsPerHourCups();
  this.generateTotalHourlyPoundsNeeded();
  this.generateTotalDailyPoundsNeeded();
  this.generateEmployeesPerHour();
};

pikePlaceMarket = new CoffeeShop('Pike Place Market', 14, 35, 1.2, 0.34);
capitolHill = new CoffeeShop('Capitol Hill', 12, 28, 3.2, 0.03);
seattlePublicLibrary = new CoffeeShop('Seattle Public Library', 9, 45, 2.6, 0.02);
southLakeUnion = new CoffeeShop('South Lake Union', 5, 18, 1.3, 0.04);
seaTacAirport = new CoffeeShop('Sea-Tac Airport', 28, 44, 1.1, 0.41);
console.log(coffeeShopsArray);

var renderCoffeeShops = function (){
  for (var i = 0; i < coffeeShopsArray.length; i++) {
    coffeeShopsArray[i].generateShopInformation();
  }
};
renderCoffeeShops();

var allShopsTotalDailyPoundsNeeded = 0;

function generateAllShopsDailyTotal() {
  for (var i = 0; i < coffeeShopsArray.length; i++){
    var tempAllShopsTotalDailyPoundsNeeded = coffeeShopsArray[i].totalDailyPoundsNeeded;
    allShopsTotalDailyPoundsNeeded += tempAllShopsTotalDailyPoundsNeeded;
  }
}

var allShopsTotalHourlyPoundsNeededArray = [];

function generateAllShopsHourlyTotals() {
  for (i = 0; i < hours.length; i++) {
    var allShopsTotalHourlyPoundsNeeded = 0;
    for (var j = 0; j < coffeeShopsArray.length; j++) {
      var tempTotalHourlyPoundsAllLocations = coffeeShopsArray[j].totalHourlyPounds[i];
      console.log(tempTotalHourlyPoundsAllLocations + ' add me');
      allShopsTotalHourlyPoundsNeeded += tempTotalHourlyPoundsAllLocations;
      console.log(allShopsTotalHourlyPoundsNeeded + ' total');
    }
    allShopsTotalHourlyPoundsNeededArray.push(round(allShopsTotalHourlyPoundsNeeded, 1));
    console.log(allShopsTotalHourlyPoundsNeededArray);
  }
}

//DOM manipulation

var tableEl = document.getElementById('shop-data-table'); //hook to hard-coded table in data.html

function generateTableHeader() {
  var trEl = document.createElement('tr');
  var emptyThEl = document.createElement('th'); //creates empty cell in top left corner of table
  var dailyLocationTotalThEl = document.createElement('th');

  emptyThEl.textContent = '';
  dailyLocationTotalThEl.textContent = 'Daily Location Total';
  trEl.appendChild(emptyThEl);
  trEl.appendChild(dailyLocationTotalThEl);

  for (var i in hours) { //creates table header elements that contain hours[i] in each cell
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  tableEl.appendChild(trEl);
};
function generateTableBody() {
  for (var i = 0; i < coffeeShopsArray.length; i++) {
    var coffeeShopNameTrEl = document.createElement('tr');
    var coffeeShopNameTdEl = document.createElement('td'); //lists names of coffee shops on far left of table
    var totalDailyPoundsTdEl = document.createElement('td');

    coffeeShopNameTdEl.textContent = coffeeShopsArray[i].name;
    coffeeShopNameTrEl.appendChild(coffeeShopNameTdEl);
    totalDailyPoundsTdEl.textContent = coffeeShopsArray[i].totalDailyPoundsNeeded;//grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's totalDailyPoundsNeeded value
    coffeeShopNameTrEl.appendChild(totalDailyPoundsTdEl);

    for (var j = 0; j < hours.length; j++) {
      var totalHourlyPoundsTdEl = document.createElement('td');
      totalHourlyPoundsTdEl.textContent = coffeeShopsArray[i].totalHourlyPounds[j]; //grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's totalHourlyPounds array at j (its totalHourlyPoundsNeeded value)
      coffeeShopNameTrEl.appendChild(totalHourlyPoundsTdEl);
    }
    tableEl.appendChild(coffeeShopNameTrEl);
  }
  var totalsTrEl = document.createElement('tr');
  var allShopsTotalDailyPoundsTdEl = document.createElement('td');

  totalsTrEl.textContent = 'Totals';
  allShopsTotalDailyPoundsTdEl.textContent = allShopsTotalDailyPoundsNeeded;
  totalsTrEl.appendChild(allShopsTotalDailyPoundsTdEl);

  for (var k = 0; k < hours.length; k++) {
    var allShopsTotalHourlyPoundsTdEl = document.createElement('td');
    allShopsTotalHourlyPoundsTdEl.textContent = allShopsTotalHourlyPoundsNeededArray[k];
    totalsTrEl.appendChild(allShopsTotalHourlyPoundsTdEl);
  }

  tableEl.appendChild(totalsTrEl);
};

generateAllShopsDailyTotal();
generateAllShopsHourlyTotals();
generateTableHeader();
generateTableBody();
