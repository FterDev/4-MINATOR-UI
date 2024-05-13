import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/app/firebase";
import { SignJWT, jwtVerify } from 'jose'



export const authOptions = {
  
  pages: {
    signIn: '/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@doe.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, credentials?.email || '', credentials?.password || '')
          .then(userCredential => {

            if (userCredential) {
              
              return userCredential.user;
                        }

            return null;
          })
          .catch(error => (console.log(error)))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
      }
    })
  ],
  callbacks: {
    async jwt({token, user, account, profile, isNewUser} : {token: any, account:any,user: any, profile: any, isNewUser: any}) {
      if (user) {
        token.user = user;
        token.accessToken = account;
        token.profile = profile;
        token.isNewUser = isNewUser;
        
      }
      return token;
    },
    async session({session, token} : {session: any, token: any}) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.token = token;
      return session;
    }
  },
  
  
  
}
export default NextAuth(authOptions)