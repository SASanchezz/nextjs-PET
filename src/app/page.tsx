'use client';

import Image from "next/image";
import React from "react";
import Categories from "src/components/categories";
import Popup from "src/components/popup";
import { CategoryType, categories as categoryArr } from "src/types/Category";

export default function Home() {

  const [error, setError] = React.useState('');
  const [changesExists, setChangesExists] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(-1);
  const [categories, setCategories] = React.useState(categoryArr);
  const [savedCategories, setSavedCategories] = React.useState(categoryArr);

  const popupOnCancel = () => setShowPopup(false);
  const popupOnApprove = () => {
    setCategories((items: CategoryType[]) => items.filter((item) => item.id !== categoryId))
    setShowPopup(false);
    setChangesExists(true);
  }

  const saveChanges = () => {
    const validationError = validateChanges();
    console.log(validationError);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSavedCategories([...categories]);
    setChangesExists(false);
    //Send to backend
  }

  const validateChanges = (): string => {
    for(let i = 0; i < categories.length; i++) {
      const category = categories[i];
      console.log(category.name);
      if (category.name === '' || category.name === 'Enter Category Name') {
        return 'Category name cannot be empty or default';
      }
    };
    return '';
  }

  const cancelChanges = () => {
    setCategories([...savedCategories]);
    console.log(categories);
    setChangesExists(false);
    setError('');
  }
    
  const changeButtons = () => (
    <>
      <button className="save-changes" onClick={saveChanges}>
        <Image src="/check-circle.svg" width={20} height={20} alt="del" />
        <div>Save Changes</div>
      </button>
      <button className="cancel-changes" onClick={cancelChanges}>Cancel Changes</button>
    </>
  );

  const createCategoryHandler = () => {
    setCategories([
      {
        id: categories.length + 1,
        name: "Enter Category Name",
        visibility: false,
      },
      ...categories
    ])
    setChangesExists(true);
  }

  const onToggle = (id: number) => {
    setCategories((items: CategoryType[]) => items.map((item: CategoryType) => 
      item.id === id ? {...item, visibility: !item.visibility} : item
    ));
    setChangesExists(true);
  }
  const onTextChange = (id: number) => {
    return (event: any) => {
      setCategories((items: CategoryType[]) => items.map((item: CategoryType) => 
        item.id === id ? {...item, name: event.target.value} : item
      ));
      setChangesExists(true);
      console.log(categories);
    }
  }

  const onDelete = (id: number) => {
    setCategoryId(id);
    setShowPopup(true);
  }

  return (
      <div className="home">
        {showPopup ? <div className="page-mask"/> : null}
        {showPopup ? <Popup onCancel={popupOnCancel} onApprove={popupOnApprove}/> : null}

        <div className="categories">
          <button className="btn" onClick={createCategoryHandler}>
            + Create a Category
          </button>

          <Categories items={categories} setItems={setCategories} setChangesExists={setChangesExists}
          onDelete={onDelete} onTextChange={onTextChange} onToggle={onToggle}/>

          <div className="change-buttons">
            {changesExists? changeButtons() : null}
          </div>
          {error ? <div className="error">{error}</div> : null}

        </div>
      </div>
  )
}
