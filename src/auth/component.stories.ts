// The MIT License (MIT)
//
// Copyright (c) 2021 Camptocamp SA
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

import './FormElement.ts';
import user, {UserState, User} from 'ngeo/store/user';

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
  loginInfoMessage: string;
};

const Template = (args: Args) => {
  user.setUser(args.user, UserState.READY);
  return `
    <style>
    .gmf-app-tools-content-heading {
      color: var(--color-light);
      padding-bottom: var(--app-margin);
      margin-bottom: var(--app-margin);
      margin-top: calc(var(--grid-gutter-width) / 2);
      border-bottom: 0.06rem solid;
      border-bottom-color: var(--color-light);
      font-size: 0.8em;
    }
    </style>
    <gmf-auth-form
      loginInfoMessage="${args.loginInfoMessage}">
    </gmf-auth-form>`;
};

const defaultProperties: Args = {
  loginInfoMessage: '',
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
