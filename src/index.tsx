import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { Actions } from 'actions'
import { Layout } from 'components/Root'
import { createPoetStore } from 'store'

async function init(): Promise<void> {
  const { store, pages } = await createPoetStore()
  const routes = pages
    .map((page: any, index: any) => page.routeHook('' + index))
    .reduce((a: any, b: any) => a.concat(b), [])

  function handlerRoutes(store: any, pathname: string): void {
    const state = store.getState()
    const { user } = state
    const omitRoutes: ReadonlyArray<any> = [
      '/',
      '/login',
      '/forgot-password',
      '/forgot-password/change-password',
      '/verified-account',
      '/privacy',
      '/disclaimer',
    ]
    const notNeedOuath = omitRoutes.includes(pathname)
    if (['/login', '/login/'].includes(pathname) && user.token !== '') browserHistory.push('/dashboard')

    if (!notNeedOuath && user.token === '') browserHistory.push('/login')
  }

  function requireAuth(store: any): (route: any, replace: object) => void {
    return (route: any, replace: object): void => {
      const pathname = route.location.pathname
      store.dispatch(Actions.Router.onEnter(pathname))
      handlerRoutes(store, pathname)
    }
  }

  function onChange(store: any): (route: any, replace: object) => void {
    return (route: any, replace: any): void => {
      const pathname = replace.location.pathname
      store.dispatch(Actions.Router.onChange(pathname))
      handlerRoutes(store, pathname)
    }
  }

  function notFound(route: any, replace: object): void {
    browserHistory.push('/')
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={Layout} onEnter={requireAuth(store)} onChange={onChange(store)}>
          {routes}
        </Route>
        <Route path="*" onEnter={notFound} />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
}

init()
