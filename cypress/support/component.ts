// Component testing support file
import './commands';
import { mount } from 'cypress/react18';

// Augment Cypress namespace to include mount command
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Import global styles
import '@/app/globals.css';
