import { firestore } from '../../firebase/utils';
import { Products, ProductsResponse } from './Products';

export const handleAddProduct = (product: Products) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection('products')
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = () => {
  return new Promise<ProductsResponse[]>((resolve, reject) => {
    firestore
      .collection('products')
      .get()
      .then((snapshot) => {
        const productArray: ProductsResponse[] = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          } as ProductsResponse;
        });

        resolve(productArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (documentID: string) => {
  return new Promise<void>((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
