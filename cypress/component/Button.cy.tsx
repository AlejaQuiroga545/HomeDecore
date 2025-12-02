import Button from '@/components/Button';

// Button component unit tests
describe('Button Component', () => {
  it('renders with default props', () => {
    cy.mount(<Button>Click me</Button>);
    cy.get('button').should('contain', 'Click me');
    cy.get('button').should('have.class', 'bg-primary-900');
  });

  it('renders with primary variant', () => {
    cy.mount(<Button variant="primary">Primary Button</Button>);
    cy.get('button').should('have.class', 'bg-primary-900');
    cy.get('button').should('have.class', 'text-white');
  });

  it('renders with secondary variant', () => {
    cy.mount(<Button variant="secondary">Secondary Button</Button>);
    cy.get('button').should('have.class', 'bg-white');
    cy.get('button').should('have.class', 'text-primary-700');
  });

  it('renders with outline variant', () => {
    cy.mount(<Button variant="outline">Outline Button</Button>);
    cy.get('button').should('have.class', 'border');
    cy.get('button').should('have.class', 'border-primary-300');
  });

  it('renders with small size', () => {
    cy.mount(<Button size="sm">Small Button</Button>);
    cy.get('button').should('have.class', 'text-xs');
    cy.get('button').should('have.class', 'px-3');
  });

  it('renders with medium size', () => {
    cy.mount(<Button size="md">Medium Button</Button>);
    cy.get('button').should('have.class', 'text-sm');
    cy.get('button').should('have.class', 'px-4');
  });

  it('renders with large size', () => {
    cy.mount(<Button size="lg">Large Button</Button>);
    cy.get('button').should('have.class', 'text-sm');
    cy.get('button').should('have.class', 'px-5');
  });

  it('handles click events', () => {
    const onClick = cy.stub();
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    cy.get('button').click();
    cy.then(() => {
      expect(onClick).to.have.been.calledOnce;
    });
  });

  it('applies custom className', () => {
    cy.mount(<Button className="custom-class">Custom Button</Button>);
    cy.get('button').should('have.class', 'custom-class');
  });

  it('disables button when disabled prop is true', () => {
    cy.mount(<Button disabled>Disabled Button</Button>);
    cy.get('button').should('be.disabled');
  });

  it('renders with different button types', () => {
    cy.mount(<Button type="submit">Submit Button</Button>);
    cy.get('button').should('have.attr', 'type', 'submit');
  });
});

