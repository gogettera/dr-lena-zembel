
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewsHeader from '../ReviewsHeader';
import { LanguageProvider } from '@/contexts/LanguageContext';

describe('ReviewsHeader', () => {
  const mockOnRefresh = jest.fn();

  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <LanguageProvider>
        {component}
      </LanguageProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with correct title', () => {
    renderWithProvider(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={false} />
    );
    
    expect(screen.getByText('patientExperiences')).toBeInTheDocument();
  });

  it('shows spinning icon when refreshing', () => {
    renderWithProvider(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={true} />
    );
    
    expect(screen.getByTestId('refresh-icon')).toHaveClass('animate-spin');
  });

  it('calls onRefresh when refresh button is clicked', () => {
    renderWithProvider(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={false} />
    );
    
    fireEvent.click(screen.getByText('refreshReviews'));
    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh button while refreshing', () => {
    renderWithProvider(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={true} />
    );
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
