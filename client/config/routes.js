// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    props: true,
    // component: Todo,
    component: () => import('../views/todo/todo.vue'), // 进入该页面再加载改页面的js和数据
    // components: {
    //   default: Todo,
    //   login: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      discription: 'Vue todo'
    },
    beforeEnter(to, from, next) {
      console.log('app route beforeEnter invoked')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    // component: Login,
    component: () => import('../views/login/login.vue'),
    // components: {
    //   default: Login,
    //   login: Todo
    // },
    name: 'login',
    meta: {
      title: 'this is login page',
      discription: 'Vue Login'
    }
  }
]
