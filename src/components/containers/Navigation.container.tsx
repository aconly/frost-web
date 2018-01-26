import { NavigationList } from '../atoms/NavigationList/NavigationList'

import * as React from 'react'
import { connect } from 'react-redux'

const links = [
  {
    label: 'Dashboard',
    link: '/dashboard'
  },
  {
    label: 'Generate API Key',
    link: '/token'
  },
  {
    label: 'Documentation',
    link: 'https://frost.readme.io/docs'
  }
]

export class Navigation extends React.Component<any, undefined> {
  constructor() {
    super()
  }

  render() {
    const { router } = this.props

    return (
      <NavigationList
        className={'Dashboard__nav__navigation-list'}
        links={links}
        pathActive={router.currentPath}
      />
    )
  }
}

const mapStateToProps = (state: any) => ({
  router: state.router
})

export const NavigationContainer = connect(mapStateToProps)(Navigation)