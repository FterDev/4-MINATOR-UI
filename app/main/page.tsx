'use client';

import { Provider } from "react-redux";
import FmCard from "../components/ui/fmcard/fmcard";
import store from "../store";






export default function Page() {
  return (
    <Provider store={store}>
      <FmCard>
          <h1>Main Page!</h1>
      </FmCard>
    </Provider>
  );
}