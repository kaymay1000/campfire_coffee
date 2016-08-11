var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm'];

var pikePlaceMarket = {
  minNumCust: 14,
  maxNumCust: 35,
  avgCupsCust: 1.2,
  avgPndsCust: .34,
  randomNumCust: [],
  randomNumCups: [],
  randomNum: function(minNumCust, maxNumCust) {
    return Math.floor(Math.random() * (maxNumCust - minNumCust) + minNumCust);
  },
  customersPerHour: function() {
    for (i = 0; i < hours.length; i++) {
      var numCustPerHour = this.randomNum(this.minNumCust, this.maxNumCust);
      console.log(numCustPerHour);
      this.randomNumCust.push(numCustPerHour);
    }
  },
  cupsPerHour: function() {
    for (i = 0; i < this.randomNumCust.length; i++) {
      numCupsPerHour = this.randomNumCust[i] * 1.2;
      console.log(this.randomNumCups)
      this.randomNumCups.push(numCupsPerHour);
      //return totalCupsForDay = this.randomNumCups + numCupsPerHour;
      //console.log(totalCupsForDay);
    }

  }
}
pikePlaceMarket.randomNum(pikePlaceMarket.minNumCust, pikePlaceMarket.maxNumCust);
pikePlaceMarket.customersPerHour();
pikePlaceMarket.cupsPerHour();
