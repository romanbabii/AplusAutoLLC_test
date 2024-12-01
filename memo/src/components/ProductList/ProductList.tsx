import {PropsBase} from "../../common/PropsBase.ts";
import {ProductViewModel} from "../../common/view_models/ProductViewModel.ts";
import React from "react";
import ProductListItem from "../ProductListItem/ProductListItem.tsx";

export interface ProductList_Props extends PropsBase {
    data: ProductViewModel[];
    onListItemClick: (id: string) => void;
}

const ProductList: React.FC<ProductList_Props> = React.memo((props: ProductList_Props) => {
    console.log('ProductList rendered!');

    const items = props.data.map((product: ProductViewModel) => {
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
})

export default ProductList;