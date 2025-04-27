
import { render, screen } from '@/utils/test-utils';
import ReviewCard from '../ReviewCard';

const mockReview = {
  author_name: "John Doe",
  rating: 5,
  text: "Great service!",
  profile_photo_url: "https://example.com/photo.jpg",
  relative_time_description: "2 months ago",
  review_link: "https://example.com/review"
};

describe('ReviewCard', () => {
  it('renders review information correctly', () => {
    render(<ReviewCard {...mockReview} />);
    
    expect(screen.getByText(mockReview.author_name)).toBeInTheDocument();
    expect(screen.getByText(mockReview.text!)).toBeInTheDocument();
    expect(screen.getByText(mockReview.relative_time_description!)).toBeInTheDocument();
    expect(screen.getByAltText(`${mockReview.author_name} profile`)).toHaveAttribute('src', mockReview.profile_photo_url);
    
    // Check for stars rendering
    const stars = screen.getAllByTestId('star-icon');
    expect(stars).toHaveLength(5);
  });

  it('renders read full review link when review_link is provided', () => {
    render(<ReviewCard {...mockReview} />);
    
    const link = screen.getByText('readFullReview');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', mockReview.review_link);
  });

  it('handles missing optional fields gracefully', () => {
    const minimalReview = {
      author_name: "John Doe",
      rating: 4,
      text: null,
      profile_photo_url: null,
      relative_time_description: null,
      review_link: null
    };

    render(<ReviewCard {...minimalReview} />);
    
    expect(screen.getByText(minimalReview.author_name)).toBeInTheDocument();
    expect(screen.queryByTestId('review-text')).not.toBeInTheDocument();
    expect(screen.queryByText('readFullReview')).not.toBeInTheDocument();
  });
});
