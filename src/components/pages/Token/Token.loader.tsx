import * as React from 'react'
import { Route } from 'react-router'

import { PageLoader, ReducerDescription } from 'components/PageLoader'
import { TokenLayout } from './Token.layout'

export class Token extends PageLoader<object, object> {
  readonly component = TokenLayout

  initialState(): object {
    return {}
  }

  routeHook(key: string): ReadonlyArray<JSX.Element> {
    return [<Route path="/token" key={key} component={this.container()} />]
  }

  reducerHook<State>(): ReducerDescription<State> {
    return null
  }

  sagaHook(): any {
    return null
  }

  select(state: any, ownProps: any): object {
    return {}
  }

  mapDispatchToProps(): any {
    return {}
  }
}
