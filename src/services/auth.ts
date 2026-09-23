import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
    type User
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/config';

const authErrorMessages: Record<string, string> = {
  'auth/invalid-credential': 'Incorrect email or password',
  'auth/invalid-login-credentials': 'Incorrect email or password',
  'auth/wrong-password': 'Incorrect email or password',
  'auth/user-not-found': 'No account found with this email',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/invalid-email': 'Please enter a valid email address',
  'auth/weak-password': 'Password must be at least 6 characters',
  'auth/user-disabled': 'This account has been disabled',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
  'auth/network-request-failed': 'Network error. Check your internet connection',
};

const getAuthErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? 'Something went wrong. Please try again';
  }
  return 'Something went wrong. Please try again';
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true as const, user: userCredential.user };
  } catch (error) {
    return { success: false as const, error: getAuthErrorMessage(error) };
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if(auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: name });
        }

        return { success: true as const, user: userCredential.user }
    } catch (error) {
        return { success: false as const, error: getAuthErrorMessage(error) }
    }
}

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: getAuthErrorMessage(error) };
  }
};

export const subscribeToAuthChanges = (callback: (u: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};