import React, { lazy } from 'react'
import SearchTable from './bizComponent/SearchTable'
import Manager from './bizComponent/Manager'
import LoginPage from './pages/Login'
import { MenuItemType } from './assets/types/baseApi'
import { UserOutlined, TableOutlined } from '@ant-design/icons'

export const RouteMap = {
    login: LoginPage,
    searchTable: SearchTable,
    notfount: lazy(async () => import('./pages/NotFound')),
    noPromission: lazy(async () => import('./pages/NotFound/noPermissions')),
    menu: lazy(async () => import('./pages/Menu')),
    homePage: lazy(async () => import('./pages/Home')),
    manager: Manager,
}

export const IconMap = {
    '/system_manager/': <UserOutlined />,
    '/data_view/': <TableOutlined />
};

export const initRouterList: MenuItemType[] = [{
    item: '/login',
    route: '/login',
    type: 'login',
}]

export const notFoundRoute: MenuItemType = {
    item: 'notfound',
    route: '*',
    type: 'notfount',
}

export const notNoMenuRoute: MenuItemType = {
    item: 'noPromission',
    route: '/403',
    type: 'noPromission',
}

export const routerContainer: MenuItemType = {
    item: '',
    route: '',
    type: 'homePage',
    sub: [notNoMenuRoute],
}

export const needReplacePage = ['/', '/403'];
