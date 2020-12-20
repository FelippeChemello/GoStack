import React, {
    useEffect,
    useState,
    useCallback,
    useMemo,
    useLayoutEffect,
} from 'react';
import { Alert, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
    Container,
    Header,
    ScrollContainer,
    FoodsContainer,
    Food,
    FoodImageContainer,
    FoodContent,
    FoodTitle,
    FoodDescription,
    FoodPricing,
    AdditionalsContainer,
    Title,
    TotalContainer,
    AdittionalItem,
    AdittionalItemText,
    AdittionalQuantity,
    PriceButtonContainer,
    TotalPrice,
    QuantityContainer,
    FinishOrderButton,
    ButtonText,
    IconContainer,
} from './styles';

interface Params {
    id: number;
}

interface Extra {
    id: number;
    name: string;
    value: number;
    quantity: number;
}

interface Food {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    formattedPrice: string;
    extras: Extra[];
    category: number;
}

interface Favorite {
    id: number;
}

const FoodDetails: React.FC = () => {
    const [food, setFood] = useState({} as Food);
    const [extras, setExtras] = useState<Extra[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [foodQuantity, setFoodQuantity] = useState(1);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        async function loadFood(): Promise<void> {
            const response = await api.get(`foods/${routeParams.id}`);

            const foodInfo = response.data as Food;

            setFood(foodInfo);

            const extrasFormatted = foodInfo.extras.map(extra => {
                extra.quantity = 0;

                return extra;
            });

            setExtras(extrasFormatted);

            const favoritesResponse = await api.get('favorites');

            const favorites = favoritesResponse.data as Favorite[];

            setIsFavorite(
                Boolean(favorites.find(fav => fav.id === foodInfo.id)),
            );
        }

        loadFood();
    }, [routeParams]);

    function handleIncrementExtra(id: number): void {
        const extraIndex = extras.findIndex(e => e.id === id);

        extras[extraIndex].quantity++;

        setExtras([...extras]);
    }

    function handleDecrementExtra(id: number): void {
        const extraIndex = extras.findIndex(e => e.id === id);

        extras[extraIndex].quantity =
            extras[extraIndex].quantity <= 0
                ? 0
                : extras[extraIndex].quantity - 1;

        setExtras([...extras]);
    }

    function handleIncrementFood(): void {
        setFoodQuantity(oldState => oldState + 1);
    }

    function handleDecrementFood(): void {
        setFoodQuantity(oldState => (oldState > 1 ? oldState - 1 : oldState));
    }

    const toggleFavorite = useCallback(() => {
        const foodWithoutExtras = food;
        delete foodWithoutExtras.extras;

        try {
            if (isFavorite) {
                api.delete(`favorites/${food.id}`);
            } else {
                api.post('favorites', foodWithoutExtras);
            }

            setIsFavorite(!isFavorite);
        } catch {
            Alert.alert(
                'Ocorreu um erro ao adicionar aos favoritos, tente novamente',
            );
        }
    }, [isFavorite, food]);

    const cartTotal = useMemo(() => {
        return formatValue(
            foodQuantity * food.price +
                extras
                    .map(extra => extra.quantity * extra.value)
                    .reduce(
                        (totalExtra, currentExtra) => totalExtra + currentExtra,
                        0,
                    ),
        );
    }, [extras, food, foodQuantity]);

    async function handleFinishOrder(): Promise<void> {
        const order = {
            product_id: food.id,
            description: food.description,
            price: food.price,
            category: food.category,
            thumbnail_url: food.image_url,
            extras: food.extras.filter(extra => extra.quantity > 0),
        };

        try {
            await api.post('orders', order);
            Alert.alert('Pedido realizado com sucesso');

            navigation.navigate('Orders');
        } catch {
            Alert.alert('Ocorreu um erro ao salvar o pedido, tente novamente');
        }
    }

    // Calculate the correct icon name
    const favoriteIconName = useMemo(
        () => (isFavorite ? 'favorite' : 'favorite-border'),
        [isFavorite],
    );

    useLayoutEffect(() => {
        // Add the favorite icon on the right of the header bar
        navigation.setOptions({
            headerRight: () => (
                <MaterialIcon
                    name={favoriteIconName}
                    size={24}
                    color="#FFB84D"
                    onPress={() => toggleFavorite()}
                />
            ),
        });
    }, [navigation, favoriteIconName, toggleFavorite]);

    return (
        <Container>
            <Header />

            <ScrollContainer>
                <FoodsContainer>
                    <Food>
                        <FoodImageContainer>
                            <Image
                                style={{ width: 327, height: 183 }}
                                source={{
                                    uri: food.image_url,
                                }}
                            />
                        </FoodImageContainer>
                        <FoodContent>
                            <FoodTitle>{food.name}</FoodTitle>
                            <FoodDescription>
                                {food.description}
                            </FoodDescription>
                            <FoodPricing>{food.formattedPrice}</FoodPricing>
                        </FoodContent>
                    </Food>
                </FoodsContainer>
                <AdditionalsContainer>
                    <Title>Adicionais</Title>
                    {extras.map(extra => (
                        <AdittionalItem key={extra.id}>
                            <AdittionalItemText>
                                {extra.name}
                            </AdittionalItemText>
                            <AdittionalQuantity>
                                <Icon
                                    size={15}
                                    color="#6C6C80"
                                    name="minus"
                                    onPress={() =>
                                        handleDecrementExtra(extra.id)
                                    }
                                    testID={`decrement-extra-${extra.id}`}
                                />
                                <AdittionalItemText
                                    testID={`extra-quantity-${extra.id}`}
                                >
                                    {extra.quantity}
                                </AdittionalItemText>
                                <Icon
                                    size={15}
                                    color="#6C6C80"
                                    name="plus"
                                    onPress={() =>
                                        handleIncrementExtra(extra.id)
                                    }
                                    testID={`increment-extra-${extra.id}`}
                                />
                            </AdittionalQuantity>
                        </AdittionalItem>
                    ))}
                </AdditionalsContainer>
                <TotalContainer>
                    <Title>Total do pedido</Title>
                    <PriceButtonContainer>
                        <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
                        <QuantityContainer>
                            <Icon
                                size={15}
                                color="#6C6C80"
                                name="minus"
                                onPress={handleDecrementFood}
                                testID="decrement-food"
                            />
                            <AdittionalItemText testID="food-quantity">
                                {foodQuantity}
                            </AdittionalItemText>
                            <Icon
                                size={15}
                                color="#6C6C80"
                                name="plus"
                                onPress={handleIncrementFood}
                                testID="increment-food"
                            />
                        </QuantityContainer>
                    </PriceButtonContainer>

                    <FinishOrderButton onPress={() => handleFinishOrder()}>
                        <ButtonText>Confirmar pedido</ButtonText>
                        <IconContainer>
                            <Icon name="check-square" size={24} color="#fff" />
                        </IconContainer>
                    </FinishOrderButton>
                </TotalContainer>
            </ScrollContainer>
        </Container>
    );
};

export default FoodDetails;
