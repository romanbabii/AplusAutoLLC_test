import {PropsBase} from "../../common/PropsBase.ts";
import React from "react";
import {ProductViewModel} from "../../common/view_models/ProductViewModel.ts";


export interface ProductListItem_Props extends PropsBase {
    data: ProductViewModel
}

const ProductListItem: React.FC<ProductListItem_Props> = React.memo((props: ProductListItem_Props) => {
    console.log('ProductListItem rendered!');

    return(
        <div style={{cursor: "pointer"}}>
            #{props.data.id} {props.data.name} {props.data.price}{props.data.currency}
        </div>
    )
})

export default ProductListItem;