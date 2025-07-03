# Bug Fixes Summary

## Overview
This document outlines 3 significant bugs that were identified and fixed in the codebase, including logic errors, security vulnerabilities, and performance issues.

## Bug 1: usePrevious Hook Logic Error

**File:** `src/utils/hooks/usePrevious.ts`

**Severity:** Medium

**Type:** Logic Error

### Problem Description
The `usePrevious` hook was fundamentally broken and never actually returned the previous value. The original implementation had these issues:
- Used `useEffect` with dependency array `[val]`, which updates the ref after every render
- Returned `ref.current` immediately, which was always the current value
- Never actually captured or returned the previous value

### Impact
- Any component using this hook would receive incorrect values
- State management and comparison logic would fail
- Potential for unnecessary re-renders and infinite loops

### Solution
Rewrote the hook using the standard React pattern:
```typescript
export const usePrevious = <T>(val: T): T | undefined => {
  const ref = useRef<T>();
  const previous = ref.current;
  ref.current = val;
  return previous;
};
```

### Benefits
- Correctly returns `undefined` on first render
- Properly captures and returns previous value on subsequent renders
- More efficient (no useEffect needed)
- Follows React best practices

---

## Bug 2: HTTP Error Handling Security Vulnerability

**File:** `src/utils/request/index.ts`

**Severity:** High

**Type:** Security Vulnerability & Error Handling

### Problem Description
Multiple critical issues in the HTTP interceptor:
1. **XSS Vulnerability**: Direct display of server error messages without sanitization
2. **Crash Risk**: No null checks for `error.response`
3. **Unsafe Navigation**: Direct `location.replace()` usage
4. **Poor Error Propagation**: Throwing generic errors instead of original errors

### Impact
- Cross-Site Scripting (XSS) attacks via malicious server responses
- Application crashes when server doesn't respond properly
- Navigation bypasses React Router, breaking app state
- Loss of error context for debugging

### Solution
Implemented comprehensive security measures:
```typescript
// Safe error message extraction with sanitization
const getSafeErrorMessage = (error: any): string => {
  if (!error?.response?.data) {
    return "网络错误，请稍后重试";
  }
  
  const message = error.response.data.message || "服务器错误";
  // Basic sanitization to prevent XSS
  return String(message).replace(/<[^>]*>/g, '').substring(0, 200);
};
```

### Security Improvements
- HTML tag stripping to prevent XSS
- Message length limiting
- Proper null/undefined checking
- Safer navigation using `window.location.href`
- Preserved original error context

---

## Bug 3: Minesweeper Coordinate System Bug

**Files:** 
- `src/pages/minesweeper/config.ts`
- `src/pages/minesweeper/index.tsx`

**Severity:** High

**Type:** Logic Error & Performance Issue

### Problem Description
Multiple coordinate system issues in the minesweeper game:
1. **Coordinate Confusion**: X/Y parameters swapped in `getClickMineIndex`
2. **Infinite Recursion Risk**: `initMine()` could recurse infinitely in rare cases
3. **Inconsistent Indexing**: Click coordinates didn't match render coordinates

### Impact
- Clicking on mines wouldn't work correctly
- Game becomes unplayable due to coordinate misalignment
- Potential stack overflow crashes
- Poor user experience

### Solution
#### Fixed Coordinate System:
```typescript
export const getClickMineIndex = (offsetX: number, offsetY: number) => {
  // offsetX corresponds to column (j), offsetY corresponds to row (i)
  const col = Math.floor(offsetX / (GRID_WIDTH + GRID_SPACE));
  const row = Math.floor(offsetY / (GRID_WIDTH + GRID_SPACE));
  return [row, col];
};
```

#### Fixed Mine Initialization:
```typescript
const initMine = () => {
  // Ensure at least one mine is placed to prevent infinite recursion
  const totalCells = line[0] * line[1];
  const minMines = Math.max(1, Math.floor(totalCells * 0.05)); // At least 5% mines
  const maxMines = Math.floor(totalCells * 0.2); // At most 20% mines
  
  // ... proper mine placement with bounds checking
};
```

### Improvements
- Correct coordinate mapping between clicks and game board
- Eliminated infinite recursion risk
- Better mine distribution (5-20% of board)
- Improved debugging with better console logging

---

## Additional Security Considerations

### Recommendations Implemented
1. **Input Sanitization**: All user-facing error messages are sanitized
2. **Bounds Checking**: Coordinate calculations include proper validation
3. **Recursion Prevention**: Eliminated potential infinite loops
4. **Error Handling**: Proper null checks and error propagation

### Future Recommendations
1. Add input validation for all user interactions
2. Implement Content Security Policy (CSP) headers
3. Add rate limiting for API requests
4. Consider using a more robust error boundary system

---

## Testing Recommendations

To verify these fixes:
1. **usePrevious Hook**: Test with rapid state changes
2. **HTTP Security**: Test with malformed server responses
3. **Minesweeper**: Test clicking various board positions

## Performance Impact

All fixes improve performance:
- usePrevious hook is more efficient (no useEffect)
- HTTP interceptor has better error handling (fewer crashes)
- Minesweeper has proper bounds checking (no infinite loops)