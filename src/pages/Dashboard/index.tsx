//import { useContext } from "react";
//import { LanguageContext } from "../../context/LanguageContext";

import { Title } from "../../components/Title";



const Dashboard = () => {
  //const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col min-h-screen w-full pl-16 justify-center items-center max-w-screen-3xl my-9 3xl:pl-96 z-10">
      <Title> Logado </Title>
    </div>
  );
};

export default Dashboard;
