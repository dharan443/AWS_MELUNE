// In your page file (e.g., `MyPage.js` or wherever the button was being used)

// Do not render the SignInOAuthButtons component at all
const MyPage = () => {
  return (
    <div>
      {/* Google Sign-In button is removed */}
      <h1>Welcome to the Page</h1>
      {/* Other content */}
    </div>
  );
};
