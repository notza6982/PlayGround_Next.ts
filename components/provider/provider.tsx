"use client";

import { store } from "@/app/store/store";
import { Provider } from "react-redux";
import { LoginProvider } from "./login";

export function Providers({ children }: any) {
  return (
    <Provider store={store}>
      {/* <LoginProvider> */}
        {children}
      {/* </LoginProvider> */}
    </Provider>
  );
}
