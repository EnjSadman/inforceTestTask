import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsSelector } from '../store/selectors';
import { useEffect } from 'react';
import { fetcher } from './fetcher';
import { setProductAction } from '../store/actions';
import { Modal } from "./modal";

export const alphabeticalSort = (arr) => {
  return arr.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

export const ProductList = () => {

  const dispatch = useDispatch();
  const productList = useSelector(getProductsSelector);

  const [id, setId] = useState(null);
  const [needToUpdate, setNeedToUpdate] = useState(false);
  const [addingNewElement, setAddingNewElement] = useState(false);

  useEffect(() => {
    const loadFromServer = async () => {
      let products = await fetcher("products");
      alphabeticalSort(products);
      dispatch(setProductAction(alphabeticalSort(products)));
    }

    loadFromServer();
  }, []);

  useEffect(() => {
    setId(null);
    setAddingNewElement(false);

    if(needToUpdate) {
      setNeedToUpdate(false);
    }
  }, [needToUpdate]);

  return(
    <div className="productList">
      <button onClick={(() => {
        if (id == null) {
          setAddingNewElement(true);
        }
      })}>
        add new element
      </button>
      {productList.map(el => (
        <div className="productList__item" key={el.id}>
          <p>{el.id}</p>
          <p>{el.name}</p>
          <p>{el.count}</p>
          <button
            onClick={() => {
              if(!addingNewElement) {
                setId(el.id);
              }
            }}
          >remove</button>
        </div>
      ))}
      {(id == null) ? '' :<Modal id={id} action={"remove"} onUpd={() => setNeedToUpdate(true)}/>}
      {(addingNewElement) ? <Modal id={Math.floor(Math.random(1) * 10000)} action={"add"} onUpd={() => setNeedToUpdate(true)}/> : ''}
    </div>
  )
}