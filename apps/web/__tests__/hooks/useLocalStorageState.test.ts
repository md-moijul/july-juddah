
import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

describe('useLocalStorageState', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return the initial value if local storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return the stored value from local storage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('should update the value in local storage', () => {
    const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });
});
