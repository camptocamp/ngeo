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

import './component.ts';
import user, {UserState} from 'ngeo/store/user';

export default {
  title: 'Auth component',
  component: 'ngeo-auth-component',
};

const Template = (args: any) => {
  user.setUser(args.user, UserState.READY);
  const optAttr = [];
  optAttr.push(args.isLoading ? ' isLoading' : '');
  optAttr.push(args.allowPasswordChange ? ' allowPasswordChange' : '');
  optAttr.push(args.error ? ' error' : '');
  return `
    <ngeo-auth-component
      ${optAttr.join(' ')}
      loginInfoMessage="${args.loginInfoMessage}">
    </ngeo-auth-component>`;
};

const defaultProperties: any = {
  isLoading: false,
  allowPasswordChange: false,
  error: false,
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
