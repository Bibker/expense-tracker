import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  //Login
  const handleLogin = () => {
    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("Invalid email or password");
      });
  };

  //Signup
  const handleSignup = () => {
    axios
      .post(`${BASE_URL}/auth/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        navigate("/login");
        toast.success("Account Created Successfully!");
      })
      .catch((err) => {
        toast.error(err.response.data.message.msg);
      });
  };

  //Handel click
  // const handleClick = () => {
  //   if (token === "") {
  //     navigate("/login");
  //   } else navigate("/dashboard");
  // };

  //Calculate Incomes
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/income`, income, config)
      .catch((err) => {
        setError(err.response.data.message[0].msg);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/income`, config);
    setIncomes(response.data.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}/income/${id}`, config);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  //Calculate Expenses
  const addExpense = async (expense) => {
    const response = await axios
      .post(`${BASE_URL}/expense`, expense, config)
      .catch((err) => {
        setError(err.response.data.message[0].msg);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/expense`, config);
    setExpenses(response.data.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}/expense/${id}`, config);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpense = 0;
    expenses.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return totalExpense;
  };

  //Total Balance
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  //Transaction history
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 3);
  };

  //Logout
  const removeAccount = () => {
    localStorage.removeItem("token");
    toast.warning("Logged Out !!!");
    navigate("/login");
  };

  return (
    <GlobalContext.Provider
      value={{
        BASE_URL,
        name,
        config,
        setName,
        setEmail,
        setPassword,
        handleLogin,
        handleSignup,
        token,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        removeAccount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
