import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  fetchProducts,
  deleteProduct,
} from '../../redux/Products/Products';
import { getProducts } from '../../redux/Products/ProductsSelector';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const Admin = () => {
  const { products } = {
    products: { data: [], queryDoc: '', isLastPage: false },
  };
  const dispatch = useDispatch();
  const productsData = useSelector(getProducts);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('mens');
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setProductDesc('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      addProduct({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      }),
    );
    resetForm();
  };

  const handleLoadMore = () => {
    // dispatch(
    //   fetchProductsStart({
    //     startAfterDoc: queryDoc,
    //     persistProducts: data,
    //   }),
    // );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className='admin'>
      <div className='callToActions'>
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className='addNewProductForm'>
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label='Category'
              options={[
                {
                  value: 'mens',
                  name: 'Mens',
                },
                {
                  value: 'womens',
                  name: 'Womens',
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label='Name'
              type='text'
              value={productName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductName(e.target.value)
              }
            />

            <FormInput
              label='Main image URL'
              type='url'
              value={productThumbnail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductThumbnail(e.target.value)
              }
            />

            <FormInput
              label='Price'
              type='number'
              min='0.00'
              max='10000.00'
              step='0.01'
              value={productPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                // @ts-ignore
                setProductPrice(e.target.value)
              }
            />

            <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button type='submit'>Add product</Button>
          </form>
        </div>
      </Modal>

      <div className='manageProducts'>
        {/* @ts-ignore */}
        <table border='0' cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className='results'
                  // @ts-ignore
                  border='0'
                  cellPadding='10'
                  cellSpacing='0'
                >
                  <tbody>
                    {Array.isArray(productsData) &&
                      productsData.length > 0 &&
                      productsData.map((product, index) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                        } = product;

                        return (
                          <tr key={documentID}>
                            <td>
                              <img
                                className='thumb'
                                src={productThumbnail}
                                alt='Product thumbnail'
                              />
                            </td>
                            <td>{productName}</td>
                            <td>£{productPrice}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProduct(documentID))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                {/* @ts-ignore */}
                <table border='0' cellPadding='10' cellSpacing='0'>
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
