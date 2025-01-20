import React, { useState } from "react";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";

const TransactionForm = ({ transaction, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    amount: transaction?.amount || "",
    description: transaction?.description || "",
    type: transaction?.type || "expense",
    categoryId: transaction?.categoryId || "",
    transactionDate: transaction?.transactionDate || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: parseFloat(e.target.value) || "" })
        }
      />

      {/* Description */}
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      {/* Transaction Type */}
      <Select
        label="Transaction Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        options={[
          { value: "expense", label: "Expense" },
          { value: "income", label: "Income" },
          { value: "transfer", label: "Transfer" },
        ]}
      />

      {/* Category */}
      <Select
        label="Category"
        value={formData.categoryId}
        onChange={(e) =>
          setFormData({ ...formData, categoryId: e.target.value })
        }
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      {/* Transaction Date */}
      <Input
        label="Transaction Date"
        type="date"
        value={formData.transactionDate}
        onChange={(e) =>
          setFormData({ ...formData, transactionDate: e.target.value })
        }
      />

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default TransactionForm;
