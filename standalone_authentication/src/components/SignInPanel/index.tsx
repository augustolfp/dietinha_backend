import { useEffect } from "react";

import { auth } from "../../config/firebase";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default function SignInPanel() {
    useEffect(() => {
        const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(auth);

        ui.start("#firebaseui-auth-container", {
            callbacks: {
                signInSuccessWithAuthResult: function (
                    _authResult,
                    _redirectUrl
                ) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return false;
                },
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById("loader")!.style.display = "none";
                },
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: "popup",
            // signInSuccessUrl: "https://www.anyurl.com", // This is where should redirect if the sign in is successful.
            signInOptions: [
                // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true,
                    disableSignUp: {
                        status: false,
                    },
                },
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        });
    }, []);

    return (
        <div className="bg-white p-4 shadow-md my-8">
            <div className="border-b-2 border-slate-600 mb-4">
                <h1 className="title text-xl font-semibold text-slate-600 mb-2">
                    PAINEL DE SIGN-IN/SIGN-UP
                </h1>
            </div>

            <div id="firebaseui-auth-container"></div>
            <div id="loader" className="text-center text-pink-600 text-xl">
                Loading form
            </div>
        </div>
    );
}
