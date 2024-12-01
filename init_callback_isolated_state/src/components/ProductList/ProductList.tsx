import {PropsBase} from "../../common/PropsBase.ts";
import {ProductViewModel} from "../../common/view_models/ProductViewModel.ts";
import React, {useState} from "react";
import ProductListItem from "../ProductListItem/ProductListItem.tsx";

export interface ProductList_Props extends PropsBase {
    onListItemClick: (id: string) => void;
    initCallback: (state: [ProductViewModel[], React.Dispatch<React.SetStateAction<ProductViewModel[]>>]) => void;
}

const ProductList: React.FC<ProductList_Props> = (props: ProductList_Props) => {
    console.log('ProductList rendered!');

    const state = useState<ProductViewModel[]>([])
    const [products] = state;
    props.initCallback(state);

    const items = products.map((product: ProductViewModel) => {
        return (
            <div key={product.id} onClick={() => {props.onListItemClick(product.id)}}>
                <ProductListItem data={product}/>
                <hr/>
            </div>
        );
    });

    return (
        <div>
            {items}
        </div>
    )
}

export default ProductList;