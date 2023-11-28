import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home.vue'),
            props: {
                title: 'Home'
            }
        },
        {
            path: '/add-client',
            name: 'add-client',
            component: () => import('../views/client/NewClientView.vue'),
            props: {
                title: 'Adicionar Clientes'
            }
        },
        {
            path: '/edit-client/:id',
            name: 'edit-client',
            component: () => import('../views/client/EditClientView.vue'),
            props: {
                title: 'Editar Clientes'
            }
        },
        {
            path: '/list-client',
            name: 'list-client',
            component: () => import('../views/client/ClientView.vue'),
            props: {
                title: 'Listar Clientes'
            }
        },
    ]
})

export default router