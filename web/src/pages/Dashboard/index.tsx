import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
    id: number;
    name: string;
    image: string;
    price: string;
    description: string;
    available: boolean;
}

const Dashboard: React.FC = () => {
    const [foods, setFoods] = useState<IFoodPlate[]>([]);
    const [editingFood, setEditingFood] = useState<IFoodPlate>(
        {} as IFoodPlate,
    );
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        async function loadFoods(): Promise<void> {
            api.get('/foods').then(response => {
                setFoods(response.data);
            });
        }

        loadFoods();
    }, []);

    async function handleAddFood(
        food: Omit<IFoodPlate, 'id' | 'available'>,
    ): Promise<void> {
        try {
            const { name, price, description, image } = food;

            const newPlate = await api.post('/foods', {
                name,
                price,
                description,
                image,
            });

            setFoods([...foods, newPlate.data]);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleUpdateFood(
        food: Omit<IFoodPlate, 'id' | 'available'>,
    ): Promise<void> {
        try {
            const { name, price, description, image } = food;
            const { id, available } = editingFood;

            api.put(`/foods/${id}`, {
                name,
                price,
                description,
                image,
                available,
            }).then(response => {
                const foodIndex = foods.findIndex(food => food.id === id);

                foods[foodIndex] = response.data;

                setFoods([...foods]);
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteFood(id: number): Promise<void> {
        try {
            await api.delete(`/foods/${id}`);

            const foodIndex = foods.findIndex(food => food.id === id);

            foods.splice(foodIndex, 1);

            setFoods([...foods]);
        } catch (err) {
            console.log(err);
        }
    }

    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal(): void {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: IFoodPlate): void {
        toggleEditModal();
        setEditingFood(food);
    }

    return (
        <>
            <Header openModal={toggleModal} />
            <ModalAddFood
                isOpen={modalOpen}
                setIsOpen={toggleModal}
                handleAddFood={handleAddFood}
            />
            <ModalEditFood
                isOpen={editModalOpen}
                setIsOpen={toggleEditModal}
                editingFood={editingFood}
                handleUpdateFood={handleUpdateFood}
            />

            <FoodsContainer data-testid="foods-list">
                {foods &&
                    foods.map(food => (
                        <Food
                            key={food.id}
                            food={food}
                            handleDelete={handleDeleteFood}
                            handleEditFood={handleEditFood}
                        />
                    ))}
            </FoodsContainer>
        </>
    );
};

export default Dashboard;
