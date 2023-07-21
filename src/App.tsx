import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import categories from './categories';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Groceries',
      amount: 100,
      category: 'Food',
    },
    {
      id: 2,
      description: 'Gas',
      amount: 50,
      category: 'Transportation',
    },
    {
      id: 3,
      description: 'Rent',
      amount: 1000,
      category: 'Housing',
    },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;

// form for adding new expense
// - validation message on submit the form with no values
// - can add description, amount, category

// - on submit, form gets added to list
// - on submit, form gets cleared

// - can filter by category with a dropdown menu
// - can look at all categories
// -- a new total is calculated each time a new category is selected
// -- the total is displayed below the list of expenses

// - can delete an expense from the list
// -- total is updated when an expense is deleted
