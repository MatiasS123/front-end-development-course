import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import 'dayjs/locale/en';

interface Training {
    date: string,
    duration: string,
    activity: string,
    firstname: string,
    lastname: string
  }

const Statistics: React.FC<{ data: Training[] }> = ({ data }) => {
  
const durationsByActivity: {activity: string, totalDuration: number}[] = [];

for(let i = 0; i < data.length; i++) {
    const keyToCheck = "activity";
    const targetValue = data[i].activity;
    const durationToAdd = parseInt(data[i].duration);

    const existingObj = durationsByActivity.find(obj => obj[keyToCheck] === targetValue);

    if (existingObj) {

    const existingDuration = existingObj.totalDuration

    Object.assign(existingObj, existingDuration+durationToAdd);
    } else {
    const newObj = {activity: targetValue, totalDuration: durationToAdd};
    durationsByActivity.push(newObj);
    }
}

console.log(durationsByActivity);

    return (
  <>
    <h1 className='MainTitle'>Training statistics:</h1>
    <div className='MainContent'>
      <BarChart width={650} height={650} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="duration" fill="#8884d8" />
    </BarChart>
  </div>
      </>
    );
  }

export default Statistics;