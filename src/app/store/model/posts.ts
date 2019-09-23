export interface Posts {
  active: Post;
  list: Post[];
}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
