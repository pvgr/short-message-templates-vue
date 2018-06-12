import Home from '../components/views/Home.vue';
import NewMessage from '../components/views/New.vue';
import TemplatesList from '../components/views/List.vue';

export const routes = [
  {
    component: Home,
    name: 'home',
    path: ''
  },
  {
    component: NewMessage,
    name: 'new',
    path: '/new'
  },
  {
    component: TemplatesList,
    name: 'list',
    path: '/list'
  }
];