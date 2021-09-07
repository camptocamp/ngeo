import {html} from 'lit-html';
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
