import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/income`);
    setIncomes(response.data.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/income/${id}`);
    getIncomes();
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
