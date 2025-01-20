import React, {useState} from "react";
import Input from "../Input";
import Button from "../Button";


const AccountForm = ({ account, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: account?.name || '',
    initialBalance: account?.initialBalance || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Account Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <Input
        label="Initial Balance"
        type="number"
        value={formData.initialBalance}
        onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
      />
      <div className="flex justify-end space-x-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};


export default AccountForm