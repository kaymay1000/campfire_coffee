var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];

var pikePlaceMarket = {
  minNumCust: 14,
  maxNumCust: 35,
  avgCupsCust: 1.2,
  avgPndsCust: .34,
  randomNumCust: [],
  randomNumCups: [],
  randomNumPounds: [],
  totalDailyCups: 0,
  totalDailyPounds: 0,
  randomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  customersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var numCustPerHour = this.randomNum(this.minNumCust, this.maxNumCust);
      this.randomNumCust.push(numCustPerHour);
      console.log(numCustPerHour);
    }
  },
  cupsPerHour: function() {
    for (i = 0; i < this.randomNumCust.length; i++) {
      numCupsPerHour = this.randomNumCust[i] * 1.2;
      this.randomNumCups.push(numCupsPerHour);
      this.totalDailyCups += numCupsPerHour;
      console.log(this.randomNumCups); //array
      console.log(this.totalDailyCups); //just a number
      //return this.totalDailyCups; Why does this line screw it all up?
    }
  },
  poundsPerHour: function() {
    for (i = 0; i < this.randomNumCust.length; i++) {
      numPoundsPerHour = this.randomNumCust[i] * 0.34;
      this.randomNumPounds.push(numPoundsPerHour);
      this.totalDailyPounds += numPoundsPerHour;
      console.log(this.randomNumPounds); //array
      console.log(this.totalDailyPounds); //just a number
      //return this.totalDailyPounds; Why does this line screw it all up?
    }
  }

}
pikePlaceMarket.randomNum(pikePlaceMarket.minNumCust, pikePlaceMarket.maxNumCust);
pikePlaceMarket.customersPerHour();
pikePlaceMarket.cupsPerHour();
pikePlaceMarket.poundsPerHour();
