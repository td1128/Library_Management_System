export const adminNavItems = [
  /*{
    navPath: '/admin/',
    navTitle: 'Home',
    navIcon: '/src/assets/icons/home-linear.png',
    navIconHover: '/src/assets/icons/home-bulk.png',
    subpath: []
  },*/
  {
    navPath: '/admin/books',
    navTitle: 'Books',
    navIcon: '/src/assets/icons/book-white.png',
    navIconHover: '/src/assets/icons/book-white.png',
    subPaths: [
        {
            subPath: '/admin/books/add',
            subTitle: 'Add/Edit a Book',
        },
        {
            subPath: '/admin/books/search',
            subTitle: 'Search a Book',
        },
    ]
  },
  {
    navPath: '/admin/transactions',
    navTitle: 'Transactions',
    navIcon: '/src/assets/icons/transaction-white.png',
    navIconHover: '/src/assets/icons/transaction-white.png',
    subPaths: [
        {
            subPath: '/admin/transactions/issue',
            subTitle: 'Issue a Book',
        },
        {
            subPath: '/admin/transactions/return',
            subTitle: 'Return a book',
        },
        {
            subPath: '/admin/transactions',
            subTitle: 'Transaction History',
        },
    ]
  },
  {
    navPath: '/admin/issue_notice',
    navTitle: 'Issue Notice',
    navIcon: '/src/assets/icons/notice-white.png',
    navIconHover: '/src/assets/icons/notice-white.png',
    subPaths: [],
  },
  {
    navPath: '/admin/settings',
    navTitle: 'Settings',
    navIcon: '/src/assets/icons/setting-white.png',
    navIconHover: '/src/assets/icons/setting-white.png',
    subPaths: [
        {
            subPath: '/admin/settings/library',
            subTitle: 'Library Settings',
        },
        {
            subPath: '/admin/settings/profile',
            subTitle: 'Admin Profile Settings',
        }
    ]
  },
]

export const userNavItems = [
  {
    navPath: '/user/',
    navTitle: 'Home',
    navIcon: '/src/assets/icons/home-linear.png',
    navIconHover: '/src/assets/icons/home-bulk.png',
    subPaths: [],
  },
  {
    navPath: '/user/books',
    navTitle: 'Books',
    navIcon: '/src/assets/icons/book-linear.png',
    navIconHover: '/src/assets/icons/book-bulk.png',
    subPaths: [],
  },
  {
    navPath: '/user/my_books',
    navTitle: 'My Books',
    navIcon: '/src/assets/icons/book2-linear.png',
    navIconHover: '/src/assets/icons/book2-bulk.png',
    subPaths: [],
  },
  {
    navPath: '/user/profile',
    navTitle: 'Profile',
    navIcon: '/src/assets/icons/profile2-linear.png',
    navIconHover: '/src/assets/icons/profile2-bulk.png',
    subPaths: [],
  },
  {
    navPath: '/user/help',
    navTitle: 'Help',
    navIcon: '/src/assets/icons/help-bulk.png',
    navIconHover: '/src/assets/icons/help-bulk.png',
    subPaths: [],
  },
]


