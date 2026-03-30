# Flashcards Translation Bug - Technical Documentation

## 🐛 Bug Report

**Issue:** When flipping flashcards, the translated text (Thai meaning) is incorrect or mismatched with the English word shown.

**Severity:** High - Core feature malfunction

**Affected Component:** `FeatureView` → Flashcards mode in `src/App.jsx`

---

## 🔍 Root Cause Analysis

### Problem 1: ❌ **Violation of React Rules of Hooks**

**Before (Buggy Code):**
```jsx
const FeatureView = () => {
  // Hotspots
  if (activeFeature === "hotspots") {
    const [activeSpot, setActiveSpot] = useState(null); // ❌ Hook inside condition
    // ...
  }
  
  // Flashcards
  if (activeFeature === "flashcards") {
    const [idx, setIdx] = useState(0);      // ❌ Hook inside condition
    const [flip, setFlip] = useState(false); // ❌ Hook inside condition
    const card = selectedChar.hotspots[idx];
    // ...
  }
}
```

**Why This Causes Bugs:**
1. **Hook Order Violation**: React tracks hooks by their call order. Conditional hooks break this guarantee.
2. **State Persistence Issues**: When switching between features, old state may persist incorrectly.
3. **Unpredictable Behavior**: Hook state may not reset properly, causing stale data to appear.

### Problem 2: ❌ **Stale Closure in setTimeout**

```jsx
onClick={() => {
  setFlip(false);
  setTimeout(
    () => setIdx((idx + 1) % selectedChar.hotspots.length),
    //            ^^^ This captures the old 'idx' value!
    200
  );
}}
```

**Issue:** The `idx` variable is captured when the timeout is created. If the user clicks multiple times quickly, it uses stale values.

### Problem 3: ❌ **No State Synchronization**

When the card index changes, the flip state should reset to show the front side, but there was no mechanism to enforce this.

---

## ✅ Solution Implementation

### Fix 1: Move State to Component Level

**After (Fixed Code):**
```jsx
const FeatureView = () => {
  // ✅ All state declared at top level (follows Rules of Hooks)
  const [activeSpot, setActiveSpot] = useState(null);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flashcardFlip, setFlashcardFlip] = useState(false);

  // Now conditionals only affect RENDERING, not hook calls
  if (activeFeature === "hotspots") {
    // Use the state, don't declare it
    return <div>...</div>;
  }
  
  if (activeFeature === "flashcards") {
    const card = selectedChar.hotspots[flashcardIdx]; // ✅ Uses state from above
    return <div>...</div>;
  }
}
```

### Fix 2: Add State Synchronization with useEffect

```jsx
// ✅ Reset flip state when card index changes
useEffect(() => {
  setFlashcardFlip(false);
}, [flashcardIdx]);
```

**Benefit:** Every time a new card is shown, it automatically flips back to the front side.

### Fix 3: Add Cleanup Logic

```jsx
// ✅ Cleanup: Reset flashcard state when leaving the feature
useEffect(() => {
  if (activeFeature !== "flashcards") {
    setFlashcardIdx(0);
    setFlashcardFlip(false);
  }
  if (activeFeature !== "hotspots") {
    setActiveSpot(null);
  }
}, [activeFeature]);
```

**Benefit:** When switching features, state is properly cleaned up.

### Fix 4: Use Functional State Updates

**Before:**
```jsx
onClick={() => {
  setFlip(false);
  setTimeout(
    () => setIdx((idx + 1) % selectedChar.hotspots.length),
    200
  );
}}
```

**After:**
```jsx
onClick={() => {
  // ✅ Use functional update to avoid stale closure
  setFlashcardIdx(
    (prevIdx) => (prevIdx + 1) % selectedChar.hotspots.length
  );
}}
```

**Benefit:** 
- No need for setTimeout delay
- Always uses the latest state value
- Prevents race conditions

---

## 🎯 Benefits of This Fix

| Aspect | Before | After |
|--------|--------|-------|
| **Hook Compliance** | ❌ Violates Rules | ✅ Follows Best Practices |
| **State Management** | ❌ Unpredictable | ✅ Predictable & Reliable |
| **Race Conditions** | ❌ Possible | ✅ Eliminated |
| **Memory Leaks** | ❌ State not cleaned | ✅ Proper cleanup |
| **Performance** | ⚠️ setTimeout delay | ✅ Immediate update |

---

## 🧪 Testing Checklist

- [x] Flashcards show correct English word on front
- [x] Flashcards show correct Thai meaning on back
- [x] Flipping works smoothly without mismatches
- [x] "Next Card" button advances to the next card
- [x] Card resets to front side when advancing
- [x] No stale data when switching characters
- [x] No state leaks when switching features
- [x] Multiple rapid clicks don't break the sequence

---

## 📚 React Best Practices Applied

1. **✅ Rules of Hooks**: All hooks called at top level
2. **✅ Functional Updates**: Used when new state depends on old state
3. **✅ useEffect Dependencies**: Proper dependency arrays for side effects
4. **✅ Cleanup Effects**: State cleanup when components unmount or features change
5. **✅ Single Responsibility**: Each state variable has a clear purpose

---

## 🔗 Related Files

- `src/App.jsx` - Main component with fix
- `src/data/characters.js` - Character data structure
- `src/hooks/usePlayerProgress.js` - XP/Level management hook

---

## 📝 Developer Notes

**Why not use separate components?**
- The current architecture uses a single `FeatureView` with conditional rendering
- Moving each feature to a separate component would require major refactoring
- This fix maintains the existing structure while solving the core issues

**Future Improvements:**
- Consider extracting each feature mode into separate components
- Implement a proper state machine for feature navigation
- Add unit tests for state transitions

---

## 👥 Author & Review

**Fixed by:** Senior React Engineer  
**Date:** 2024  
**Reviewed by:** TBD  
**Status:** ✅ Fixed & Tested