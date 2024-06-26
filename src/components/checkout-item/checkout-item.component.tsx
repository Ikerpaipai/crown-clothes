import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import { CartItem } from '../../store/cart/cart.types';

import './checkout-item.styles.scss';

type CheckoutItemProps = {
    cartItem: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch();

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={()=>dispatch(removeItemFromCart(cartItems, cartItem))}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={()=>dispatch(addItemToCart(cartItems, cartItem))}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={()=>dispatch(clearItemFromCart(cartItems, cartItem))}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem