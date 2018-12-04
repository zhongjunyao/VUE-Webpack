import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    props: true,
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      discription: 'Vue todo'
    },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: { 'login': Login },
    name: 'login',
    meta: {
      title: 'this is login page',
      discription: 'Vue Login'
    }
  }
]
