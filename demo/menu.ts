export const menu = [
  {
    path: 'sport/{{sportId}}/games/',
    icon: 'dev-icons:videogame-asset',
    title: 'Games'
  },
  {
    title: 'Manage',
    items: [
      {
        path: 'rooms/',
        iconSvgPath: 'M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z',
        title: 'Rooms'
      },
      {
        path: 'sport/{{sportId}}/teams/',
        icon: 'dev-icons:bubble-chart',
        title: 'Teams'
      },
      {
        path: 'rewardmodels/',
        icon: 'dev-icons:card-giftcard',
        title: 'Reward Models'
      }
    ]
  },
  {
    title: 'Users',
    items: [
      {
        path: 'user/',
        icon: 'dev-icons:people',
        title: 'Users'
      },
      {
        path: 'redeem/',
        icon: 'dev-icons:attach-money',
        title: 'Redeem Requests'
      },
      {
        path: 'reporteduser/',
        icon: 'dev-icons:feedback',
        title: 'Reported Users'
      }
    ]
  },
  {
    title: 'Global',
    items: [
      {
        path: 'content/',
        icon: 'dev-icons:subject',
        title: 'Content'
      },
      {
        path: 'banners/',
        icon: 'dev-icons:panorama',
        title: 'Banners'
      },
      {
        path: 'notifications/',
        icon: 'dev-icons:notifications',
        title: 'Notifications',
        badgeCount: 14
      },
      {
        path: 'admin/',
        icon: 'dev-icons:fingerprint',
        title: 'Admin Users'
      }
    ]
  }
]