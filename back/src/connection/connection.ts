const mongoose = require('mongoose');

const MONGO_DB_URL = 'mongodb://localhost:27017/dungeon-character';

const connectToDatabase = async () => await mongoose.connect(MONGO_DB_URL);

export default connectToDatabase;