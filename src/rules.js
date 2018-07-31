// sellIn always decreases by one
const defaultSellInUpdater = sellIn => sellIn - 1;

// Usually price decreses by 1 or by 2 if a sell date has passed.
// Price can't be lower then 0
const defaultPriceUpdater = (price, sellIn) =>
  Math.max(0, sellIn > 0 ? price - 1 : price - 2 );

// Full coverage products have their price increased, instead of decreased
// It can't be higher then 50 though
const fullCoveragePriceUpdater = (price, sellIn) =>
  Math.min(50, sellIn > 0 ? price + 1 : price + 2);

// Special full coverage products have their price increased faster when
// a sell date approaches. After the sell date the price falls to 0.
const specialFullCoveragePriceUpdater = (price, sellIn) => {
  if (sellIn > 10) return Math.min(50, price + 1);
  else if (sellIn > 5) return Math.min(50, price + 2);
  else if (sellIn > 0) return Math.min(50, price + 3);
  else return 0;
};

// Super sale products have their price decreased two times faster then normal
const superSalePriceUpdater = (price, sellIn) =>
  Math.max(0, sellIn > 0 ? price -2 : price - 4);

// This function gets two functions that describe how sellIn and price should change
// and returns a function that will apply this transformations to a product
const updater = (
  priceUpdater = defaultPriceUpdater,
  sellInUpdater = defaultSellInUpdater
) => product => ({
  name: product.name,
  sellIn: sellInUpdater(product.sellIn),
  price: priceUpdater(product.price, product.sellIn)
});

const defaultUpdater = updater();
const fullCoverageUpdater = updater(fullCoveragePriceUpdater);
const megaCoverageUpdater = updater(                       // Mega coverage product ignore updates
  (price, sellIn) => price,
   sellIn => sellIn
 );
const specialFullCoverageUpdater = updater(specialFullCoveragePriceUpdater);
const superSaleUpdater = updater(superSalePriceUpdater);

const updatersDictionary = {
  "Full Coverage": fullCoverageUpdater,
  "Mega Coverage": megaCoverageUpdater,
  "Special Full Coverage": specialFullCoverageUpdater,
  "Super Sale": superSaleUpdater
};

// This function looks in the dictionary for an updater that we need
// or returns a default one if
const getUpdaterByName = name => updatersDictionary[name] || defaultUpdater;

module.exports = {
  getUpdaterByName
};
