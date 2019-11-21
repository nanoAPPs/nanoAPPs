import { RouteConfig } from 'vue-router'

export default <Array<RouteConfig>>[
  {
    path: '/odoo-project-test',
    name: 'odoo-project-test',
    // route level code-splitting
    // this generates a separate chunk (odoo-project-test.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "odoo-project-test" */ './views/odooProjectTest.vue'),
    props: true,
    meta: {
      title: 'Proyectos Odoo',
    },
  },
]
