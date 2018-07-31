const defaultSellInUpdater = sellIn => sellIn - 1;
const defaultPriceUpdater = (price, sellIn) =>
  Math.max(0, sellIn > 0 ? price - 1 : price - 2 );

const fullCoveragePriceUpdater = (price, sellIn) =>
  Math.min(50, sellIn >0 ? price + 1 : price + 2);

const specialFullCoveragePriceUpdater = (price, sellIn) => {
  if (sellIn > 10) return Math.min(50, price + 1);
  else if (sellIn > 5) return Math.min(50, price + 2);
  else if (sellIn > 0) return Math.min(50, price + 3);
  else return 0;
};

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
const specialFullCoverageUpdater = updater(specialFullCoveragePriceUpdater);

const updatersDictionary = {
  "Full Coverage": fullCoverageUpdater,
  "Mega Coverage": megaCoverageUpdater,
  "Special Full Coverage": specialFullCoverageUpdater
};

const getUpdaterByName = name => updatersDictionary[name] || defaultUpdater;

module.exports = {
  getUpdaterByName
}
