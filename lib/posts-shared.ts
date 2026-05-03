export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  category?: string;
  tags?: string[];
}
