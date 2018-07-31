const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Co Test", function() {
  it("should update default product", function() {
    const insurance = new CarInsurance([
      new Product('Default Coverage', 20, 25),
      new Product('Medium Coverage', 0, 25),
      new Product ('Low Coverage', 0, 0)
    ]);

    insurance.updatePrice();
    expect(insurance.products[0].price).equal(24);
    expect(insurance.products[1].price).equal(23);
    expect(insurance.products[2].price).equal(0);
  });

  it("should update full coverage product", function() {
    const insurance = new CarInsurance([
      new Product('Full Coverage', 20, 25),
      new Product('Full Coverage', 0, 5),
      new Product ('Full Coverage', 0, 50)
    ]);

    insurance.updatePrice();
    expect(insurance.products[0].price).equal(26);
    expect(insurance.products[1].price).equal(7);
    expect(insurance.products[2].price).equal(50);
  });

  it("should update mega coverage product", function() {
    const insurance = new CarInsurance([
      new Product('Mega Coverage', 20, 80),
      new Product('Mega Coverage', 0, 0),
    ]);

    insurance.updatePrice();
    expect(insurance.products[0].price).equal(80);
    expect(insurance.products[1].price).equal(0);
    expect(insurance.products[0].sellIn).equal(20);
    expect(insurance.products[1].sellIn).equal(0);
  });

  it("should update special full coverage product", function() {
    const insurance = new CarInsurance([
      new Product('Special Full Coverage', 20, 20),
      new Product('Special Full Coverage', 10, 20),
      new Product ('Special Full Coverage', 5, 20),
      new Product ('Special Full Coverage', 0, 20),
      new Product ('Special Full Coverage', 8, 50)
    ]);

    insurance.updatePrice();
    expect(insurance.products[0].price).equal(21);
    expect(insurance.products[1].price).equal(22);
    expect(insurance.products[2].price).equal(23);
    expect(insurance.products[3].price).equal(0);
    expect(insurance.products[4].price).equal(50);
  });

  it("should update super sale product", function() {
    const insurance = new CarInsurance([
      new Product('Super Sale', 20, 25),
      new Product('Super Sale', 0, 20),
      new Product ('Super Sale', 0, 0),
    ]);

    insurance.updatePrice();
    expect(insurance.products[0].price).equal(23);
    expect(insurance.products[1].price).equal(16);
    expect(insurance.products[2].price).equal(0);
  });

  it("should create empty car insurance if products were not specified", function() {
    const insurance = new CarInsurance();
    insurance.updatePrice();
    expect(insurance.products.length).equal(0);
  });


});
