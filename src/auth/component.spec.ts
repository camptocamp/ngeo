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

describe('Auth component', () => {
  it('displays an empty auth form', () => {
    cy.visit('iframe.html?id=auth-component--empty');
    cy.get('input').should('have.length', 3);
    cy.get('input')
      .first()
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'placeholder', 'Username');
    cy.get('input')
      .eq(1)
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'placeholder', 'Password');
    cy.get('input').last().should('have.attr', 'type', 'submit').should('have.value', 'Connect');
    cy.get('.alert').should('have.length', 0);
  });

  it('displays an info message', () => {
    cy.visit('iframe.html?id=auth-component--empty&args=loginInfoMessage:a_msg');
    cy.get('.alert span').should('have.length', 1).first().should('have.text', 'a_msg');
  });

  it('displays a form with a user and a message', () => {
    cy.visit('iframe.html?id=auth-component--with-user&args=loginInfoMessage:logged');
    cy.get('.alert span').should('have.length', 1).first().should('have.text', 'logged');
    cy.get('input').should('have.length', 2).first().should('have.value', 'Logout');
    cy.get('.form-group span').first().should('have.text', 'Logged in as');
    cy.get('.form-group strong').first().should('have.text', 'George');
  });
});
