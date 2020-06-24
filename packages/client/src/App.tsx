import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { signIn, subscribeLoginState, signOut } from "./poc/Firebase";

type User = {
  uid: string;
  displayName: string;
  refreshToken: string;
  getIdToken: () => Promise<string>;
};

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    subscribeLoginState((u) => {
      if (u) {
        const user: User = {
          uid: u.uid,
          displayName: u.displayName || "",
          refreshToken: u.refreshToken,
          getIdToken: u.getIdToken,
        };
        setUser(user);
      }
    });
  }, []);
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
        {!user && (
          <button
            onClick={() =>
              signIn((cred) => {
                if (cred.user) {
                  const user: User = {
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
        )}
        {user && (
          <button
            onClick={() => {
              signOut();
              setUser(null);
            }}
          >
            sign out
          </button>
        )}
        {user && <p>{user.uid}</p>}
      </header>
    </div>
  );
}

export default App;
