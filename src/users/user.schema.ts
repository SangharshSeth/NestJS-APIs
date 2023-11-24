import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    age: number;

    @Prop({required: true})
    isPremium: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);