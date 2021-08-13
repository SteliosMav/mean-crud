export interface Post {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  image?: File;
  createdAt?: string;
  updatedAt?: string;
  imagePath?: string;
}
