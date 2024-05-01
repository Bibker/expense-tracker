import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const username = localStorage.getItem("name");
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
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("name", res.data.data.name);
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
        toast.error(err.response.data.message);
      });
  };

  //Calculate Incomes
  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}/income`, income, config)
      .then((res) => {
        toast.success("Income added");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}/income`, config);
    setIncomes(response.data.data);
  };

  const deleteIncome = async (id) => {
    swal({
      title: "Delete Income?",
      text: "Are you sure that you want to delete this income?",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${BASE_URL}/income/${id}`, config)
          .then(() => {
            toast.success("Income Deleted");
            getIncomes();
          })
          .catch((error) => {
            toast.error("Failed to delete income");
          });
      }
    });
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
      .then((res) => {
        toast.success("Expense added");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}/expense`, config);
    setExpenses(response.data.data);
  };

  const deleteExpense = async (id) => {
    swal({
      title: "Delete Expense?",
      text: "Are you sure that you want to delete this expense?",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${BASE_URL}/expense/${id}`, config)
          .then(() => {
            toast.success("Expense deleted");
            getExpenses();
          })
          .catch((error) => {
            toast.error("Expense delete failed");
          });
      }
    });
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
    swal({
      title: "Logout?",
      text: "Are you sure that you want to logout?",
      icon: "warning",
      buttons: ["Cancel", "OK"],
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/login");
      }
    });
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
        username,
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
