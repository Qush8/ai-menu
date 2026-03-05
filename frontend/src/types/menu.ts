export type Category = 'pizza' | 'drinks' | 'desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
}

export type CategoryFilterValue = Category | 'all';
