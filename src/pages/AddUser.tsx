import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { PageContainer } from "@toolpad/core";
import { Button } from "@mui/material";
import { addVillage, updateUser, Village } from "../api/fetch";

type AddUserPropsType = {
    data?: Village
    handleEdit?: (id: string)=> {};
    hideSearchResult?:()=> void
}

const AddUser: React.FC<AddUserPropsType> = ({ data, handleEdit: editBtnClick, hideSearchResult }) => {

    const [formData, setFormData] = useState(data ? data : {
        _id: "",
        name: "",
        mobileNumber: "",
        address: "",
        amount: "",
        paymentStatus: "",
        sweetGiven: false,
        paymentType: ""
    });
   
  
    const [loading, setLoading] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, sweetGiven: e.target.checked });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, paymentStatus: e.target.value });
    };

    const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, paymentType: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            await addVillage(formData);
            setLoading(false)
            alert("Village added successfully!");
            setFormData({
                _id: "",
                name: "",
                mobileNumber: "",
                address: "",
                amount: "",
                paymentStatus: "",
                sweetGiven: false,
                paymentType: ""
            });
        } catch (error) {
            alert("Failed to add village");
            setLoading(false)
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            data && await updateUser(data._id, formData);
            setLoading(false)
            alert("Village added successfully!");

            editBtnClick && editBtnClick('')
            hideSearchResult && hideSearchResult()

        } catch (error) {
            alert("Failed to add village");
            setLoading(false)
        }
    };


    return (
        <PageContainer title={data ? "Edit User" : "Add User"}>
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12} md={4} lg={4}>
        
                        <TextField fullWidth color="success" onChange={handleChange} name="name" id="name" label="Name" variant="outlined" value={formData.name} />
                    
                </Grid>

                <Grid item sm={12} xs={12} md={4} lg={4}>
                        <TextField fullWidth color="success" onChange={handleChange} name="mobileNumber" id="mobileNumber" label="Mobile Number" variant="outlined" value={formData.mobileNumber} />
                </Grid>

                <Grid item sm={12} xs={12} md={4} lg={4}>
                    
                        <TextField fullWidth color="success" onChange={handleChange} name="amount" id="amount" label="Amount" variant="outlined" value={formData.amount} />
                  
                </Grid>

                <Grid item sm={12} xs={12} md={12} lg={12}>
                    
                        <TextField fullWidth color="success" onChange={handleChange} name="address" id="address" label="Address" variant="outlined" value={formData.address} rows={4} multiline/>
                  
                </Grid>


                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel id="payment-status-label">Payment Status</FormLabel>
                        <RadioGroup row name="paymentStatus" value={formData.paymentStatus} onChange={handleRadioChange}>
                            <FormControlLabel  value="completed" control={<Radio color="success" />} label="Completed" />
                            <FormControlLabel  value="pending" control={<Radio color="success" />} label="Pending" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                   {formData.paymentStatus === 'completed' && <FormControl>
                        <FormLabel id="payment-type-label">Payment Type</FormLabel>
                        <RadioGroup row name="paymentType" value={formData.paymentType} onChange={handlePaymentTypeChange}>
                            <FormControlLabel color="success" value="cash" control={<Radio color="success" />} label="Cash" />
                            <FormControlLabel  color="success" value="online" control={<Radio color="success" />} label="Online" />
                        </RadioGroup>
                    </FormControl>
}
                </Grid>


                <Grid item md={12} lg={12}>
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={formData.sweetGiven} onChange={handleSwitchChange} color="success"/>} label="Sweet Received" />
                    </FormGroup>
                </Grid>

                <Grid item xs={12}>
                    {data ?
                        <Button loading={loading} onClick={handleEdit} variant="contained" color="success">
                            Edit
                        </Button>
                        :
                        <Button loading={loading} onClick={handleSubmit} variant="contained" color="success">
                            Add
                        </Button>
                    }
                </Grid>
            </Grid>
        </PageContainer>
    );
}

export default AddUser;
