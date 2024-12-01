import {PropsBase} from "../../common/PropsBase.ts";
import React from "react";
import {ProductViewModel} from "../../common/view_models/ProductViewModel.ts";


export interface ProductView_Props extends PropsBase {
    data: ProductViewModel;
    onNextClick: (id: string | null | undefined) => void;
}

const ProductView: React.FC<ProductView_Props> = React.memo((props: ProductView_Props) => {
    console.log('ProductView rendered!');

    const mt10 = {marginTop: '10px'};

    return (
        <div style={{
            height: '100%',
            position: 'relative',
        }}>
            <div style={mt10}>
                #{props.data.id} {props.data.name} {props.data.price}{props.data.currency}
            </div>
            <div style={mt10}>
                <div>
                    <img width="300px" height="300px" src={props.data.photo}/>
                </div>
                <div>
                    {props.data.description}
                </div>
            </div>
            <div style={{...mt10, position: 'absolute',bottom: 0}}>
                <button style={{cursor: 'pointer', padding: '10px'}} onClick={() => props.onNextClick(props.data.idNext)}>Next</button>
            </div>
        </div>
    )
})

export default ProductView;