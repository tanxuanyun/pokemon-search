'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apollo-client'; // Adjust the path based on your project structure

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <ApolloProvider client={client}>
        <main className="app">
          {children}
        </main>
      </ApolloProvider>
    </body>
  </html>
);

export default RootLayout;
