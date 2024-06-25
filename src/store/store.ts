import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";
import { saveState } from "./storage";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice,
	},
});

store.subscribe(() =>
	// При изменении состояния загонем новое значение в JWT_PERSISTENT_STATE
	{
		saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
		saveState(store.getState().cart, CART_PERSISTENT_STATE);
	}
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
