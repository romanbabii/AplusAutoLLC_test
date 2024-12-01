import styles from './App.module.css'
import React, {useEffect} from "react";
import {MapViewModelFromProductModel, ProductViewModel} from "./common/view_models/ProductViewModel.ts";
import ProductList from "./components/ProductList/ProductList.tsx";
import {ProductRepositoryInstance} from "./common/repositories/commodity/ProductRepository.ts";
import ProductView from "./components/ProductView/ProductView.tsx";

const App = ()=> {
    console.log('App rendered!');

    let productsState: [ProductViewModel[], React.Dispatch<React.SetStateAction<ProductViewModel[]>> | null] = [[], null];
    let [products, setProducts] = productsState;
    let productViewState: [ProductViewModel | null, React.Dispatch<React.SetStateAction<ProductViewModel | null>> | null] | null = [null, null];
    let [_, setProductView] = productViewState;

    const initProducts = async () => {
        console.log('initProducts');
        if(!setProducts) {
            return;
        }
        const productsResponse = await ProductRepositoryInstance.GetAll();
        if(productsResponse.length > 0) {

            const mapped = productsResponse.map((p, index) => {
                let nextProductId: string | null | undefined = null;
                const nextProduct = productsResponse[index + 1]
                if(nextProduct) {
                    nextProductId = nextProduct.id;
                }

                return MapViewModelFromProductModel(p,
                    nextProductId
                )
            });
            setProducts(mapped);
        }else {
            setProducts([]);
        }
    }

    const initProductView = async (id: string) => {
        if(!setProductView) {
            return;
        }

        const existingProductListItem = products.find(p => p.id === id);
        const productResponse = await ProductRepositoryInstance.Get(id);
        const mapped = MapViewModelFromProductModel(productResponse, existingProductListItem?.idNext);
        setProductView(mapped);
    }

    const onNextClickHandler = (id: string | null | undefined)=> {
        if(!setProductView) {
            return;
        }

        if(!id) {
            if(products.length > 0) {
                initProductView(products[0].id);
                return;
            }
            setProductView(null);
            return;
        }

        initProductView(id);
    }

    const onListItemClickHandler = (id: string) => {
        if(!setProductView) {
            return;
        }

        if(!id) {
            setProductView(null);
            return;
        }
        initProductView(id);
    }

    const productListInitCallbackHandler = (state: [ProductViewModel[], React.Dispatch<React.SetStateAction<ProductViewModel[]>>]) => {
        productsState = state;
        [products, setProducts] = productsState;

    }

    const productViewInitCallbackHandler = (state: [ProductViewModel | null, React.Dispatch<React.SetStateAction<ProductViewModel | null>>]) => {
        productViewState = state;
        [_, setProductView] = productViewState;
    }

    useEffect(() => {
        initProducts();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.products}>
                    <ProductList initCallback={productListInitCallbackHandler} onListItemClick={onListItemClickHandler} />
                </div>
                <div className={styles.productView}>
                    <ProductView initCallback={productViewInitCallbackHandler} onNextClick={onNextClickHandler} />
                </div>
            </div>
        </div>
    )
}

export default App
