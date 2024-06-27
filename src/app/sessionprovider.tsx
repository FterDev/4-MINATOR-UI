'use client';
import { SessionProvider as Sprovider } from 'next-auth/react';
import { Provider } from 'react-redux';
import rootRedux from './store';

type Props = {
  children: React.ReactNode;
}

export default function SessionProvider({children}: Props) {

  const store = rootRedux;

  return (
    <Sprovider>
      <Provider store={store}>
        {children}
      </Provider>
    </Sprovider>
  )
}