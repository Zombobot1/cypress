import { mount } from '@cypress/react';
import { App } from './App';

it('Button', () => {
  mount(<App />);
  cy.get('h1').should('exist');
});
