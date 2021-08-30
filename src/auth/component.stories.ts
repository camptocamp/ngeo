import { html } from 'lit-html';
import AngularServices from 'ngeo/services.js';
import './component.ts';

export default {
  title: 'Auth component',
  component: 'ngeo-auth-component',
};

const Template = (args: any) => {
    AngularServices.user = args.user;
    const optAttr = [];
    optAttr.push(args.isLoading ? ' isLoading' : '');
    optAttr.push(args.allowPasswordChange ? ' allowPasswordChange' : '');
    optAttr.push(args.error ? ' error' : '');
    return `
    <ngeo-auth-component
      ${optAttr.join(' ')}
      infoMessage="${args.infoMessage}">
    </ngeo-auth-component>`;
}

const defaultProperties: any = {
  isLoading: false,
  allowPasswordChange: false,
  error: false,
  infoMessage: '',
  user: null,
};

export const Empty: any = Template.bind({});
Empty.args = {...defaultProperties};

export const WithUser: any = Template.bind({});
WithUser.args = {...defaultProperties};
WithUser.args.user = {
  username: 'George',
  email: null,
  is_intranet: null,
  functionalities: null,
  is_password_changed: null,
  roles: null,
  otp_key: null,
  otp_uri: null
};
