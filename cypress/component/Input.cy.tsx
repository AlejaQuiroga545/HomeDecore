import Input from '@/components/Input';

// Input component unit tests
describe('Input Component', () => {
  it('renders with label', () => {
    cy.mount(<Input label="Email" />);
    cy.get('label').should('contain', 'Email');
    cy.get('input').should('exist');
  });

  it('renders input with correct type', () => {
    cy.mount(<Input label="Email" type="email" />);
    cy.get('input').should('have.attr', 'type', 'email');
  });

  it('renders input with placeholder', () => {
    cy.mount(<Input label="Name" placeholder="Enter your name" />);
    cy.get('input').should('have.attr', 'placeholder', 'Enter your name');
  });

  it('handles value changes', () => {
    cy.mount(<Input label="Email" />);
    cy.get('input').type('test@example.com');
    cy.get('input').should('have.value', 'test@example.com');
  });

  it('applies custom className', () => {
    cy.mount(<Input label="Email" className="custom-input" />);
    cy.get('input').should('have.class', 'custom-input');
  });

  it('disables input when disabled prop is true', () => {
    cy.mount(<Input label="Email" disabled />);
    cy.get('input').should('be.disabled');
  });

  it('renders with required attribute', () => {
    cy.mount(<Input label="Email" required />);
    cy.get('input').should('have.attr', 'required');
  });

  it('renders with name attribute', () => {
    cy.mount(<Input label="Email" name="email" />);
    cy.get('input').should('have.attr', 'name', 'email');
  });

  it('handles onChange events', () => {
    const onChange = cy.stub();
    cy.mount(<Input label="Email" onChange={onChange} />);
    cy.get('input').type('test');
    cy.then(() => {
      expect(onChange).to.have.been.called;
    });
  });

  it('renders with different input types', () => {
    cy.mount(<Input label="Password" type="password" />);
    cy.get('input').should('have.attr', 'type', 'password');
  });
});

