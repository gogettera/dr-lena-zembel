
import { render, screen, fireEvent } from '@/utils/test-utils';
import ReviewsHeader from '../ReviewsHeader';

describe('ReviewsHeader', () => {
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with correct title', () => {
    render(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={false} />
    );
    
    expect(screen.getByText('patientExperiences')).toBeInTheDocument();
  });

  it('shows spinning icon when refreshing', () => {
    render(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={true} />
    );
    
    expect(screen.getByTestId('refresh-icon')).toHaveClass('animate-spin');
  });

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={false} />
    );
    
    fireEvent.click(screen.getByText('refreshReviews'));
    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables refresh button while refreshing', () => {
    render(
      <ReviewsHeader onRefresh={mockOnRefresh} isRefreshing={true} />
    );
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
