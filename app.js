var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];
var pikePlaceUl = document.getElementById('pike-place-market');
var capHillUl = document.getElementById('capitol-hill');
var seaLibraryUl = document.getElementById('seattle-public-library');
var sluUl = document.getElementById('south-lake-union');
var seaTacUl = document.getElementById('sea-tac-airport');

function round (num, places) {
  return parseFloat(num.toFixed(places))
}

var pikePlaceMarket = {
  minNumCust: 14,
  maxNumCust: 35,
  avgCupsCust: 1.2,
  avgPndsCust: .34,
  numCupsPerPound: 16,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * 1.2)
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalHourlyPounds: [], //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
  totalDailyCustomers: 0, //total number of customers per day at a specific location
  totalDailyCups: 0, //total cups sold per day
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalHourlyPoundsNeeded: 0, //total pounds needed to fulfill hourly cup and to-go orders
  totalDailyPoundsNeeded: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  generateCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(tempCust);
      this.totalDailyCustomers += tempCust;
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = round((this.customersPerHour[i] * this.avgCupsCust), 1);
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = round((this.customersPerHour[i] * this.avgPndsCust), 1);
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = round((this.cupsPerHour[i] / this.numCupsPerPound), 1);
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
    }
  },
  generateTotalHourlyPoundsNeeded: function() {
    for (i = 0; i < hours.length; i++) {
      var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
      this.totalHourlyPounds.push(tempTotalHourlyPounds);
      this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
  },
  generateEmployeesPerHour: function() {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
  },
  output: function() {
    for (i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.totalHourlyPounds[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.poundsPerHourCups[i] + ' lbs), ' + this.poundsPerHourToGo[i] + ' lbs to-go]';
      pikePlaceUl.appendChild(liEl);
    }
    var customersLi = document.createElement('li');
    customersLi.textContent = 'Total customers at Pike Place Market: ' + this.totalDailyCustomers;
    pikePlaceUl.appendChild(customersLi);
    var cupsLi = document.createElement('li');
    cupsLi.textContent = 'Total cups sold at Pike Place Market: ' + round(this.totalDailyCups, 1);
    pikePlaceUl.appendChild(cupsLi);
    var totalDailyToGoPoundsLi = document.createElement('li');
    totalDailyToGoPoundsLi.textContent = 'Total to-go pound packages sold at Pike Place Market: ' + round(this.totalPoundsToGo, 1);
    pikePlaceUl.appendChild(totalDailyToGoPoundsLi);
    var totalDailyPoundsLi = document.createElement('li');
    totalDailyPoundsLi.textContent = 'Total pounds of beans needed at Pike Place Market: ' + round(this.totalDailyPoundsNeeded, 1);
    pikePlaceUl.appendChild(totalDailyPoundsLi);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalHourlyPoundsNeeded();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
    this.output();
  }
}
pikePlaceMarket.render();

var capitolHill = {
  minNumCust: 12,
  maxNumCust: 28,
  avgCupsCust: 3.2,
  avgPndsCust: .03,
  numCupsPerPound: 16,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * avgCupsCust)
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalHourlyPounds: [], //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
  totalDailyCustomers: 0, //total number of customers per day at a specific location
  totalDailyCups: 0, //total cups sold per day
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalDailyPoundsNeeded: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  generateCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(tempCust);
      this.totalDailyCustomers += tempCust;
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = round((this.customersPerHour[i] * this.avgCupsCust), 1);
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = round((this.customersPerHour[i] * this.avgPndsCust), 1);
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = round((this.cupsPerHour[i] / this.numCupsPerPound), 1);
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
    }
  },
  generateTotalHourlyPoundsNeeded: function() {
    for (i = 0; i < hours.length; i++) {
      var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
      this.totalHourlyPounds.push(tempTotalHourlyPounds);
      this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
      this.employeesPerHour.push(tempEmployees);
    }
  },
  output: function() {
    for (i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.totalHourlyPounds[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.poundsPerHourCups[i] + ' lbs), ' + this.poundsPerHourToGo[i] + ' lbs to-go]';
      capHillUl.appendChild(liEl);
    }
    var customersLi = document.createElement('li');
    customersLi.textContent = 'Total customers at Capitol Hill: ' + this.totalDailyCustomers;
    capHillUl.appendChild(customersLi);
    var cupsLi = document.createElement('li');
    cupsLi.textContent = 'Total cups sold at Capitol Hill: ' + round(this.totalDailyCups, 1);
    capHillUl.appendChild(cupsLi);
    var totalDailyToGoPoundsLi = document.createElement('li');
    totalDailyToGoPoundsLi.textContent = 'Total to-go pound packages sold at Capitol Hill: ' + round(this.totalPoundsToGo, 1);
    capHillUl.appendChild(totalDailyToGoPoundsLi);
    var totalDailyPoundsLi = document.createElement('li');
    totalDailyPoundsLi.textContent = 'Total pounds of beans needed at Capitol Hill: ' + round(this.totalDailyPoundsNeeded, 1);
    capHillUl.appendChild(totalDailyPoundsLi);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalHourlyPoundsNeeded();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
    this.output();
  }
}
capitolHill.render();

var seattlePublicLibrary = {
  minNumCust: 9,
  maxNumCust: 45,
  avgCupsCust: 2.6,
  avgPndsCust: .02,
  numCupsPerPound: 16,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * avgCupsCust)
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalHourlyPounds: [], //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
  totalDailyCustomers: 0, //total number of customers per day at a specific location
  totalDailyCups: 0, //total cups sold per day
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalDailyPoundsNeeded: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  generateCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(tempCust);
      this.totalDailyCustomers += tempCust;
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = round((this.customersPerHour[i] * this.avgCupsCust), 1);
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = round((this.customersPerHour[i] * this.avgPndsCust), 1);
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = round((this.cupsPerHour[i] / this.numCupsPerPound), 1);
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
    }
  },
  generateTotalHourlyPoundsNeeded: function() {
    for (i = 0; i < hours.length; i++) {
      var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
      this.totalHourlyPounds.push(tempTotalHourlyPounds);
      this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
      console.log(this.totalHourlyPoundsNeeded + ' total hourly pounds needed');
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
      this.employeesPerHour.push(tempEmployees);
    }
  },
  output: function() {
    for (i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.totalHourlyPounds[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.poundsPerHourCups[i] + ' lbs), ' + this.poundsPerHourToGo[i] + ' lbs to-go]';
      seaLibraryUl.appendChild(liEl);
    }
    var customersLi = document.createElement('li');
    customersLi.textContent = 'Total customers at Seattle Public Library: ' + this.totalDailyCustomers;
    seaLibraryUl.appendChild(customersLi);
    var cupsLi = document.createElement('li');
    cupsLi.textContent = 'Total cups sold at Seattle Public Library: ' + round(this.totalDailyCups, 1);
    seaLibraryUl.appendChild(cupsLi);
    var totalDailyToGoPoundsLi = document.createElement('li');
    totalDailyToGoPoundsLi.textContent = 'Total to-go pound packages sold at Seattle Public Library: ' + round(this.totalPoundsToGo, 1);
    seaLibraryUl.appendChild(totalDailyToGoPoundsLi);
    var totalDailyPoundsLi = document.createElement('li');
    totalDailyPoundsLi.textContent = 'Total pounds of beans needed at Seattle Public Library: ' + round(this.totalDailyPoundsNeeded, 1);
    seaLibraryUl.appendChild(totalDailyPoundsLi);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalHourlyPoundsNeeded();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
    this.output();
  }
}
seattlePublicLibrary.render();

var southLakeUnion = {
  minNumCust: 5,
  maxNumCust: 18,
  avgCupsCust: 1.3,
  avgPndsCust: .04,
  numCupsPerPound: 16,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * avgCupsCust)
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalHourlyPounds: [], //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
  totalDailyCustomers: 0, //total number of customers per day at a specific location
  totalDailyCups: 0, //total cups sold per day
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalDailyPoundsNeeded: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  generateCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(tempCust);
      this.totalDailyCustomers += tempCust;
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = round((this.customersPerHour[i] * this.avgPndsCust), 1);
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = round((this.cupsPerHour[i] / this.numCupsPerPound), 1);
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
    }
  },
  generateTotalHourlyPoundsNeeded: function() {
    for (i = 0; i < hours.length; i++) {
      var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
      this.totalHourlyPounds.push(tempTotalHourlyPounds);
      this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
      //this.totalHourlyPoundsNeeded = this.poundsPerHourCups[i] + this.poundsPerHourToGo[i];
      console.log(this.totalHourlyPoundsNeeded + ' total hourly pounds needed');
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
      this.employeesPerHour.push(tempEmployees);
    }
  },
  output: function() {
    for (i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.totalHourlyPounds[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.poundsPerHourCups[i] + ' lbs), ' + this.poundsPerHourToGo[i] + ' lbs to-go]';
      sluUl.appendChild(liEl);
    }
    var customersLi = document.createElement('li');
    customersLi.textContent = 'Total customers at South Lake Union: ' + this.totalDailyCustomers;
    sluUl.appendChild(customersLi);
    var cupsLi = document.createElement('li');
    cupsLi.textContent = 'Total cups sold at South Lake Union: ' + round(this.totalDailyCups, 1);
    sluUl.appendChild(cupsLi);
    var totalDailyToGoPoundsLi = document.createElement('li');
    totalDailyToGoPoundsLi.textContent = 'Total to-go pound packages sold at South Lake Union: ' + round(this.totalPoundsToGo, 1);
    sluUl.appendChild(totalDailyToGoPoundsLi);
    var totalDailyPoundsLi = document.createElement('li');
    totalDailyPoundsLi.textContent = 'Total pounds of beans needed at South Lake Union: ' + round(this.totalDailyPoundsNeeded, 1);
    sluUl.appendChild(totalDailyPoundsLi);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalHourlyPoundsNeeded();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
    this.output();
  }
}
southLakeUnion.render();

var seaTacAirport = {
  minNumCust: 28,
  maxNumCust: 44,
  avgCupsCust: 1.1,
  avgPndsCust: .41,
  numCupsPerPound: 16,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * avgCupsCust)
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalHourlyPounds: [], //array that holds the total hourly pounds needed to fulfill cup orders and to-go orders
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
  totalDailyCustomers: 0, //total number of customers per day at a specific location
  totalDailyCups: 0, //total cups sold per day
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalDailyPoundsNeeded: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  generateCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var tempCust = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(tempCust);
      this.totalDailyCustomers += tempCust;
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = round((this.customersPerHour[i] * this.avgCupsCust), 1);
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = round((this.customersPerHour[i] * this.avgPndsCust), 1);
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = round((this.cupsPerHour[i] / this.numCupsPerPound), 1);
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
    }
  },
  generateTotalHourlyPoundsNeeded: function() {
    for (i = 0; i < hours.length; i++) {
      var tempTotalHourlyPounds = round((this.poundsPerHourCups[i] + this.poundsPerHourToGo[i]), 1);
      this.totalHourlyPounds.push(tempTotalHourlyPounds);
      this.totalHourlyPoundsNeeded = tempTotalHourlyPounds;
      console.log(this.totalHourlyPoundsNeeded + ' total hourly pounds needed');
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  round((this.totalPoundsToGo + this.totalPoundsForCups), 1);
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
      this.employeesPerHour.push(tempEmployees);
    }
  },
  output: function() {

    for (i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = hours[i] + ': ' + this.totalHourlyPounds[i] + ' lbs [' + this.customersPerHour[i] + ' customers, ' + this.cupsPerHour[i] + ' cups (' + this.poundsPerHourCups[i] + ' lbs), ' + this.poundsPerHourToGo[i] + ' lbs to-go]';
      console.log(pikePlaceUl);
      seaTacUl.appendChild(liEl);
    }
    var customersLi = document.createElement('li');
    customersLi.textContent = 'Total customers at Sea-Tac Airport: ' + this.totalDailyCustomers;
    seaTacUl.appendChild(customersLi);
    var cupsLi = document.createElement('li');
    cupsLi.textContent = 'Total cups sold at Sea-Tac Airport: ' + round(this.totalDailyCups, 1);
    seaTacUl.appendChild(cupsLi);
    var totalDailyToGoPoundsLi = document.createElement('li');
    totalDailyToGoPoundsLi.textContent = 'Total to-go pound packages sold at Sea-Tac Airport: ' + round(this.totalPoundsToGo, 1);
    seaTacUl.appendChild(totalDailyToGoPoundsLi);
    var totalDailyPoundsLi = document.createElement('li');
    totalDailyPoundsLi.textContent = 'Total pounds of beans needed at Sea-Tac Airport: ' + round(this.totalDailyPoundsNeeded, 1);
    seaTacUl.appendChild(totalDailyPoundsLi);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalHourlyPoundsNeeded();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
    this.output();
  }
}
seaTacAirport.render();
