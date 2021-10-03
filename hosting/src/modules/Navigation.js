import {
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
} from 'react-feather';

const items = [
  {
    href: '/app/games',
    icon: LockIcon,
    title: 'Games'
  },
  {
    href: '/app/factories',
    icon: LockIcon,
    title: 'Factories'
  },
  {
    href: '/open/products',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '/open/recipes',
    icon: ShoppingBagIcon,
    title: 'Recipes'
  },
  {
    href: '/open/buildables',
    icon: ShoppingBagIcon,
    title: 'Buildables'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];

export default items;
