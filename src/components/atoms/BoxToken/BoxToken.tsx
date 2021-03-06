import * as classNames from 'classnames'
import { Hash } from 'components/atoms/Hash/Hash'
import { parseJwt } from 'helpers'
import { ClassNameProps } from 'interfaces/Props'
import { ApiToken } from 'interfaces/Props'
import * as moment from 'moment'
import * as React from 'react'
import './BoxToken.scss'

const getParsedToken = (token: string): ApiToken => ({
  token,
  ...parseJwt(token),
})

const byIssueDate = (a: ApiToken, b: ApiToken) => (a.iat.getTime() > b.iat.getTime() ? -1 : 1)

const isDateAfterNow = (date: Date): boolean => moment().isAfter(date)

const deleteToken = (
  event: React.MouseEvent<HTMLButtonElement>,
  onDeleteToken: (apiToken: string) => void,
  apiToken: string
) => {
  event.preventDefault()
  onDeleteToken(apiToken)
}

const renderToken = (token: ApiToken, key: number, total: number, onDeleteToken?: (apiToken: string) => void) => (
  <tr key={key} className={'BoxToken__item'}>
    <td>
      <span>{total - key}</span>
    </td>
    <td>
      <span className={'BoxToken__item__token'}>
        <Hash className="copyable-hash" textClickable>
          {token.token}
        </Hash>
      </span>
    </td>
    <td>
      <span className={'BoxToken__item__date'}>{moment(token.iat).format('MM/DD/YYYY hh:mm a')}</span>
    </td>
    <td>
      <span
        title={token.exp ? (isDateAfterNow(token.exp) ? '' : moment(token.exp).format('MM/DD/YYYY hh:mm a')) : 'Never'}
        className={classNames(
          'BoxToken__item__date',
          token.exp ? (isDateAfterNow(token.exp) ? 'BoxToken__item__date__expired' : 'BoxToken__item__date__help') : ''
        )}
      >
        {token.exp
          ? isDateAfterNow(token.exp)
            ? moment(token.exp).format('MM/DD/YYYY hh:mm a')
            : moment(token.exp).fromNow()
          : 'Never'}
      </span>
    </td>
    <td>
      <div className={'BoxToken__item__actions'}>
        <button onClick={e => deleteToken(e, onDeleteToken, token.token)}>Remove</button>
      </div>
    </td>
  </tr>
)
interface BoxTokenProps extends ClassNameProps {
  readonly apiTokens: ReadonlyArray<string>
  readonly onDeleteToken?: (apiToken: string) => void
}

export const BoxToken: React.SFC<BoxTokenProps> = ({ apiTokens = [], className, onDeleteToken }): JSX.Element => (
  <div className={classNames('BoxToken', className)}>
    <table className={'BoxToken__table'}>
      <thead className={'BoxToken__header'}>
        <tr>
          <td>
            <p>#</p>
          </td>
          <td>
            <p>Token</p>
          </td>
          <td>
            <p>Creation</p>
          </td>
          <td>
            <p>Expiry</p>
          </td>
        </tr>
      </thead>
      <tbody>
        {apiTokens
          .map(getParsedToken)
          .sort(byIssueDate)
          .map((token, key) => renderToken(token, key, apiTokens.length, onDeleteToken))}
      </tbody>
    </table>
  </div>
)
