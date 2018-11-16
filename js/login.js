
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../../pages/add_event.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.

      firebase.auth.EmailAuthProvider.PROVIDER_ID 
    ],
    // Terms of service url.
    tosUrl: '../../pages/faq.html',
    // Privacy policy url.
    privacyPolicyUrl: '../../pages/faq.html'
  };
  
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);