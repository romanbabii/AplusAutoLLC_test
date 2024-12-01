import styles from './App.module.css'
import {useEffect, useState} from "react";
import {MapViewModelFromProductModel, ProductViewModel} from "./common/view_models/ProductViewModel.ts";
import ProductList from "./components/ProductList/ProductList.tsx";
import {ProductRepositoryInstance} from "./common/repositories/commodity/ProductRepository.ts";
import ProductView from "./components/ProductView/ProductView.tsx";

const App = ()=> {
    console.log('App rendered!');

    const [products, setProducts] = useState<ProductViewModel[]>([]);
    const [currentProduct, setCurrentProduct] = useState<ProductViewModel | null>(null);

    const initProducts = async () => {
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
        const existingProductListItem = products.find(p => p.id === id);
        const productResponse = await ProductRepositoryInstance.Get(id);
        const mapped = MapViewModelFromProductModel(productResponse, existingProductListItem?.idNext);
        setCurrentProduct(mapped);
    }

    const onNextClickHandler = (id: string | null | undefined)=> {
        if(!id) {

            if(products.length > 0) {
                initProductView(products[0].id);
                return;
            }
            setCurrentProduct(null);
            return;
        }

        initProductView(id);
    }

    const onListItemClickHandler = (id: string) => {
        if(!id) {
            setCurrentProduct(null);
            return;
        }
        initProductView(id);
    }

    useEffect(() => {
        initProducts();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.products}>
                    <ProductList onListItemClick={onListItemClickHandler} data={products}/>
                </div>
                <div className={styles.productView}>
                    {currentProduct && currentProduct.id ? <ProductView onNextClick={onNextClickHandler} data={currentProduct}/> : ''}
                </div>
            </div>
        </div>
    )
}

export default App
