import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

import connectDB from './config/db.js'

dotenv.config()

/* =========================
   CONNECT DATABASE
========================= */
const runSeeder = async () => {
  try {
    await connectDB()

    if (process.argv[2] === '-d') {
      await destroyData()
    } else {
      await importData()
    }

    // ✅ Close DB connection properly
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error(`Seeder Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

/* =========================
   IMPORT DATA
========================= */
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }))

    await Product.insertMany(sampleProducts)

    console.log('✅ Data Imported Successfully'.green.inverse)
  } catch (error) {
    throw error
  }
}

/* =========================
   DESTROY DATA
========================= */
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('❌ Data Destroyed Successfully'.red.inverse)
  } catch (error) {
    throw error
  }
}

runSeeder()




// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import colors from 'colors';
// import users from './data/users.js';
// import products from './data/products.js';
// import User from './models/userModel.js';
// import Product from './models/productModel.js';
// import Order from './models/orderModel.js';
// import connectDB from './config/db.js';

// dotenv.config();

// connectDB();

// const importData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     const createdUsers = await User.insertMany(users);

//     const adminUser = createdUsers[0]._id;

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser };
//     });

//     await Product.insertMany(sampleProducts);

//     console.log('Data Imported!'.green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log('Data Destroyed!'.red.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
