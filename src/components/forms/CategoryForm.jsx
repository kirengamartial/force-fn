import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    parentId: category?.parentId || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Category Name */}
      <Input
        label="Category Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {/* Parent Category ID (Optional) */}
      <Input
        label="Parent Category ID"
        value={formData.parentId}
        placeholder="Enter parent category ID (optional)"
        onChange={(e) =>
          setFormData({ ...formData, parentId: e.target.value })
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

export default CategoryForm;
