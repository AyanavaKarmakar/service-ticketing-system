/** FOR GET REQUEST OF ALL CUSTOMER REQUEST FORMS */

export interface IRequestForm {
  _id: string;
  productType: string;
  issueType: string[];
  status: 'Open' | 'In Progress' | 'On Hold' | 'Completed';
  dateOfSubmission: string;
}

export interface ICustomerRequestFormResponse {
  requestForms: IRequestForm[];
}

/** FOR GET REQUEST OF GETTING DATA OF A SINGLE CUSTOMER REQUEST FORM */

export interface IRequestFormData {
  productType: string;
  issueType: string[];
  issueDescription?: string;
  policyUpload: string;
  dateOfSubmission: string;
  status: 'Open' | 'In Progress' | 'On Hold' | 'Completed';
}

export interface ICustomerRequestFormDataResponse {
  requestForm: IRequestFormData;
}
