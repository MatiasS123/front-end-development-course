import { Box, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { useState } from 'react';

interface Customer {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
}

const Customers: React.FC<{ data: Customer[] }> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Customer | ''>('');

  const filteredData = data.filter(customer => {
    const fullName = `${customer.firstname} ${customer.lastname}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedData = [...filteredData];
  if (sortField) {
    sortedData.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    });
  }

  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortField('');
    } else {
      setSortField(field);
    }
  };

  const exportData = () => {
    const csv = sortedData
      .map(({ firstname, lastname, streetaddress, postcode, city, email, phone }) =>
        [firstname, lastname, streetaddress, postcode, city, email, phone].join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'customers.csv';
    link.click();
  };

  return (
    <>
      <h1 className='MainTitle'>Customers:</h1>
      <div className='MainContent'>
        <Box>
          <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <List>
            {sortedData.map((customer, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${customer.firstname} ${customer.lastname}, ${customer.email}, ${customer.phone}`} secondary={`${customer.streetaddress},
                  ${customer.postcode} ${customer.city}`} />
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => handleSort('firstname')}>Sort by First Name</Button>
            <Button variant="outlined" onClick={() => handleSort('lastname')}>Sort by Last Name</Button>
            <Button variant="outlined" onClick={() => handleSort('email')}>Sort by Email</Button>
            <Button variant="outlined" onClick={exportData}>Export CSV</Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Customers;