import * as React from 'react'
import { Route } from 'react-router'

import { PageLoader, ReducerDescription } from 'components/PageLoader'
import { DisclaimerLayout } from './Disclaimer.layout'

export class Disclaimer extends PageLoader<object, object> {
  readonly component = DisclaimerLayout

  initialState(): object {
    return {}
  }

  routeHook(key: string): ReadonlyArray<JSX.Element> {
    return [<Route path="/disclaimer" key={key} component={this.container()} />]
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
