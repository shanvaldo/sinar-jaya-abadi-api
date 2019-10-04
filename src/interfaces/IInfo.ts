export interface IInfoAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  companyName: string;
  street?: string;
  city?: string;
  state?: string;
  postCode?: string;
  phones: Array<string>;
  emails: Array<string>;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedIn?: string;
}
