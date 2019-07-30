export const menu = [
  {
    path: 'sport/{{sportId}}/games/',
    icon: 'dev-icons:videogame-asset',
    title: 'Games',
  },
  {
    title: 'Manage',
    items: [
      {
        path: 'rooms/',
        iconSvgPath: 'M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z',
        title: 'Rooms',
      },
      {
        path: 'sport/{{sportId}}/teams/',
        icon: 'dev-icons:bubble-chart',
        title: 'Teams',
      },
      {
        path: 'rewardmodels/',
        icon: 'dev-icons:card-giftcard',
        title: 'Reward Models',
      },
    ],
  },
];
