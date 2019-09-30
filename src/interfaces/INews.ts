export interface INewsAttributes {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  nextNewsId?: string;
  previousNewsId?: string;

  title: string;
  slug: string;
  content?: string;
  coverImage: string;
}
