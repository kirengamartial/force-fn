import React, {useState} from "react";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";


// Transaction Form Component
const TransactionForm = ({ transaction, accounts, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: transaction?.amount || '',
    description: transaction?.description || '',
    type: transaction?.type || 'expense',
    accountId: transaction?.accountId || '',
    categoryId: transaction?.categoryId || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
      />
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <Select
        label="Transaction Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        options={[
          { value: 'expense', label: 'Expense' },
          { value: 'income', label: 'Income' }
        ]}
      />
      <Select
        label="Account"
        value={formData.accountId}
        onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
        options={accounts.map(account => ({
          value: account.id,
          label: account.name
        }))}
      />
      <Select
        label="Category"
        value={formData.categoryId}
        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        options={categories.map(category => ({
          value: category.id,
          label: category.name
        }))}
      />
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TransactionForm