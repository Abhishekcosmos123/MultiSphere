import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createProductRequest,
    createProductSuccess,
    createProductFailure,
} from '../slices/productSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateProductResponse, productService } from "@/lib/api/services/productService";

function* handleCreateProduct(action: PayloadAction<FormData>) {
    try {
        const response: CreateProductResponse = yield call(productService.createProduct, action.payload);
        yield put(createProductSuccess(response.product_id));
    } catch (error: any) {
        yield put(createProductFailure(error?.response?.data?.message || 'Something went wrong'));
    }
}

export default function* productSaga() {
    yield takeLatest(createProductRequest.type, handleCreateProduct);
}