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

import './ComponentElement.ts';
import user, {UserState, User} from 'ngeo/store/user';

export default {
  title: 'Auth component',
  component: 'gmf-auth-component',
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
    :root {
      --link-color: #60809f;
      --link-hover-color: #435a70;
      --input-border-focus: #6d90b1;
      --input-border-focus-darken: #496a89;
      --border-color: #6d90b1;
      --main-bg-color-09: rgba(226, 227, 223, 0.9);
      --main-bg-color-08: rgba(226, 227, 223, 0.8);
      --table-border-color: #6d90b1;
      --hover-background-color: #d1dce7;
      --input-btn-focus-color: rgba(159, 182, 204, 0.25);
      --input-height-base: 2rem;
      --brand-secondary-dark: #a4b5c5;
      --brand-primary: #9fb6cc;
      --brand-secondary: #d3dbe3;
      --theme-selector-column-width: 8rem;
      --theme-selector-columns: 3;
      --width: 2.5rem;
      --border: solid 0.1rem;

      --left-panel-width: 20rem;
      --app-margin: 0.62rem;
      --icon-font-size: 1.25rem
      --border: 0.06rem solid
      --input-height-base: 1.88rem;
      --padding-base-vertical: 0.32rem;
      --padding-small-vertical: 0.36rem;
      --border-radius-base: 0;
      --right-panel-width: 17.5rem;
      --input-height: calc(1.5em + 0.5rem + 2px);
      --grid-gutter-width: 30px;

      --nav-bg: white;
      --color: #555;
      --color-light: #7b7b7b;
      --color-04: rgba(85, 85, 85, 0.4);
      --nav-header-bg: gray;
      --map-tools-bg-color: white;
      --map-tools-color: black;
      --onhover-color: #d9d9d9;
      --onhover-color-darken: #b3b3b3;
      --main-bg-color: #e2e3df;
      --main-bg-color-lighten: #f4f5f3;
      --main-bg-color-09: rgba(226, 227, 223, 0.9);
      --main-bg-color-08: rgba(226, 227, 223, 0.8);
      --light-box-shadow-color: rgba(0, 0, 0, 0.1);
      --eavy-box-shadow-color: rgba(0, 0, 0, 0.3);
      --gmf-gray-dark: #333333;
      --btn-default-border: #ccc;
      --danger-color: #dc3545;
    }

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
    <gmf-auth-component
      loginInfoMessage="${args.loginInfoMessage}">
    </gmf-auth-component>`;
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
