export interface BlogContent {
  title: string;
  description: string;
  content: string;
  img?: string;
}

export interface Blog extends BlogContent {
  id: string;
  tags?: string[];
  date: Date;
}
