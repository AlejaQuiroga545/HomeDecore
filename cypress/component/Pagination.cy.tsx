import Pagination from '@/components/Pagination';
import { LanguageProvider } from '@/context/LanguageContext';

// Wrapper component with LanguageProvider
const PaginationWrapper = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <LanguageProvider>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </LanguageProvider>
  );
};

// Pagination component unit tests
describe('Pagination Component', () => {
  it('renders pagination with current page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').should('contain', '1');
  });

  it('displays correct total pages', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={1} totalPages={10} onPageChange={onPageChange} />);
    cy.contains('10').should('exist');
  });

  it('calls onPageChange when page button is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('2').click();
    cy.then(() => {
      expect(onPageChange).to.have.been.calledWith(2);
    });
  });

  it('disables previous button on first page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Anterior').should('be.disabled');
  });

  it('disables next button on last page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Siguiente').should('be.disabled');
  });

  it('enables previous button when not on first page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Anterior').should('not.be.disabled');
  });

  it('enables next button when not on last page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Siguiente').should('not.be.disabled');
  });

  it('highlights current page', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('3').should('have.class', 'bg-primary-900');
  });

  it('navigates to previous page when previous button is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Anterior').click();
    cy.then(() => {
      expect(onPageChange).to.have.been.calledWith(2);
    });
  });

  it('navigates to next page when next button is clicked', () => {
    const onPageChange = cy.stub();
    cy.mount(<PaginationWrapper currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    cy.get('button').contains('Siguiente').click();
    cy.then(() => {
      expect(onPageChange).to.have.been.calledWith(3);
    });
  });
});
