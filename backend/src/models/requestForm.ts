import { Schema, Document, model, Types } from "mongoose";

// Refer: https://mongoosejs.com/docs/typescript/statics.html

export interface IRequestForm extends Document {
  customer: Types.ObjectId;
  productType: string;
  issueType: string[];
  issueDescription?: string;
  policyUpload: string;
  assignedEmployee?: Types.ObjectId;
}

const RequestFormSchema = new Schema<IRequestForm>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },

  productType: {
    type: String,
    required: true,
  },

  issueType: {
    type: [String],
    required: true,
  },

  issueDescription: {
    type: String,
  },

  policyUpload: {
    type: String,
    required: true,
  },

  assignedEmployee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
});

export const RequestForm = model<IRequestForm>(
  "RequestForm",
  RequestFormSchema
);
