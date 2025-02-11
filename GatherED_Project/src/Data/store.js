import { createStore } from "redux";
import { forYouReducer } from "./For-you-page";

const store = createStore(forYouReducer);

export default store;