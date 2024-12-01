import {PropsBase} from "../../common/PropsBase.ts";
import React, {useState} from "react";
import {ProductViewModel} from "../../common/view_models/ProductViewModel.ts";


export interface ProductView_Props extends PropsBase {
    onNextClick: (id: string | null | undefined) => void;
    initCallback: (state: [ProductViewModel | null, React.Dispatch<React.SetStateAction<ProductViewModel | null>>]) => void;
}

const ProductView: React.FC<ProductView_Props> = (props: ProductView_Props) => {
    console.log('ProductView rendered!');
    const state = useState<ProductViewModel | null>(null);
    const [productView] = state;
    props.initCallback(state);

    const mt10 = {marginTop: '10px'};

    if(!productView || !productView.id) {
        return null;
    }

    return (
        <div style={{
            height: '100%',
            position: 'relative',
        }}>
            <div style={mt10}>
                #{productView.id} {productView.name} {productView.price}{productView.currency}
            </div>
            <div style={mt10}>
                <div>
                    <img width="300px" height="300px" src={productView.photo}/>
                </div>
                <div>
                    {productView.description}
                </div>
            </div>
            <div style={{...mt10, position: 'absolute',bottom: 0}}>
                <button style={{cursor: 'pointer', padding: '10px'}} onClick={() => props.onNextClick(productView.idNext)}>Next</button>
            </div>
        </div>
    )
}

export default ProductView;