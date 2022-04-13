const cars = [];

module.exports = class Car {
  constructor(carname) {
    this.carname = carname;
  }

  save() {
    cars.push(this);
  }

  fetchAll() {
    return cars;
  }
}