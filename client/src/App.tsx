import { useContext, useEffect } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div>Loading ... </div>;
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
});

export default App;
