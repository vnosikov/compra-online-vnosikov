class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    this.products = this.products.map(product =>
      getUpdaterByName(product.name)(product)
    );

    return this.products;
  }
}

const defaultSellInUpdater = sellIn => sellIn - 1;
const defaultPriceUpdater = (price, sellIn) =>
  Math.max(0, sellIn > 0 ? price - 1 : price - 2 );

const fullCoveragePriceUpdater = (price, sellIn) =>
  Math.min(50, sellIn >0 ? price + 1 : price + 2);

//TODO: fixme
const specialFullCoveragePriceUpdater = (price, sellIn) => price + 1

const updater = (
  priceUpdater = defaultPriceUpdater,
  sellInUpdater = defaultSellInUpdater
) => product => ({
  price: priceUpdater(product.price, product.sellIn),
  sellIn: sellInUpdater(product.sellIn),
  name: product.name
});

const defaultUpdater = updater();
const fullCoverageUpdater = updater(fullCoveragePriceUpdater);
const megaCoverageUpdater = updater(
  (price, sellIn) => price,
   sellIn => sellIn
 );
const speicalFullCoverageUpdater = updater(specialFullCoveragePriceUpdater);

const updatersDictionary = {
  "Full Coverage": fullCoverageUpdater,
  "Mega Coverage": megaCoverageUpdater,
  "Special Full Coverage": specialFullCoveragePriceUpdater
};

const getUpdaterByName = name => updatersDictionary[name] || defaultUpdater;

module.exports = {
  Product,
  CarInsurance
}
