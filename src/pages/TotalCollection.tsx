import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { PageContainer } from '@toolpad/core';
import { Expense, getExpense } from '../api/fetch';
import Loader from '../components/Loader';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserList from './UserList';

const TotalCollection = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpense();
        setExpenses(data);

        // Set default tab and data to the first expense item
        if (data.length > 0) {
          setSelectedTab(data[0].title);
          setSelectedData(data[0].data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);

    // Find the selected tab data
    const selectedExpense = expenses.find((expense) => expense.title === newValue);
    if (selectedExpense) {
      setSelectedData(selectedExpense.data);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  return (
    <>
      <PageContainer title="Total Collection">
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
            gap: 2,
            marginBottom: '20px'
          }}
        >
          {expenses.map((card, index) => (
            <Card key={index} sx={{boxshadow: 
             '0px 2px -7px -20px rgba(9, 242, 16, 0.2), 0px 1px 1px 0px rgba(3, 251, 12, 0.14),  0px 1px 3px 0px rgba(4, 251, 12, 0.12)'
            }}
              >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent sx={{ height: '100%' }}>
                  <Typography variant="h5" component="div" sx={{fontWeight: 'bold', color: '#2f7d32'}}>
                    {card.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          ))}
        </Box>


        {/* Tabs Section */}
        <Box sx={{ width: '100%', typography: 'body1', '& .MuiTabPanel-root':{paddingLeft: 0, paddingRight: 0}}}>
          <TabContext value={selectedTab} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
              <TabList
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                  style: { backgroundColor: "#2f7d32", } ,// Changes the underline color
                
                }}
              >
                {expenses.map((value, index) => (
                  <Tab
                    key={index}
                    label={`${value.title}
                  (${value.count})`}
                    value={value.title}
                    sx={{
                     
                      "&.Mui-selected": {
                        color: "#2f7d32", // Active tab text color
                      },
                    }}
                  />
                ))}
              </TabList>
            </Box>
            {expenses.map((value, index) => (
              <TabPanel key={index} value={value.title}>
                <UserList
                  data={selectedData}
                  title={value.title}
                />
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </PageContainer>
    </>
  );
};

export default TotalCollection;

