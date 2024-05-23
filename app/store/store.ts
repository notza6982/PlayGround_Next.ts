import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";
import userReducer from "../slices/userSlice";
import { destroyCookie, parseCookies, setCookie } from 'nookies';

// const cookiesMiddleware = (store: any) => (next: any) => (action: any) => {
//   const result = next(action);
//   console.log(action);

//   switch (action.type) {
//     case "user/setUserData":
//       setCookie(null, 'user', JSON.stringify(store.getState()), {
//         maxAge: 1 * 24 * 60 * 60, // day  hour  min  millisecond
//         path: '/',
//       });
//       break;
//     default:
//       break;
//   }


//   // else if (action.type === 'user/logout') {
//   //   destroyCookie(null, 'user');
//   // }
//   return result;
// };

// const cookies = parseCookies();


// const cookiesList = ["user"];
// let cacheState: any = {};

// const convertCookieByString = (value: string) => {
//   return cookies[value] ? JSON.parse(cookies[value]) : {};
// }

// for (const element of cookiesList) {
//   cacheState = {
//     ...cacheState,
//     ...convertCookieByString(element)
//   };
// }

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
    // leadSurveyFilter: leadSurveyFilterReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(cookiesMiddleware),
  // preloadedState: cacheState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
