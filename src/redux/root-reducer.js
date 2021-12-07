import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import authReducer from '../reducers/authReducer';
import userReducer from "./user/user.reducer";
import postReducer from './post/post.reducer';
import filterReducer from './post-filter/post-filter.reducer'
// import filterReducer from '../reducers/filterReducer';
//import bookmarkReducer from '../reducers/bookmarkReducer';
import bookmarkReducer from './bookmark/bookmark.reducer';
//import commentReducer from '../reducers/commentReducer';
import commentReducer from './comments/comment.reducer';
const persistConfig ={
    key:'root',
    storage,
    whitelist:['auth','filters','posts','bookmarks','comments']
}
const rootReducer =combineReducers({
    filters:filterReducer,
    posts:postReducer,         
    user:userReducer,
    bookmarks:bookmarkReducer,
    comments:commentReducer
})
export default persistReducer(persistConfig,rootReducer);