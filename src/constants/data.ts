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
    items: [] // Matriz vazia porque não há itens filhos para o Dashboard
  },
  {
    title: 'Produtos',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // Nenhum item filho
  },
  {
    title: 'Clientes',
    url: '/dashboard/cliente',
    icon: 'user',
    shortcut: ['c', 'c'],
    isActive: false,
    items: [] // Nenhum item filho
  },
  {
    title: 'Academias',
    url: '/dashboard/academia',
    icon: 'dumbbell',
    shortcut: ['a', 'a'],
    isActive: false,
    items: [] // Nenhum item filho
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // Nenhum item filho
  },
  {
    title: 'Configurações',
    url: '#', // Espaço reservado, pois não há link direto para o pai
    icon: 'userCog',
    isActive: true,
    items: [
      {
        title: 'Perfil',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
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
