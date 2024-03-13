import  { useContext, useState } from "react";
import SideBar from "../layout/SideBar";
import MyBooks from "../miniComponents/MyBooks";
import MyProfile from "../miniComponents/MyProfile";
import CreateBook from "../miniComponents/CreateBook";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const [component, setComponent] = useState("MyBooks");
  const { mode, isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Book" ? (
        <CreateBook />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBooks />
      )}
    </section>
  );
};

export default Dashboard;