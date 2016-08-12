var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];

var pikePlaceMarket = {
  minNumCust: 14,
  maxNumCust: 35,
  avgCupsCust: 1.2,
  avgPndsCust: .34,
  customersPerHour: [], //array that holds 16 random numbers of customers, one number for each hour.
  cupsPerHour: [], //array that holds number of cups sold per hour (customersPerHour * 1.2)
  totalDailyCups: 0, //total cups sold per day
  poundsPerHourToGo: [], //array that holds number of pounds to-go per hour (customersPerHour * .34)
  poundsPerHourCups: [], //array that holds number of pounds needed for cups per hour (cupsPerHour / 16)
  totalPoundsToGo: 0, //total pounds needed to fulfill daily to-go orders(sum of poundsPerHourToGo array)
  totalPoundsForCups: 0, //total pounds needed to fulfill daily cup orders (sum of poundsPerHourCups array)
  totalDailyPounds: 0, //sum of totalPoundsToGo and totalPoundsForCups
  getRandomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  getCustomersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var numCustPerHour = this.getRandomNum(this.minNumCust, this.maxNumCust);
      this.customersPerHour.push(numCustPerHour);
      console.log(numCustPerHour);
    }
  },
  getCupsPerHour: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      numCupsPerHour = this.customersPerHour[i] * 1.2;
      this.cupsPerHour.push(numCupsPerHour);
      this.totalDailyCups += numCupsPerHour;
      console.log(this.cupsPerHour + ' cups array');
      console.log(this.totalDailyCups);
      //return this.totalDailyCups; Why does this line screw it all up?
    }
  },
  getPoundsPerHourToGo: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      numPoundsPerHourToGo = this.customersPerHour[i] * 0.34;
      this.poundsPerHourToGo.push(numPoundsPerHourToGo);
      this.totalPoundsToGo += numPoundsPerHourToGo;
      console.log(this.poundsPerHourToGo + ' pounds to-go array');
      console.log(this.totalPoundsToGo);
      //return this.totalPoundsToGo;
    }
  },

  getPoundsPerHourCups: function() {
    for (i = 0; i < this.customersPerHour.length; i++) {
      numPoundsPerHourForCups = this.cupsPerHour[i] / 16; //need var?
      this.poundsPerHourCups.push(numPoundsPerHourForCups);
      this.totalPoundsForCups += numPoundsPerHourForCups;
      console.log(this.poundsPerHourCups + ' pounds for cups array');
      console.log(this.totalPoundsForCups);
      //return this.totalPoundsForCups
  }
},

  totalDailyPoundsNeeded: function() {

    this.totalDailyPounds =  this.totalPoundsToGo + this.totalPoundsForCups;
    console.log(this.totalDailyPounds + ' total daily pounds');
  //  return this.totalDailyPounds;
  }

}
pikePlaceMarket.getRandomNum(pikePlaceMarket.minNumCust, pikePlaceMarket.maxNumCust);
pikePlaceMarket.getCustomersPerHour();
pikePlaceMarket.getCupsPerHour();
pikePlaceMarket.getPoundsPerHourToGo();
pikePlaceMarket.getPoundsPerHourCups();
pikePlaceMarket.totalDailyPoundsNeeded();
