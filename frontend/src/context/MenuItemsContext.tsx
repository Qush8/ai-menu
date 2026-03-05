import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { MenuItem } from '../types/menu';
import { MOCK_MENU_ITEMS } from '../data/mockData';

interface MenuItemsContextValue {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  updateItem: (id: string, item: Partial<Omit<MenuItem, 'id'>>) => void;
  deleteItem: (id: string) => void;
}

const MenuItemsContext = createContext<MenuItemsContextValue | null>(null);

export const MenuItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>(MOCK_MENU_ITEMS);

  const addItem = useCallback((item: Omit<MenuItem, 'id'>) => {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    setItems((prev) => [...prev, { ...item, id }]);
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<Omit<MenuItem, 'id'>>) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, ...updates } : it))
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const value: MenuItemsContextValue = { items, addItem, updateItem, deleteItem };

  return (
    <MenuItemsContext.Provider value={value}>
      {children}
    </MenuItemsContext.Provider>
  );
};

export const useMenuItems = (): MenuItemsContextValue => {
  const ctx = useContext(MenuItemsContext);
  if (!ctx) {
    throw new Error('useMenuItems must be used within MenuItemsProvider');
  }
  return ctx;
};
