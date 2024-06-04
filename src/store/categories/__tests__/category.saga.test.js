import { call } from "typed-redux-saga/macro";
import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import { fetchCategoriesAsync, onFetchCatgeories, categoriesSaga } from "../category.saga";

import { CATEGORIES_ACTION_TYPES } from "../category.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "../category.action";

describe('category sagas', ()=>{
    test('categoriesSaga', ()=>{
        testSaga(categoriesSaga)
        .next()
        .all([call(onFetchCatgeories)])
        .next()
        .isDone()
    });

    test('onFetchCategories', ()=>{
        testSaga(onFetchCatgeories)
        .next()
        .takeLatest(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
        )
        .next()
        .isDone();
    })

    test('fetchCategoriesAsync success', ()=>{
        const mockCategoriesArray = [
            {id: 1, name: 'Category 1'},
            {id: 2, name: 'Category 2'},
        ]
        return expectSaga(fetchCategoriesAsync)
        .provide([
            [call(getCategoriesAndDocuments), mockCategoriesArray]
        ])
        .put(fetchCategoriesSuccess(mockCategoriesArray))
        .run()
    });
    test('fetchCategoriesAsync failure', ()=>{
        const mockError = new Error('An error ocurred');

        return expectSaga(fetchCategoriesAsync)
        .provide([
            call(getCategoriesAndDocuments), throwError(mockError)
        ])
        .put(fetchCategoriesFailed(mockError))
        .run();
    })
})