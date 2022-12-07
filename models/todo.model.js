import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            maxlength: 50
        },
        deadline: {
            type: Date,
            required: true
        },
        progress: {
            type: String,
            enum: ["Não iniciado", "Em Progresso", "Finalizado"]
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