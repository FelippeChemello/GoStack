import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
    id: string;
    title: string;
    image_url: string;
    price: number;
    quantity: number;
}

interface CartContext {
    products: Product[];
    addToCart(item: Omit<Product, 'quantity'>): void;
    increment(id: string): void;
    decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            const productsLoaded = await AsyncStorage.getItem(
                '@GoMarketplace:products',
            );

            if (productsLoaded) {
                setProducts(JSON.parse(productsLoaded));
            }
        }

        loadProducts();
    }, []);

    const addToCart = useCallback(async product => {
        let productIsAlreadyInCart = false;

        for (let i = 0; i < products.length; i++) {
            if (product.id === products[i].id) {
                products[i].quantity++;

                productIsAlreadyInCart = true;
            }
        }

        if (!productIsAlreadyInCart) {
            product.quantity = 1;

            products.push(product);
        }

        await AsyncStorage.setItem(
            '@GoMarketplace:products',
            JSON.stringify(products),
        );

        setProducts([...products]);
    }, []);

    const increment = useCallback(async id => {
        for (let i = 0; i < products.length; i++) {
            if (id === products[i].id) {
                products[i].quantity++;
            }
        }

        await AsyncStorage.setItem(
            '@GoMarketplace:products',
            JSON.stringify(products),
        );

        setProducts([...products]);
    }, []);

    const decrement = useCallback(async id => {
        for (let i = 0; i < products.length; i++) {
            if (id === products[i].id) {
                products[i].quantity--;

                if (products[i].quantity == 0) {
                    products.splice(i, 1);
                }
            }
        }

        await AsyncStorage.setItem(
            '@GoMarketplace:products',
            JSON.stringify(products),
        );

        setProducts([...products]);
    }, []);

    const value = React.useMemo(
        () => ({ addToCart, increment, decrement, products }),
        [products, addToCart, increment, decrement],
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

function useCart(): CartContext {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(`useCart must be used within a CartProvider`);
    }

    return context;
}

export { CartProvider, useCart };
