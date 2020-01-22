/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = [{
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '菜单名称',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table1',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'DynamicTable1',
      meta: { title: 'Dynamic Table1' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}]
export default tableRouter
