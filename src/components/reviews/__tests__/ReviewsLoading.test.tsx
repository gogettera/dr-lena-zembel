
import { render, screen, describe, it, expect } from '@/utils/test-utils';
import ReviewsLoading from '../ReviewsLoading';

describe('ReviewsLoading', () => {
  it('renders the correct number of skeleton cards', () => {
    render(<ReviewsLoading />);
    
    const skeletonCards = screen.getAllByRole('article');
    expect(skeletonCards).toHaveLength(3);
  });

  it('renders avatar skeleton in each card', () => {
    render(<ReviewsLoading />);
    
    const avatarSkeletons = screen.getAllByTestId('avatar-skeleton');
    expect(avatarSkeletons).toHaveLength(3);
  });

  it('renders name and date skeletons in each card', () => {
    render(<ReviewsLoading />);
    
    const nameSkeletons = screen.getAllByTestId('name-skeleton');
    const dateSkeletons = screen.getAllByTestId('date-skeleton');
    
    expect(nameSkeletons).toHaveLength(3);
    expect(dateSkeletons).toHaveLength(3);
  });
});
