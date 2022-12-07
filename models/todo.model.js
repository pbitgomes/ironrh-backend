import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String,
            maxlength: 50
        },
        deadline: {
            type: Date
        },
        responsable: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }
    },
    {
        timestamps: true
    }
)

const TodoModel = model("Todo", todoSchema)

export default TodoModel