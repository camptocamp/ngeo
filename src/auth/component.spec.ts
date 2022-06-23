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

import gmfAuthenticationService from 'ngeo/auth/service';

import configuration, {Configuration} from 'gmfapi/store/config';
import user, {UserState, loginMessageRequired} from 'gmfapi/store/user';

describe('Auth component', () => {
  context('panel', () => {
    it('displays an empty auth form', () => {
      cy.visit('iframe.html?id=auth-form--empty');
      cy.get('input').should('have.length', 3);
      // the slots are at the end
      cy.get('input')
        .eq(1)
        .should('have.attr', 'type', 'text')
        .should('have.attr', 'placeholder', 'Username');
      cy.get('input')
        .eq(2)
        .should('have.attr', 'type', 'password')
        .should('have.attr', 'placeholder', 'Password');
      cy.get('input').first().should('have.attr', 'type', 'submit').should('have.value', 'Connect');
      cy.get('.alert').should('have.length', 0);
    });

    it('displays an info message', () => {
      cy.visit('iframe.html?id=auth-form--empty&args=loginInfoMessage:true');
      cy.get('.alert span').should('have.length', 1).first().should('have.text', loginMessageRequired);
    });

    it('displays a form with a user and a message', () => {
      cy.visit('iframe.html?id=auth-form--with-user&args=loginInfoMessage:false');
      // two inputs are invisible but present in the slot
      cy.get('input').should('have.length', 4).first().should('have.value', 'Logout');
      cy.get('.form-group span').first().should('have.text', 'Logged in as');
      cy.get('.form-group strong').first().should('have.text', 'George');
    });
  });
  context('service', () => {
    beforeEach(() => {
      configuration.setConfig({
        authenticationBaseUrl: 'https://geomapfish-demo-2-7.camptocamp.com/',
      } as Configuration);
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it.skip('tries to login with wrong credentials', async () => {
      gmfAuthenticationService.load_();
      expect(user.getState()).to.equal(UserState.NOT_INITIALIZED);
      gmfAuthenticationService.login('demo', 'wrong').then(
        () => {},
        (err) => {
          expect(err).to.equal('Login fail.');
        }
      );

      await new Promise((resolve) => {
        setTimeout(() => {
          expect(user.getState()).to.equal(UserState.READY);
          return resolve(null);
        }, 3000);
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it.skip('logins successfully', async () => {
      gmfAuthenticationService.load_();
      expect(user.getState()).to.equal(UserState.READY);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      gmfAuthenticationService.login('demo', 'democ2c');
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(user.getState()).to.equal(UserState.LOGGED_IN);
          return resolve(null);
        }, 3000);
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it.skip('logs out', async () => {
      expect(user.getState()).to.equal(UserState.LOGGED_IN);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      gmfAuthenticationService.logout();
      await new Promise((resolve) => {
        setTimeout(() => {
          expect(user.getState()).to.equal(UserState.READY);
          return resolve(null);
        }, 3000);
      });
    });
  });
});
