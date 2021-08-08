import { formatDate } from 'utils/helpers';

test('should format date correctly', () => {
  // For some reason came like (yyyy-mm-dd)
  // instead of (dd/mm/yyyy) as came in browser

  expect(formatDate('2021-04-20T00:28:09.426Z')).toBe('2021-04-19');
});
