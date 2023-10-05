import { useDispatch, useSelector } from 'react-redux';
import { addProductAction, deleteProductAction } from '../store/actions';
import { getProductsSelector } from '../store/selectors';
import { useState } from 'react';
import { fetcherDelete, fetcherPOST } from './fetcher';


export const Modal = ({id, action, onUpd}) => {
  const dispatch = useDispatch();
  const productList = useSelector(getProductsSelector);
  const [newName, setNewName] = useState('');
  const [newCount, setNewCount] = useState(0);
  const [newWeight, setNewWeight] = useState(0);
  const [isValid, setIsValid] = useState(true);

  return (
    <div>
      {(action === "remove") 
      ?
      <div className='modal'>
        <div className="modal__inner">

        <button
        onClick={() => {
          dispatch(deleteProductAction(productList.filter(el => el.id !== id)));
          fetcherDelete("products", `/${id}`)

          onUpd();
        }}>
          remove
      </button>
      <button
      onClick={() => {
        onUpd();
      }}>
        cancel
      </button>
      </div> 
        </div>
      :
      <div className='modal'>
        <div className='modal__inner'>

        <input type="text" value={newName} onChange={(event) => {
          const result = event.target.value.replace(/[^a-z]/gi, '');
          setNewName(result);
          setIsValid(true)
        }}/>
        <input type="number"  value={newCount} onChange={(event) => {
          setNewCount(Number(event.target.value))
          setIsValid(true)
        }}/>
        <input type="number" value={newWeight} onChange={(event) => {
          setNewWeight(Number(event.target.value))
          setIsValid(true)
        }}/>
        <button
      onClick={() => {
        onUpd();
      }}>cancel</button>
      <button onClick={() => {
        console.log(newCount, typeof newCount)
        if (newName !==  '' && newCount !== 0 && newWeight !== 0) {
          setIsValid(true);
          dispatch(addProductAction({id: id, imageUrl: 'someImageUrl', name: newName, count: newCount, weight: newWeight, size:{width: 200, height: 200}, comments:[]}));
          fetcherPOST("products", {id: id, imageUrl: 'someImageUrl', name: newName, count: newCount, weight: newWeight, size:{width: 200, height: 200}, comments:[]});
          onUpd();
        } else {
          setIsValid(false)
        }
      }}
      >
        add
        </button>
        <p>
          {(isValid) ? '' : "fields are incorrect"}
        </p>
      </div>
        </div>
      
      }
      
    </div>
  )
}