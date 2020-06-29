import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  signIn,
  subscribeLoginState,
  signOut,
  currentUser,
} from "./poc/Firebase";
import axios from "axios";

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
  const listUser = async () => {
    // const token = user?.refreshToken || '';
    const token = await currentUser()?.getIdToken();
    const res = await axios.post(
      "http://localhost:5000/users",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);
  };
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
        <button onClick={listUser}>User List</button>
      </header>
    </div>
  );
}

export default App;
