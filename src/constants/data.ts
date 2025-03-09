import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: Os dados a seguir são usados ​​para a navegação da barra lateral e barra Cmd K.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Produtos',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: []
  },
  {
    title: 'Configurações',
    url: '#',
    icon: 'userCog',
    isActive: true,
    items: [
      {
        title: 'Clientes',
        url: '/dashboard/cliente',
        shortcut: ['c', 'c']
      },
      {
        title: 'Academias',
        url: '/dashboard/academia',
        shortcut: ['a', 'a']
      },
      {
        title: 'Usuarios',
        url: '/dashboard/user',
        shortcut: ['u', 'u']
      }
    ]
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}
