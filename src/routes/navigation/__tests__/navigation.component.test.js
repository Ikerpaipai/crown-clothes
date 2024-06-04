import { screen, fireEvent } from "@testing-library/react";
import * as reactRedux from 'react-redux'

import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { signOutStart } from "../../../store/user/user.action";

describe('Navigation tests', ()=>{
    test('It should render a Sign in link and not a Sign Out Link if there is no currentUser', ()=>{
        renderWithProviders(<Navigation />, {
            preloadState: {
                user: {
                    currentUser: null,
                }
            }
        })

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeNull()
    });

    test('It should not render Sign Out link and not Sign in link if there is no currentUser', ()=>{
        renderWithProviders(<Navigation />, {
            preloadState: {
                user: {
                    currentUser: {}
                }
            }
        })
        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeNull()

        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();
    })

    test('It should render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<Navigation />, {
            preloadState: {
                cart: {
                    isCartOpen: false,
                    cartItems: []
                }
            }
        })
        const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeNull();
    })

    test('It should render a cart dropdown if CartOpen is true', ()=>{
        renderWithProviders(<Navigation />, {
            preloadState: {
                cart: {
                    isCartOpen: true,
                    cartItems : []
                }
            }
        })
        const dropdownTextElement = screen.getByText(/Your cart is empty/i);
        expect(dropdownTextElement).toBeInTheDocument();
    });

    test('it should dispatch signOutStart action when clicking on the Sign Out Llink', async ()=>{
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);

        renderWithProviders(<Navigation />, {
            preloadState: {
                user: {
                    currentUser: {}
                }
            }
        })
        const signOutLinkElement = screen.getByText(/sign out/i);
        expect(signOutLinkElement).toBeInTheDocument();

        await fireEvent.click(signOutLinkElement);
        expect(mockDispatch).toHaveBeenCalled();

        const signOutAction = signOutStart()
        expect(mockDispatch).toHaveBeenCalledWith(signOutAction);

        mockDispatch.mockClear();
    })
})