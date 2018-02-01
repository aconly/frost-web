import * as classNames from 'classnames'
import * as React from 'react'
const ProgressBar = require('react-progress-bar-plus')
import 'react-progress-bar-plus/lib/progress-bar.css'
import './LoadingPage.scss'

interface LoadingPageProps {
  readonly className?: string
  readonly loading?: boolean
  readonly percentage?: number
  readonly children?: any
}

export const LoadingPage = (props: LoadingPageProps) => (
  <div className={classNames('LoadingPage', props.className)}>
    {props.loading ? (
      <ProgressBar autoIncrement percent={props.percentage} />
    ) : null}
    {props.children}
  </div>
)
