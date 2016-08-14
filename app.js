var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];

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
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
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
      console.log(tempCust);
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
      console.log(this.cupsPerHour);
      console.log(this.totalDailyCups);
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = this.customersPerHour[i] * this.avgPndsCust;
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
      console.log(this.poundsPerHourToGo);
      console.log(this.totalPoundsToGo);
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = this.cupsPerHour[i] / this.numCupsPerPound;
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
      console.log(this.poundsPerHourCups);
      console.log(this.totalPoundsForCups);
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPoundsNeeded);
  },
  generateEmployeesPerHour: function() {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
    console.log(this.employeesPerHour);
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
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
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
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
      console.log(tempCust);
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
      console.log(this.cupsPerHour);
      console.log(this.totalDailyCups);
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = this.customersPerHour[i] * this.avgPndsCust;
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
      console.log(this.poundsPerHourToGo);
      console.log(this.totalPoundsToGo);
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = this.cupsPerHour[i] / this.numCupsPerPound;
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
      console.log(this.poundsPerHourCups);
      console.log(this.totalPoundsForCups);
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPoundsNeeded);
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
    console.log(this.employeesPerHour);
    }
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
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
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
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
      console.log(tempCust);
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
      console.log(this.cupsPerHour);
      console.log(this.totalDailyCups);
      //return this.totalDailyCups; Why does this line screw it all up?
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = this.customersPerHour[i] * this.avgPndsCust;
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
      console.log(this.poundsPerHourToGo);
      console.log(this.totalPoundsToGo);
      //return this.totalPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = this.cupsPerHour[i] / this.numCupsPerPound;
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
      console.log(this.poundsPerHourCups);
      console.log(this.totalPoundsForCups);
      //return this.totalPoundsForCups
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPoundsNeeded);
    //  return this.totalDailyPoundsNeeded;
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
    console.log(this.employeesPerHour);
    }
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
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
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
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
      console.log(tempCust);
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
      console.log(this.cupsPerHour);
      console.log(this.totalDailyCups);
      //return this.totalDailyCups; Why does this line screw it all up?
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = this.customersPerHour[i] * this.avgPndsCust;
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
      console.log(this.poundsPerHourToGo);
      console.log(this.totalPoundsToGo);
      //return this.totalPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = this.cupsPerHour[i] / this.numCupsPerPound;
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
      console.log(this.poundsPerHourCups);
      console.log(this.totalPoundsForCups);
      //return this.totalPoundsForCups
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPoundsNeeded);
    //  return this.totalDailyPoundsNeeded;
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
    console.log(this.employeesPerHour);
    }
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
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
  employeesPerHour: [], //array that holds number of employees needed per hour (based on customersPerHour)
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
      console.log(tempCust);
    }
  },
  generateCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempCups = this.customersPerHour[i] * this.avgCupsCust;
      this.cupsPerHour.push(tempCups);
      this.totalDailyCups += tempCups;
      console.log(this.cupsPerHour);
      console.log(this.totalDailyCups);
      //return this.totalDailyCups; Why does this line screw it all up?
    }
  },
  generatePoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsToGo = this.customersPerHour[i] * this.avgPndsCust;
      this.poundsPerHourToGo.push(tempPoundsToGo);
      this.totalPoundsToGo += tempPoundsToGo;
      console.log(this.poundsPerHourToGo);
      console.log(this.totalPoundsToGo);
      //return this.totalPoundsToGo;
    }
  },
  generatePoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      var tempPoundsForCups = this.cupsPerHour[i] / this.numCupsPerPound;
      this.poundsPerHourCups.push(tempPoundsForCups);
      this.totalPoundsForCups += tempPoundsForCups;
      console.log(this.poundsPerHourCups);
      console.log(this.totalPoundsForCups);
      //return this.totalPoundsForCups
    }
  },
  generateTotalDailyPoundsNeeded: function() {
    this.totalDailyPoundsNeeded =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPoundsNeeded);
    //return this.totalDailyPoundsNeeded;
  },
  generateEmployeesPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
    var tempEmployees = Math.ceil(this.customersPerHour[i] / 30);
    this.employeesPerHour.push(tempEmployees);
    console.log(this.employeesPerHour);
    }
  },
  render: function() {
    this.getRandomNum(this.minNumCust, this.maxNumCust);
    this.generateCustomersPerHour();
    this.generateCupsPerHour();
    this.generatePoundsPerHourToGo();
    this.generatePoundsPerHourCups();
    this.generateTotalDailyPoundsNeeded();
    this.generateEmployeesPerHour();
  }
}
seaTacAirport.render();
