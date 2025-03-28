import { useState } from "react";
import { TextField, Button, } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { Grid } from '@mui/material';
import { fetchVillagers, Village } from "../api/fetch";
import UserList from "./UserList";

const SearchUser: React.FC = () => {
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [searchedData, setSearchData] = useState<Village[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async () => {
        try{
            setLoading(true)
            setSearchData([]);
            const data = await fetchVillagers(name, mobileNumber)
            setSearchData([...data])
            setLoading(false)
        } catch(e){
            setLoading(false)
        }
       
    };

    const hideSearchResult = () => {
        setSearchData([])
    }


    return (
        <>
        <PageContainer title={"Search User"}>
            <Grid container columnGap={1} wrap="nowrap">
                <Grid sm={12} xs={12} md={6} lg={6}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        color="success"
                    />
                </Grid>
                <Grid sm={12} xs={12} md={6} lg={6}>
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        color="success"
                    />
                </Grid>
            </Grid>
            <Button loading={loading} variant="contained" color="success" fullWidth onClick={handleSearch}>
                Search
            </Button>
            
        </PageContainer>
        {
            searchedData.length ? <UserList title='Search List' data={searchedData} hideSearchResult={hideSearchResult}/> : <></>
         }
        </>
    );
};

export default SearchUser;
