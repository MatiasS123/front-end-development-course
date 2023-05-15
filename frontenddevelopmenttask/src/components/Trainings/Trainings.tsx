import { Box, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

interface Training {
    date: string,
    duration: string,
    activity: string,
    firstname: string,
    lastname: string
  }

const Trainings: React.FC<{ data: Training[] }> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<keyof Training | ''>('');
  
    const filteredData = data.filter(customer => {
      const fullName = `${customer.firstname} ${customer.lastname}`;
      return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    const sortedData = [...filteredData];
    if (sortField) {
      sortedData.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
    }
  
    const handleSort = (field: keyof Training) => {
      if (field === sortField) {
        setSortField('');
      } else {
        setSortField(field);
      }
    };
  
    return (
  <>
      <h1 className='MainTitle'>Trainings:</h1>
      <div className='MainContent'>
      <Box>
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <List>
          {sortedData.map((training, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${dayjs(training.date).format('DD.MM.YYYY HH:mm')}, Activity: ${training.activity}, duration: ${training.duration} minutes`} secondary={`${training.firstname} ${training.lastname}`}/>
            </ListItem>
          ))}
        </List>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" onClick={() => handleSort('firstname')}>Sort by First Name</Button>
          <Button variant="outlined" onClick={() => handleSort('lastname')}>Sort by Last Name</Button>
        </Box>
  </Box>
  </div>
      </>
    );
  }

export default Trainings;