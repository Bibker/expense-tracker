import { dashboard, expenses, transactions, trend } from "../utils/icons";
export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "View Transaction",
    icon: transactions,
    link: "/transaction",
  },
  {
    id: 3,
    title: "Incomes",
    icon: trend,
    link: "/income",
  },
  {
    id: 4,
    title: "Expense",
    icon: expenses,
    link: "/expense",
  },
];
