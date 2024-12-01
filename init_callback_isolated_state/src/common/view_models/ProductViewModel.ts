import {ProductModel} from "../repositories/commodity/models/ProductModel.ts";

export interface ProductViewModel extends ProductModel {
    idNext: string | null | undefined;
    dateCreated: Date;
}

export const MapViewModelFromProductModel = (model: ProductModel, idNext: string | null | undefined)
    : ProductViewModel => {
    return {
        ...model,
        idNext: idNext,
        dateCreated: new Date(model.createdAt)
    }
}