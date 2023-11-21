import { serverAuth$ } from '@builder.io/qwik-auth';
import type { Provider } from '@auth/core/providers';
import Keycloak from '@auth/core/providers/keycloak';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    secret: 'AuthSecret',
    trustHost: true,
    callbacks: {
      async session({ session, token }) {
        session.user.guid = token.sub;
        return session;
      },
    },
    providers: [
      Keycloak({
        clientId: 'Site',
        clientSecret: 'client-secret' as string,
        issuer: 'issuer' as string,
      }),
    ] as Provider[],
  }));
