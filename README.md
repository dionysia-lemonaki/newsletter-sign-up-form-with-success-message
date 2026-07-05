# Frontend Mentor – Newsletter Signup Form with Success Message

A newsletter signup form built with React, TypeScript, and Tailwind CSS — focusing on custom form validation, controlled inputs, and accessible error messaging.

## 🔗 Links

- Solution: [Frontend Mentor submission](https://www.frontendmentor.io/solutions/newsletter-sign-up-form-with-success-message-_dQgahGIeN)
- Live site: [View live](https://newsletter-sign-up-form-with-success-dionysialemonaki.vercel.app/)

## ✅ Acceptance Criteria

Users should be able to:

- Add their email and submit the form
- See a success message after successfully submitting the form
- See form validation messages if:
  - The field is empty
  - The email address is not formatted correctly
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## 📸 Screenshots

Mobile:

![](/src/assets/images/screenshots/mobile.jpeg)

Desktop:

![](/src/assets/images/screenshots/desktop.jpeg)

Error states:

![](/src/assets/images/screenshots/error-empty.png)

![](/src/assets/images/screenshots/error-invalid.png)

## 🏗️ Built With

- React 19
- TypeScript
- Tailwind CSS v4
- Vite
- Custom client-side form validation

## 🎨 What I Focused On

### Overriding Native Validation with `noValidate`

`<input type="email">` gives the browser its own built-in validation, which intercepts the submit event before React ever sees it - the browser shows its own tooltip instead of my error UI. Adding `noValidate` to the `<form>` disables that, so every submit reaches my `handleSubmit`, and my own `validateEmail` function is the single source of truth for error messages, matching the exact copy the design calls for.

```tsx
<form onSubmit={onSubmit} noValidate>
```

### State Ownership: Parent Owns Data, Children Report Back

`App` owns all the state - `email`, `error`, `isSubmitted` - and the two components (`NewsletterForm`, `SuccessMessage`) are given data and functions as props, without holding any state of their own. They call back up to `App` (`onEmailChange`, `onSubmit`, `onReset`) rather than managing anything internally. This keeps each component predictable and easy to reason about in isolation, and means the same `Button` component can be reused for both forms without knowing anything about what it's triggering.

### One Function, Two Jobs: Clearing Errors on Input

Initially, the email input was wired directly to `setEmail`, meaning a validation error would stay on screen - still styled red - even after the user started fixing their typo, right up until they resubmitted. The fix was a small wrapper function in `App` that updates the email _and_ clears the error in the same call:

```tsx
const handleEmailChange = (value: string) => {
  setEmail(value);
  if (error) {
    setError("");
  }
};
```

This gets passed down as the `onEmailChange` prop - deliberately not named `setEmail`, since it does more than just set the email now, and a prop name should describe what it actually does.

### Accessible Error Messaging

The error state isn't just a red border - it's wired so assistive technology actually announces it:

```tsx
<input
  aria-invalid={!!error}
  aria-describedby={error ? errorId : undefined}
  ...
/>
{error && (
  <p id={errorId} aria-live="polite">
    {error}
  </p>
)}
```

- `aria-invalid` tells screen readers the field is currently invalid.
- `aria-describedby` links the input to its error message by id, so the two are read together.
- `aria-live="polite"` on the error `<p>` means the message is announced automatically the moment it appears, without needing focus to move there.

### Conditional Styling for Input States

The input has three genuinely distinct visual states - default, focused, and error - each driven by a different condition:

```tsx
className={`py-4 px-6 ${
  error
    ? "border-(--red) text-(--red) bg-(--red)/10 focus-visible:outline-(--red)"
    : "border-(--grey) text-(--blue-800) bg-white placeholder:text-(--blue-800) placeholder:opacity-50 focus:border-(--blue-800) focus-visible:outline-(--blue-800)"
} border rounded-lg focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-dotted`}
```

Placeholder color and typed-text color are handled separately (`placeholder:text-...` vs plain `text-...`), since they're shown at different times and shouldn't be conflated with a `focus:` state.

### Consistent, Deliberate Focus Styling

Both the submit button and the input use `focus-visible` (not `focus`) for their outline, so the custom dotted outline only appears for keyboard navigation, not mouse clicks:

```tsx
className =
  "... focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-dotted focus-visible:outline-(--red)";
```

### Component Architecture

```
App (owns email, error, isSubmitted state)
├── NewsletterForm (shown while !isSubmitted)
│     └── Button (type="submit")
└── SuccessMessage (shown after isSubmitted)
      └── Button (type="button")
```

`Button` is shared between both views, taking `type`, `children`, and an optional `onClick` - kept generic rather than named after what either button _does_ (e.g. not `onSubmitClick` or `onDismissClick`), so it stays reusable.

## ♿ Accessibility

- `useId()` generates unique ids for the label/input/error relationship
- `aria-invalid`, `aria-describedby`, and `aria-live` correctly connect the input to its error state
- Visible, high-contrast `focus-visible` outlines (not just default browser focus) on all interactive elements
- Decorative images (`icon-list.svg`, success icon) use `alt=""` so screen readers skip them
- Form submission is fully keyboard-operable - submit button is `type="submit"` inside the `<form>`, so Enter in the input triggers it with no extra wiring
