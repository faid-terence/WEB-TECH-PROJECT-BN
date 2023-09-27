import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class User {
    @Prop()
    name: string;

    @Prop()
    email: string

    @Prop()
    password : string

    @Prop()
    gender: string

    @Prop()
    isAdmin: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);