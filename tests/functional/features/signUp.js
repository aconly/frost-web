import { SITE } from '../helpers'
import { HomePage as homePage } from '../page-objects/home-page'
import { LoginRegisterPage as loginRegisterPage } from '../page-objects/login-register-page'
import { DashboardPage as dashboardPage } from '../page-objects/dashboard-page'

const {
  signUpEmailInput,
  signUpPasswordInput,
  signUpConfirmPasswordInput,
  signUpDisclaimer,
  signUpButton,
} = loginRegisterPage

const goToLoginPage = async t => {
  const loginButton = await homePage.loginButton
  await t.click(loginButton)
  await loginRegisterPage.pageClass
}

fixture `User sign up tests`
  .page `${SITE}/login`

test('A user can sign up', async t => {
  const expected = true
  const userEmail = 'foo@test.com'
  const password = 'Foo1234foo'

  await goToLoginPage(t)

  await t
    .typeText(signUpEmailInput, userEmail)
    .typeText(signUpPasswordInput, password)
    .typeText(signUpConfirmPasswordInput, password)
    .click(signUpDisclaimer)
    .click(signUpButton)

  const actual = await dashboardPage.pageClass.exists

  await t.expect(actual).eql(expected, 'user sign up failed')
})
