export interface INewsAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  title: string;
  slug: string;
  content?: string;
  coverImage: string;
}
