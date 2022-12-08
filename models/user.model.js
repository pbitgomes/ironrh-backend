import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    department: {
      type: String,
    },
    salary: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Disponível", "Alocado", "De Férias", "De Licença", "Produto"],
    },
    birthDate: {
      type: Date,
    },
    admissionDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
    },
    address: {
      city: { type: String },
      state: { type: String },
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
