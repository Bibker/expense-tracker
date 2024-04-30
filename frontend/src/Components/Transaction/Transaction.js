import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../Context/globalContext";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const { incomes, expenses, token } = useGlobalContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else setIsLoading(false);
  }, [token]);
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history;
  };
  const [...history] = transactionHistory();

  return (
    <>
      {!isLoading && (
        <HistoryStyled>
          <InnerLayout>
            <h2>All Transaction</h2>
            <div>
              {history.length > 0 ? (
                history.map((item) => {
                  const { _id, title, amount, type } = item;
                  return (
                    <div key={_id} className="history-item">
                      <p
                        style={{
                          color:
                            type === "expense" ? "red" : "var(--color-green)",
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          color:
                            type === "expense" ? "red" : "var(--color-green)",
                        }}
                      >
                        {type === "expense" ? `-${amount}` : `+${amount}`}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="no-transaction">
                  <h2>No Transactions Yet</h2>
                  <h2>Please add income / expense first.</h2>
                </div>
              )}
            </div>
          </InnerLayout>
        </HistoryStyled>
      )}
    </>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  gap: 1rem;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  .no-transaction {
    display: flex;
    flex-direction: column;
    margin-top: 25%;
    justify-content: center;
    align-items: center;
  }
  .no-transaction h2 {
    color: #aaa;
  }
`;

export default Transaction;
