import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const BudgetForm = ({ budget, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    categoryId: budget?.categoryId || (categories[0]?.id || ""),
    amount: budget?.amount || "",
    startDate: budget?.startDate || "",
    endDate: budget?.endDate || "",
    notificationThreshold: budget?.notificationThreshold || "",
    userId: budget?.userId || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: parseFloat(e.target.value) || "" })
        }
      />

      {/* Start Date */}
      <Input
        label="Start Date"
        type="date"
        value={formData.startDate}
        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
      />

      {/* End Date */}
      <Input
        label="End Date"
        type="date"
        value={formData.endDate}
        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      />

      {/* Notification Threshold */}
      <Input
        label="Notification Threshold (%)"
        type="number"
        value={formData.notificationThreshold}
        onChange={(e) =>
          setFormData({
            ...formData,
            notificationThreshold: parseInt(e.target.value, 10) || "",
          })
        }
      />

      {/* User ID */}
      <Input
        label="User ID"
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
      />

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default BudgetForm;
