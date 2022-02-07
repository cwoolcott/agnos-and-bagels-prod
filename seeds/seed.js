const db = require('../config/connection');
const { MenuItems, Order, TaxCategory } = require('../models');

const menuItemsData = require('./menuItemsData.json');
//const orderData = require('./orderData.json');
const taxCategoryData = require('./taxCategoryData.json');

db.once('open', async () => {
  // clean database
  await MenuItems.deleteMany({});
  //await Order.deleteMany({});
  await TaxCategory.deleteMany({});

  // bulk create each model
  const menuItems = await MenuItems.insertMany(menuItemsData);
  //const orders = await Order.insertMany(orderData);
  const taxCategories = await TaxCategory.insertMany(taxCategoryData);

  //assign TaxCodes
  for (item of menuItems) {

    for (taxCode of taxCategories) {
      if (taxCode.type == item.taxType) {
        item.taxCategory = taxCode._id;
      }
    }
    await item.save();
  }

  // Random Items added to Orders
  // for (newOrder of orders) {

  //   //Add two random Items to orders
  //   const tempMenuItemOne = menuItems[Math.floor(Math.random() * menuItems.length)];
  //   const tempMenuItemTwo = menuItems[Math.floor(Math.random() * menuItems.length)];

  //   newOrder.menuItems.push(tempMenuItemOne._id, tempMenuItemTwo._id);
  //   await newOrder.save();
  // }


  console.log('all done!');
  process.exit(0);
});
