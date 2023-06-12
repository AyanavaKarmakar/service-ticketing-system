export interface IRequestForm {
  productType: string;
  issueType: string[];
  status: 'Open' | 'In Progress' | 'On Hold' | 'Completed';
  dateOfSubmission: string;
}

export interface ICustomerRequestFormResponse {
  requestForms: IRequestForm[];
}
