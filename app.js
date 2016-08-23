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
  this.totalDailyEmployeesNeeded = 0; //total employees needed for the day at given Coffee Shop.
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
  for (i = 0; i < hours.length; i++) {
    var tempEmployeesPerHour = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployeesPerHour);
  }
};
CoffeeShop.prototype.generateTotalDailyEmployeesNeeded = function () {
  for (i = 0; i < hours.length; i++) {
    var tempTotalDailyEmployees = this.employeesPerHour[i];
    this.totalDailyEmployeesNeeded += tempTotalDailyEmployees;
  }
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
  this.generateTotalDailyEmployeesNeeded();
};

pikePlaceMarket = new CoffeeShop('Pike Place Market', 14, 35, 1.2, 0.34);
capitolHill = new CoffeeShop('Capitol Hill', 12, 28, 3.2, 0.03);
seattlePublicLibrary = new CoffeeShop('Seattle Public Library', 9, 45, 2.6, 0.02);
southLakeUnion = new CoffeeShop('South Lake Union', 5, 18, 1.3, 0.04);
seaTacAirport = new CoffeeShop('Sea-Tac Airport', 28, 44, 1.1, 0.41);

var renderCoffeeShops = function (){
  for (var i = 0; i < coffeeShopsArray.length; i++) {
    coffeeShopsArray[i].generateShopInformation();
  }
};
renderCoffeeShops();

//Calculate all-shop daily and hourly bean totals and employee totals

var allShopsTotalDailyPoundsNeeded = 0;

function generateAllShopsDailyBeanTotal() {
  for (var i = 0; i < coffeeShopsArray.length; i++){
    var tempAllShopsTotalDailyPoundsNeeded = coffeeShopsArray[i].totalDailyPoundsNeeded;
    allShopsTotalDailyPoundsNeeded += round(tempAllShopsTotalDailyPoundsNeeded, 1);
  }
}

var allShopsTotalHourlyPoundsArray = [];

function generateAllShopsHourlyBeanTotals() {
  for (i = 0; i < hours.length; i++) {
    var allShopsTotalHourlyPounds = 0;
    for (var j = 0; j < coffeeShopsArray.length; j++) {
      var tempAllShopsTotalHourlyPounds = coffeeShopsArray[j].totalHourlyPounds[i];
      allShopsTotalHourlyPounds += tempAllShopsTotalHourlyPounds;
    }
    allShopsTotalHourlyPoundsArray.push(round(allShopsTotalHourlyPounds, 1));
  }
}

var allShopsTotalDailyEmployeesNeeded = 0;

function generateAllShopsDailyEmployeeTotal() {
  for (var i = 0; i < coffeeShopsArray.length; i++){
    var tempAllShopsTotalDailyEmployeesNeeded = coffeeShopsArray[i].totalDailyEmployeesNeeded;
    allShopsTotalDailyEmployeesNeeded += tempAllShopsTotalDailyEmployeesNeeded;
  }
}

var allShopsTotalHourlyEmployeesArray = [];

function generateAllShopsHourlyEmployeeTotals() {
  for (i = 0; i < hours.length; i++) {
    var allShopsTotalHourlyEmployees = 0;
    for (var j = 0; j < coffeeShopsArray.length; j++) {
      var tempAllShopsTotalHourlyEmployees = coffeeShopsArray[j].employeesPerHour[i];
      allShopsTotalHourlyEmployees += tempAllShopsTotalHourlyEmployees;
    }
    allShopsTotalHourlyEmployeesArray.push(allShopsTotalHourlyEmployees);
  }
}

//DOM manipulation

var poundsTableEl = document.getElementById('pounds_data_table'); //hook to hard-coded table in data.html

function generatePoundsTableHeader() {
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
  poundsTableEl.appendChild(trEl);
};

function generatePoundsTableBody() {
  for (var i = 0; i < coffeeShopsArray.length; i++) {
    var coffeeShopNameTrEl = document.createElement('tr');
    var coffeeShopNameTdEl = document.createElement('td'); //lists names of coffee shops on far left of table
    var totalDailyPoundsTdEl = document.createElement('td');

    coffeeShopNameTdEl.textContent = coffeeShopsArray[i].name;
    totalDailyPoundsTdEl.textContent = coffeeShopsArray[i].totalDailyPoundsNeeded;//grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's totalDailyPoundsNeeded value
    coffeeShopNameTrEl.appendChild(coffeeShopNameTdEl);
    coffeeShopNameTrEl.appendChild(totalDailyPoundsTdEl);

    for (var j = 0; j < hours.length; j++) {
      var totalHourlyPoundsTdEl = document.createElement('td');
      totalHourlyPoundsTdEl.textContent = coffeeShopsArray[i].totalHourlyPounds[j]; //grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's totalHourlyPounds array at j (its totalHourlyPoundsNeeded value)
      coffeeShopNameTrEl.appendChild(totalHourlyPoundsTdEl);
    }
    poundsTableEl.appendChild(coffeeShopNameTrEl);
  }
  var totalsTrEl = document.createElement('tr');
  var allShopsTotalDailyPoundsTdEl = document.createElement('td');

  totalsTrEl.textContent = 'Totals';
  allShopsTotalDailyPoundsTdEl.textContent = round(allShopsTotalDailyPoundsNeeded, 1);
  totalsTrEl.appendChild(allShopsTotalDailyPoundsTdEl);

  for (var k = 0; k < hours.length; k++) {
    var allShopsTotalHourlyPoundsTdEl = document.createElement('td');
    allShopsTotalHourlyPoundsTdEl.textContent = allShopsTotalHourlyPoundsArray[k];
    totalsTrEl.appendChild(allShopsTotalHourlyPoundsTdEl);
  }

  poundsTableEl.appendChild(totalsTrEl);
};

var employeesTableEl = document.getElementById('employee_data_table');

function generateEmployeeTableHeader() {
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
  employeesTableEl.appendChild(trEl);
};

function generateEmployeeTableBody() {
  for (var i = 0; i < coffeeShopsArray.length; i++) {
    var coffeeShopNameTrEl = document.createElement('tr');
    var coffeeShopNameTdEl = document.createElement('td'); //lists names of coffee shops on far left of table
    var totalDailyEmployeesTdEl = document.createElement('td');

    coffeeShopNameTdEl.textContent = coffeeShopsArray[i].name;
    coffeeShopNameTrEl.appendChild(coffeeShopNameTdEl);
    totalDailyEmployeesTdEl.textContent = coffeeShopsArray[i].totalDailyEmployeesNeeded;//grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's totalDailyEmployeesNeeded value
    coffeeShopNameTrEl.appendChild(totalDailyEmployeesTdEl);

    for (var j = 0; j < hours.length; j++) {
      var totalHourlyEmployeesTdEl = document.createElement('td');
      totalHourlyEmployeesTdEl.textContent = coffeeShopsArray[i].employeesPerHour[j]; //grabs the Coffee Shop object at i in the coffeeShopsArray and gets that Coffee Shop's employeesPerHour array at j (its totalHourlyPoundsNeeded value)
      coffeeShopNameTrEl.appendChild(totalHourlyEmployeesTdEl);
    }
    employeesTableEl.appendChild(coffeeShopNameTrEl);
  }
  var totalsTrEl = document.createElement('tr');
  var allShopsTotalDailyEmployeesTdEl = document.createElement('td');

  totalsTrEl.textContent = 'Totals';
  allShopsTotalDailyEmployeesTdEl.textContent = allShopsTotalDailyEmployeesNeeded;
  totalsTrEl.appendChild(allShopsTotalDailyEmployeesTdEl);

  for (var k = 0; k < hours.length; k++) {
    var allShopsTotalHourlyEmployeesTdEl = document.createElement('td');
    allShopsTotalHourlyEmployeesTdEl.textContent = allShopsTotalHourlyEmployeesArray[k];
    totalsTrEl.appendChild(allShopsTotalHourlyEmployeesTdEl);
  }

  employeesTableEl.appendChild(totalsTrEl);
};

function clearTables(){
  var poundsTableEl = document.getElementById('pounds_data_table');
  poundsTableEl.innerHTML = '';
  var employeeTableEl = document.getElementById('employee_data_table');
  employeeTableEl.innerHTML = '';
}

function generateForm() {
  var coffeeShopForm = document.getElementById('add_coffee_shop');

  coffeeShopForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var shopName = event.target.shop_name.value;
    var minCust = event.target.min_cust.value;
    var maxCust = event.target.max_cust.value;
    var avgCups = event.target.avg_cups.value;
    var avgPndsToGo = event.target.avg_pnds_togo.value;
    var newShop = new CoffeeShop(shopName, minCust, maxCust, avgCups, avgPndsToGo);
    newShop.generateShopInformation();
    allShopsTotalDailyPoundsNeeded = 0;
    allShopsTotalHourlyPoundsArray = [];
    allShopsTotalDailyEmployeesNeeded = 0;
    allShopsTotalHourlyEmployeesArray = [];
    clearTables();
    generateTables();
  });
}

function generateTables() {
  generateAllShopsDailyBeanTotal();
  generateAllShopsHourlyBeanTotals();
  generateAllShopsDailyEmployeeTotal();
  generateAllShopsHourlyEmployeeTotals();
  generatePoundsTableHeader();
  generatePoundsTableBody();
  generateEmployeeTableHeader();
  generateEmployeeTableBody();
}

generateForm();
generateTables();
