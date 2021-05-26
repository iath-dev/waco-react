import fb from "../config/firebase";

export const LogInWithFacebook = () => {
    const provider = new fb._auth.FacebookAuthProvider();

    return fb.auth.signInWithPopup(provider);
}

export const SignUpWithGoogle = () => {
    const provider = new fb._auth.GoogleAuthProvider();

    return fb.auth.signInWithPopup(provider);
}
