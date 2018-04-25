let chance = require('chance');

function ads1x15(chip) {
  this.temp = 210;
  this.dial = 240;
}

ads1x15.prototype.readCh = channel => {
  if (channel === 1) {
    //dial 233=70F
    if (this.dial < 200) this.dial += chance.floating({ min: 1, max: 10 });
    else this.dial -= chance.floating({ min: 1, max: 10 });
    return this.dial;
  }
  if (channel === 0) {
    //temp 200=70F
    if (this.temp < 180) this.temp += chance.floating({ min: 1, max: 10 });
    else this.temp -= chance.floating({ min: 1, max: 10 });
    return this.temp;
  }
};
