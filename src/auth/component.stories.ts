// The MIT License (MIT)
//
// Copyright (c) 2021-2022 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import './FormElement';
import './PanelElement';
import user, {UserState, User, loginMessageRequired} from 'gmfapi/store/user';

export default {
  title: 'Auth Form',
  component: 'gmf-auth-form',
};

type Args = {
  /**
   * The user.
   */
  user: User;
  /**
   * The info message.
   */
  loginInfoMessage: boolean;
};

const Template = (args: Args) => {
  user.setUser(args.user, UserState.READY);
  user.setLoginMessage(args.loginInfoMessage ? loginMessageRequired : '');
  return `<gmf-auth-form>
    <input
      slot="gmf-auth-login"
      type="text"
      class="form-control"
      name="login"
      autocomplete="username"
      placeholder="Username" />
    <input
      slot="gmf-auth-password"
      type="password"
      class="form-control"
      name="password"
      autocomplete="current-password"
      aria-describedby="password-constraints"
      placeholder="Password"
    /></gmf-auth-form>`;
};

const defaultProperties: Args = {
  loginInfoMessage: false,
  user: null,
};

export const Empty: any = Template.bind({});
Empty.args = {...defaultProperties};
Empty.args.user = user.getEmptyUserProperties();

export const WithUser: any = Template.bind({});
WithUser.args = {...defaultProperties};
const login = user.getEmptyUserProperties();
login.username = 'George';
WithUser.args.user = login;

/**
 * @returns The HTML of the story
 */
export function Panel(): string {
  return `
    <gmf-auth-panel>
      <input
        slot="gmf-auth-login"
        type="text"
        class="form-control"
        name="login"
        autocomplete="username"
        placeholder="Username" />
      <input
        slot="gmf-auth-password"
        type="password"
        class="form-control"
        name="password"
        autocomplete="current-password"
        aria-describedby="password-constraints"
        placeholder="Password"
      /></gmf-auth-panel>`;
}
