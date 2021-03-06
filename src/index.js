import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './store//reducer/rootReducer'
import {Provider}  from 'react-redux'
import thunk from 'redux-thunk'   //middleware
import {reduxFirestore,getFirestore,createFirestoreInstance} from 'redux-firestore'
import {reactReduxFirebase,getFirebase, ReactReduxFirebaseProvider} from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'
import firebase from 'firebase/app'


const store= createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirestore,getFirebase})),
    reduxFirestore(firebase,firebaseConfig),
    // reactReduxFirebase(firebaseConfig,{attachAuthIsReady:true})
    )
);

const profileSpecificProps = {
  userProfile: 'users',
  useFirestoreForProfile: true 
}


const rrfProps = {
  firebase,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance
};

// const rrfProps = {
//   firebase,
//   config: firebaseConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance
// };




ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <App />
  </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
