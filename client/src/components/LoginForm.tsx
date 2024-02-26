import React, { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User logged as ${store.user.email}`
          : "User not authorized"}
      </h1>
      {!store.isAuth ? (
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            value={email}
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            value={password}
          />
          <button onClick={() => store.login(email, password)}>Login</button>
          <button onClick={() => store.registration(email, password)}>
            Registration
          </button>
          <button onClick={getUsers}>Get User List</button>
        </div>
      ) : (
        <>
          <button onClick={() => store.logout()}>Logout</button>
          <button onClick={getUsers}>Get User List</button>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default observer(LoginForm);
