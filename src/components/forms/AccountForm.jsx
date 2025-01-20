import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const AccountForm = ({ account, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: account?.name || "",
    type: account?.type || "",
    balance: account?.balance || "",
    description: account?.description || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Account Name */}
      <Input
        label="Account Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {/* Account Type */}
      <Input
        label="Account Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      />

      {/* Account Description */}
      <Input
        label="Account Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      {/* Initial Balance */}
      <Input
        label="Initial Balance"
        type="number"
        value={formData.balance}
        onChange={(e) =>
          setFormData({ ...formData, balance: parseFloat(e.target.value) || "" })
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

export default AccountForm;
