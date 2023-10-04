import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({
    timestamps: true
})

export class UserVerification {
    @Prop()
    userId: string;

    @Prop()
    uniqueString: string

    @Prop()
    createdAt: Date

    @Prop()
    expiresAt: Date
}

export const UserVerificationSchema = SchemaFactory.createForClass(UserVerification);