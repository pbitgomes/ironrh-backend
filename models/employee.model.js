import { model, Schema }  from "mongoose"

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            lowercase: true
        },
        position: {
            type: String,
            enum: ["Front-end", "Back-end", "Marketing", "People", "Produto"]
        },
        age: {
            type: Number,
        },
        active: {
            type: Boolean,
            default: true
        },
        address: {
            city: { type: String },
            state: { type: String }
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Todo"
            }
        ]
    },
    {
        timestamps: true,
    }
)

const EmployeeModel = model("Employee", employeeSchema)

export default EmployeeModel