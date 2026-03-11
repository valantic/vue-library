import { styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-styleguide',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: '/sg/sg-test-page-readme',
    meta: {
      title: 'Styleguide',
      alternativeTitles: ['asdf'],
    },
    children: [styleguideTestPages.readme],
  },
  {
    path: '/sg-components',
    name: 'sg-components',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Components',
    },
    children: [],
  },
  {
    path: '/sg-elements',
    name: 'sg-elements',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Elements',
    },
    children: [],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRouterConfig.rootPath,
  },
];
