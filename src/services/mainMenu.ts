// Menu options from modules
import odooProjectTestMenus from '@/modules/odoo-project-test/menu'

export interface MenuOption {
  to: String
  icon: String
  text: String
}

export const mainMenu: Array<MenuOption> = [
  {
    to: '/',
    icon: 'mdi-home',
    text: 'Inicio',
  },
  ...odooProjectTestMenus,
  {
    to: '/about',
    icon: 'mdi-information-outline',
    text: 'Acerca de nanoAPPs',
  },
]
