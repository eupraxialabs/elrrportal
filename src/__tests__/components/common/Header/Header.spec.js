import { render, act, fireEvent } from '@testing-library/react';
import useStore from '@/store/store';
import Header from '@/components/common/Header';
import singletonRouter, { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

jest.mock('@/store/store', () =>
  jest.fn((set) => ({
    userData: { user: { name: 'Test user', type: 'CareerManager' } },
    setUserData: jest.fn(),
    removeUserData: jest.fn(),
  }))
);

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Header Component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/initial');
  });

  it('should render the component', () => {
    const { getByText } = render(<Header />);
    expect(getByText(/Test user/i)).toBeInTheDocument();
  });

  it('should render call the route navigation', () => {
    const { getByText } = render(<Header />);
    act(() => {
      fireEvent.click(getByText('Test user'));
    });

    expect(singletonRouter.asPath).toBe('/');
  });
});
