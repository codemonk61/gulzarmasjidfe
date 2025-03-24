import React from 'react'
import AddUser from './AddUser'
import { fetchSingleUser } from '../api/fetch'
import { PageContainer } from '@toolpad/core'
import Loader from '../components/Loader'

type EditPropsType = {
    id: string;
    handleEdit: (id: string) => {};
    hideSearchResult?: ()=> void
}

const EditUser: React.FC<EditPropsType> = ({ id, handleEdit, hideSearchResult }) => {

    const [userData, setUserData] = React.useState()

    React.useEffect(() => {
        const getSingleUserData = async () => {
            try {
                 const data = await fetchSingleUser(id)
                     setUserData(data)
            } catch (error) {
                console.error("Failed to load villages");
            } finally {
                
            }
        };

        getSingleUserData();
    }, [])

    if(!userData) return <PageContainer><Loader/></PageContainer>

    return (
        <AddUser
            data={userData}
            handleEdit={handleEdit}
            hideSearchResult={hideSearchResult}
        />
    )
}

export default EditUser