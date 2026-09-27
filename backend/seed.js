require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("./models/product");
const User = require("./models/User");
const Order = require("./models/order");

const demoEmails = [
    "admin@shopnest.demo",
    "alex@shopnest.demo",
    "maya@shopnest.demo"
];

const demoProductNames = [
    "Classic Cotton T-Shirt",
    "Everyday Denim Jacket",
    "Minimal Leather Sneakers",
    "Canvas Travel Backpack",
    "Stainless Steel Water Bottle",
    "Wireless Noise-Canceling Headphones"
];

const products = [
    {
        name: "Classic Cotton T-Shirt",
        price: 24.99,
        description: "A soft, breathable cotton t-shirt for everyday wear.",
        category: "Clothing",
        stock: 48,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        rating: 4.5,
        numReviews: 18
    },
    {
        name: "Everyday Denim Jacket",
        price: 64.99,
        description: "A durable denim layer with a comfortable regular fit.",
        category: "Clothing",
        stock: 22,
        imageUrl: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=800",
        rating: 4.7,
        numReviews: 11
    },
    {
        name: "Minimal Leather Sneakers",
        price: 89.99,
        description: "Clean, versatile sneakers made with smooth faux leather.",
        category: "Footwear",
        stock: 16,
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        rating: 4.6,
        numReviews: 27
    },
    {
        name: "Canvas Travel Backpack",
        price: 54.99,
        description: "A roomy canvas backpack with pockets for work and travel.",
        category: "Bags",
        stock: 31,
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        rating: 4.8,
        numReviews: 14
    },
    {
        name: "Stainless Steel Water Bottle",
        price: 19.99,
        description: "A reusable insulated bottle that keeps drinks cold for hours.",
        category: "Lifestyle",
        stock: 65,
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
        rating: 4.4,
        numReviews: 21
    },
    {
        name: "Wireless Noise-Canceling Headphones",
        price: 129.99,
        description: "Comfortable wireless headphones with immersive sound.",
        category: "Electronics",
        stock: 12,
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        rating: 4.9,
        numReviews: 36
    }
];

async function seedDatabase() {
    await mongoose.connect(process.env.MONGO_URI);

    const password = await bcrypt.hash("Shopnest123!", 10);

    await Order.deleteMany({
        user: { $in: await User.find({ email: { $in: demoEmails } }).distinct("_id") }
    });
    await User.deleteMany({ email: { $in: demoEmails } });
    await Product.deleteMany({ name: { $in: demoProductNames } });

    const users = await User.insertMany([
        { name: "ShopNest Admin", email: demoEmails[0], password, role: "admin" },
        { name: "Alex Morgan", email: demoEmails[1], password, role: "user" },
        { name: "Maya Patel", email: demoEmails[2], password, role: "user" }
    ]);

    const insertedProducts = await Product.insertMany(products);
    const alex = users.find((user) => user.email === demoEmails[1]);
    const maya = users.find((user) => user.email === demoEmails[2]);

    await Order.insertMany([
        {
            user: alex._id,
            products: [
                { productId: insertedProducts[0]._id, quantity: 2 },
                { productId: insertedProducts[4]._id, quantity: 1 }
            ],
            totalAmount: "69.97",
            addresss: {
                fullname: "Alex Morgan",
                street: "14 Market Street",
                city: "Pune",
                posatlCode: "411001",
                country: "India"
            },
            status: "delivered",
            paymentId: "demo_payment_alex"
        },
        {
            user: maya._id,
            products: [
                { productId: insertedProducts[2]._id, quantity: 1 },
                { productId: insertedProducts[3]._id, quantity: 1 }
            ],
            totalAmount: "144.98",
            addresss: {
                fullname: "Maya Patel",
                street: "28 Lake View Road",
                city: "Mumbai",
                posatlCode: "400001",
                country: "India"
            },
            status: "shipped",
            paymentId: "demo_payment_maya"
        }
    ]);

    console.log("Seed complete: 3 users, 6 products, and 2 orders created.");
    console.log("Login credentials:");
    console.log(`Admin: ${demoEmails[0]} / Shopnest123!`);
    console.log(`User: ${demoEmails[1]} / Shopnest123!`);
    console.log(`User: ${demoEmails[2]} / Shopnest123!`);
}

seedDatabase()
    .catch((error) => {
        console.error("Seed failed:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await mongoose.connection.close();
    });