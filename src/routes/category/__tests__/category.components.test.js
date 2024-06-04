import { screen } from "@testing-library/react";

import Category from "../category.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock('react-router-dom', ()=>({
    ...jest.requireActual('react-router-dom'),
    useParams: ()=>({
        category: 'mens',
    })
}))

describe('Category tests', ()=>{
    test('It should render a Spinner if isLoading is true', ()=>{
        renderWithProviders(<Category />, {
            preloadState: {
                categories: {
                    isLoading: true,
                    category: []
                }
            }
        })
        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument()
    })

    test('It should render products is false and there are items present', ()=>{
        renderWithProviders(<Category />, {
            preloadState: {
                categories: {
                    isLoading: false,
                    category: [
                        {
                            title: 'mens',
                            items: [
                                {id: 1, name: 'Product 1'},
                                {id: 2, name: 'Product 2'}
                            ]
                        }
                    ]
                }
            }
        })
        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeNull();

        const productElement = screen.getByText(/product 1/i)
        expect(productElement).toBeInTheDocument();
    })
})