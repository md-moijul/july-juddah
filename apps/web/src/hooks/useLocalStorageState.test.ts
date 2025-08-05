
import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';

describe('useLocalStorageState', () => {
    beforeEach(() => {
        // Arrange: Clear local storage before each test
        window.localStorage.clear();
    });

    it('should return the initial value if local storage is empty', () => {
        // Arrange: Render the hook with an initial value
        const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));

        // Assert: The returned value should be the initial value
        expect(result.current[0]).toBe('initial');
    });

    it('should return the stored value from local storage', () => {
        // Arrange: Set a value in local storage before rendering the hook
        window.localStorage.setItem('testKey', JSON.stringify('stored'));

        // Act: Render the hook
        const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));

        // Assert: The returned value should be the stored value
        expect(result.current[0]).toBe('stored');
    });

    it('should update the value in local storage', () => {
        // Arrange: Render the hook with an initial value
        const { result } = renderHook(() => useLocalStorageState('testKey', 'initial'));

        // Act: Update the value using the setter function
        act(() => {
            result.current[1]('updated');
        });

        // Assert: The returned value should be updated, and local storage should reflect the change
        expect(result.current[0]).toBe('updated');
        expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
    });
});
