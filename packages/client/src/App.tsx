import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { signIn } from "./poc/Firebase";

type userCredential = {
  uid: string;
  displayName: string;
  refreshToken: string;
  getIdToken: () => Promise<string>;
};

function App(): JSX.Element {
  const [user, setUser] = useState<userCredential | null>();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React !!
        </a>
        <button
          onClick={() =>
            signIn((cred) => {
              if (cred.user) {
                const user: userCredential = {
                  uid: cred.user.uid,
                  displayName: cred.user.displayName || "anonymous naja",
                  refreshToken: cred.user.refreshToken,
                  getIdToken: cred.user.getIdToken,
                };
                setUser(user);
              }
            })
          }
        >
          sign in
        </button>
        {user && <p>{user.uid}</p>}
      </header>
    </div>
  );
}

export default App;
