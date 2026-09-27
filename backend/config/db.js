const mongoose = require("mongoose");
const dns = require("node:dns");

const connectDB = async () => {
    try {
        const dnsServers = process.env.DNS_SERVERS
            ? process.env.DNS_SERVERS.split(",").map((s) => s.trim())
            : ["8.8.8.8", "1.1.1.1"];
        dns.setServers(dnsServers);

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message || error);
        process.exit(1);
    }
};

module.exports = connectDB;
