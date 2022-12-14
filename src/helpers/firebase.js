/* eslint-env node */
// Module imports
import { initializeApp } from 'firebase/app'

initializeApp({
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
})

export {
	EmailAuthProvider,
	getAuth,
	onAuthStateChanged,
	onIdTokenChanged,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from 'firebase/auth'
