
import { render, screen, fireEvent, describe, it, expect, beforeEach, fn } from '@/utils/test-utils';
import ReviewsHeader from '../ReviewsHeader';

describe('ReviewsHeader', () => {
  const mockOnRefresh = fn();

  beforeEach(() => {
    mockOnRefresh.mockClear();
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
