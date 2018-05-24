import { Selector } from 'testcafe'

export const LoginRegisterPage = {
  pageClass: Selector('.RegisterLogin'),

  signUpEmailInput: Selector('.RegisterLogin_signUp input[name="email"]'),
  signUpPasswordInput: Selector('.RegisterLogin_signUp input[name="password"]'),
  signUpConfirmPasswordInput: Selector('.RegisterLogin_signUp input[name="confirmPassword"]'),
  signUpDisclaimer: Selector('.RegisterLogin_signUp input[name="testnet"]'),
  signUpButton: Selector('.RegisterLogin_signUp .submit-button button'),
}

