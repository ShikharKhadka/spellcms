import React, { useEffect, useState } from "react";
import Textfiled from "../../component/textfiled";
import useInput from "../../hooks/input";
import { useDispatch, useSelector } from "react-redux";
import { fetch, post } from "./categoryslice";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../../component/button/button";

export const Category = () => {
  const input = useInput<{ name: string }>();
  const [category, setcategory] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((e: RootState) => e.category.data);
  const status = useSelector((e: RootState) => e.category.status);

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcategory(value);
  };

  const onClick = () => {
    dispatch(post({ name: category }));
  };

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full ">
      <div className="text-lg font-semibold mb-2">Category</div>
      <div className="flex gap-4">
        <Textfiled
          input={input}
          onchange={onCategoryChange}
          placeholder="Category"
          required={true}
          validationName="category"
          value={category}
          fullWidth
        />
        <Button title="Add Category" onClick={onClick} />
      </div>
      <div className="py-2  mx-auto space-y-2">
        <div>Category List</div>
        {state.length  > 0 ? state.map((e, index) => (
          <div
            key={index}
            className="px-4 py-2 border border-gray-200 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="text-gray-800 font-medium">{e.name}</div>
          </div>
        )) : <div>Data not Found</div>}
      </div>
    </div>
  );
};
