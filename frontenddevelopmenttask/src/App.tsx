import './style/StyleVariables.css';
import './style/GlobalStyle.css'

import Navbar from './components/Navbar/Navbar';
import PageWrapper from './components/PageWrapper/PageWrapper';

import { Route, BrowserRouter} from "react-router-dom";
import { Routes } from "react-router";
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Customers from './components/Customers/Customers';
import Trainings from './components/Trainings/Trainings';
import Statistics from './components/Statistics/Statistics';

interface customerObject {
  firstname: string,
  lastname: string,
  streetaddress: string,
  postcode: string,
  city: string,
  email: string,
  phone: string,
  content: string,
  links: string
}
interface trainingObject {
  date: string,
  duration: string,
  activity: string,
  firstname: string,
  lastname: string
}

const App: React.FC = () => {

  const [customerDisplayList, setCustomerDisplayList] = useState<customerObject[]>([]);
  const [trainingDisplayList, setTrainingDisplayList] = useState<trainingObject[]>([]);

  useEffect(() => {
    const getCustomerData = () => {
    return fetch('http://traineeapp.azurewebsites.net/api/customers').then((response: Response) => response.json());
    }

    const getTrainingData = async () => {
      const temporaryTrainingData = await fetch('http://traineeapp.azurewebsites.net/api/trainings').then((response: Response) => response.json());
      for(let i = 0; i < temporaryTrainingData.content.length; i++) {
        const trainingCustomerName = await fetch(temporaryTrainingData.content[i].links[2].href).then((response: Response) => response.json());
        temporaryTrainingData.content[i]["firstname"] = trainingCustomerName.firstname;
        temporaryTrainingData.content[i]["lastname"] = trainingCustomerName.lastname;
      }
      return temporaryTrainingData.content;
    }

    const customersData = getCustomerData();
    customersData.then((data) => {
    setCustomerDisplayList(data.content);

    const trainingsData = getTrainingData();
    trainingsData.then((data) => {
      setTrainingDisplayList(data);
    })

    })
  }, []);

  return (
  <>
      <BrowserRouter>
        <PageWrapper>
          <Navbar/>
            <Routes>
              <Route path="/customers" element={<Customers data={[...customerDisplayList]}/>}/>
              <Route path="/trainings" element={<Trainings data={[...trainingDisplayList]}/>}/>
              <Route path="statistics" element={<Statistics data={[...trainingDisplayList]}/>}/>
            </Routes>
        </PageWrapper>
      </BrowserRouter>
  </>
  );
};

export default App;