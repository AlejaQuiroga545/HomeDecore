import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ToastContainer } from 'react-toastify';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Test Product',
  originalName: 'Test Product',
  price: 99.99,
  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  category: 'Furniture',
};

// Wrapper component with all providers
const ProductCardWrapper = ({ product }: { product: typeof mockProduct }) => {
  return (
    <LanguageProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-cream-50 p-8">
            <ProductCard {...product} />
            <ToastContainer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

// ProductCard component unit tests
describe('ProductCard Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('renders product information', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.contains('Test Product').should('be.visible');
    cy.contains('$99.99').should('be.visible');
  });

  it('displays product image', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('img').should('have.attr', 'alt', 'Test Product');
  });

  it('renders favorite button', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('button[aria-label="Toggle favorite"]').should('exist');
  });

  it('renders add to cart button', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('button[aria-label="Add to cart"]').should('exist');
  });

  it('toggles favorite when favorite button is clicked', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('button[aria-label="Toggle favorite"]').click();
    cy.get('button[aria-label="Toggle favorite"]').should('have.class', 'bg-red-500');
  });

  it('adds product to cart when cart button is clicked', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('button[aria-label="Add to cart"]').click();
    cy.window().then((win) => {
      const cart = JSON.parse(win.localStorage.getItem('cart') || '[]');
      expect(cart).to.have.length.greaterThan(0);
      expect(cart[0].id).to.equal('1');
    });
  });

  it('renders link to product detail page', () => {
    cy.mount(<ProductCardWrapper product={mockProduct} />);
    cy.get('a[href="/product/1"]').should('exist');
  });

  it('displays formatted price correctly', () => {
    cy.mount(<ProductCardWrapper product={{ ...mockProduct, price: 199.99 }} />);
    cy.contains('$199.99').should('be.visible');
  });

  it('handles product without originalName', () => {
    cy.mount(<ProductCardWrapper product={{ ...mockProduct, originalName: undefined }} />);
    cy.contains('Test Product').should('be.visible');
  });
});

