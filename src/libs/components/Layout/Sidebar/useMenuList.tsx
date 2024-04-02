import CategoryIcon from '@public/assets/svgs/category.svg'
import DashboardIcon from '@public/assets/svgs/dashboard.svg'
import OrderIcon from '@public/assets/svgs/order.svg'
import ProductIcon from '@public/assets/svgs/product.svg'
import UserIcon from '@public/assets/svgs/user.svg'
import { menuText } from '@public/locales'

const useMenuList = () => {
  const menus = [
    { title: menuText.home, icon: DashboardIcon, href: '/' },
    {
      title: menuText.product,
      icon: ProductIcon,
      href: '/product',
    },
    {
      title: menuText.category,
      icon: CategoryIcon,
      href: '/category',
    },
    {
      title: menuText.order,
      icon: OrderIcon,
      href: '/order',
    },
    {
      title: menuText.user,
      icon: UserIcon,
      href: '/user',
    },
  ]

  return { menus }
}

export { useMenuList }
