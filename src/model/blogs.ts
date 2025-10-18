export type BlogContent = {
    title: string;
    description: string;
    content: string;
    img?: string;
}

export type Blog = BlogContent & {
    id: string;
    tags?: string[];
    date: Date;
  }