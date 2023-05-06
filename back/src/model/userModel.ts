import mongoose, { Schema, Types } from 'mongoose';

interface IUserMongoose {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

const UserSchema = new Schema<IUserMongoose>({
  id: { type: Schema.Types.ObjectId, ref: 'id' },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
