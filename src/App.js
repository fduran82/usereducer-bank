import { useReducer } from 'react';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return {
        ...state,
        balance: 500,
        isActive: true,
      };
    case 'deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'withdraw':
      if (state.balance < action.payload) {
        alert(
          "Sorry, you don't have enough funds in your account at this time."
        );
        return state;
      }
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'requestLoan':
      if (state.loan > 0) {
        alert('Sorry, you already have a loan.');
        return state;
      }
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case 'payLoan':
      if (state.balance < state.loan) {
        alert(
          "Sorry, you don't have enough funds in your account at this time."
        );
        return state;
      }
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case 'closeAccount':
      if (state.loan > 0 && state.balance !== 0) return state;
      return {
        ...state,
        balance: 0,
        isActive: false,
      };
    default:
      throw new Error('Unknown Error');
  }
}

function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className='bank'>
      <div className='bank-header'>
        <h1>The useReducer Bank </h1>
        <p>A simple react app to test how useReducer works.</p>
      </div>
      <div className='bank-container'>
        <div className='bank-numbers'>
          <p>
            Balance: <span>{balance}</span>{' '}
          </p>
          <p>
            Loan: <span>{loan}</span>{' '}
          </p>
        </div>
        <div className='bank-actions'>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'openAccount' });
              }}
              disabled={isActive}
            >
              Open account
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'deposit', payload: 150 });
              }}
              disabled={!isActive}
            >
              Deposit 150
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'withdraw', payload: 50 });
              }}
              disabled={!isActive}
            >
              Withdraw 50
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'requestLoan', payload: 5000 });
              }}
              disabled={!isActive}
            >
              Request a loan of 5000
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'payLoan' });
              }}
              disabled={!isActive}
            >
              Pay loan
            </button>
          </p>
          <p>
            <button
              onClick={() => {
                dispatch({ type: 'closeAccount' });
              }}
              disabled={!isActive}
            >
              Close account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
