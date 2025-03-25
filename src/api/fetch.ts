import axios from "axios";

// Define the expected data structure
export interface Village {
  _id: string;
  name: string;
  mobileNumber: string;
  address: string;
  amount: string;
  paymentStatus: string;
  sweetGiven: boolean
}

// const BASE_URL = "https://masjid-gulzar.onrender.com/api/villagers";

const BASE_URL = 'http://localhost:5000/api/villagers'


// Function to get users
export const fetchAllVillages = async (): Promise<Village[]> => {
  try {
    const response = await axios.get<Village[]>(BASE_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching villages:", error);
    throw error; 
  }
};


// Function to add a new village
export const addVillage = async (data: Village): Promise<void> => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, data);
    console.log("Village added successfully:", response.data);
  } catch (error) {
    console.error("Error adding village:", error);
    throw error; 
  }
};

//Function to search user

export const fetchVillagers = async (name?: string, mobileNumber?: string) => {
    try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("name", name);
        if (mobileNumber) queryParams.append("mobileNumber", mobileNumber);

        const response = await fetch(`${BASE_URL}/search?${queryParams.toString()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching villagers:", error);
    }
};

//fetch perticular user
export const fetchSingleUser = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; 
    }
  };

  //To update an user

  export const updateUser = async (id: string, updatedData: object) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
      return response.data; 
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; 
    }
  };

  // GET ALL EXPENSES
  export interface Expense {
    count: string;
    title: string;
    data: []
  }
  
  export const getExpense = async (): Promise<Expense[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/getExpense`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error; 
    }
  };



