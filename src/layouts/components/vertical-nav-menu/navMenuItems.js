/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
==========================================================================================*/


export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/usuarios",
    name: "Usuários",
    slug: "usuario",
    icon: "UserIcon",
  },
  {
    url: "/categorias",
    name: "Categorias",
    slug: "categoria",
    icon: "ListIcon",
  },
  {
    url: "/produtos",
    name: "Produtos",
    slug: "produto",
    icon: "PackageIcon",
  }
]
