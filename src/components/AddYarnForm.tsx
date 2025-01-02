"use client";

import React, { useState } from "react";
import { addYarnToInventory, addPurchaseAndLink } from "@/services/inventoryService";

interface FiberContent {
    fiber: string;
    percentage: number;
}

const AddYarnForm = () => {
    const [yarnData, setYarnData] = useState<{
        brand: string;
        name: string;
        color: string;
        weight: string;
        fiber_content: FiberContent[];
        yards_per_ball: number;
        remaining_yards: number;
        total_yards_used: number;
        total_spent: number;
    }>({
        brand: "",
        name: "",
        color: "",
        weight: "",
        fiber_content: [],
        yards_per_ball: 0,
        remaining_yards: 0,
        total_yards_used: 0,
        total_spent: 0,
    });    

    const [purchaseData, setPurchaseData] = useState({
        quantity: 0,
        cost_per_ball: 0,
        date_purchased: "",
    });

    const [newFiber, setNewFiber] = useState<FiberContent>({ fiber: "", percentage: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addFiber = () => {
        if (!newFiber.fiber || newFiber.percentage <= 0 || newFiber.percentage > 100) {
            alert("Please enter a valid fiber and percentage (1-100).");
            return;
        }
    
        setYarnData((prev) => ({
            ...prev,
            fiber_content: [...prev.fiber_content, { ...newFiber }],
        }));
    
        // Clear the temporary input fields
        setNewFiber({ fiber: "", percentage: 0 });
    };    

    const handleYarnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setYarnData((prev) => ({
            ...prev,
            [name]: ["yards_per_ball"].includes(name) ? Number(value) : value,
        }));
    };

    const handlePurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPurchaseData((prev) => ({
            ...prev,
            [name]: ["quantity", "cost_per_ball"].includes(name) ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) {
            console.warn("Form already submitted, skipping...");
            return;
        }

        setIsSubmitting(true);

        try {
            const yarn = {
                ...yarnData,
                total_yards_used: 0,
                remaining_yards: Number(purchaseData.quantity) * Number(yarnData.yards_per_ball),
                total_spent: Number(purchaseData.quantity) * Number(purchaseData.cost_per_ball),
                purchase_ids: [],
            };

            console.log("Submitting Yarn Data:", yarn);
            const yarnRef = await addYarnToInventory(yarn);

            const purchase = {
                yarn_id: yarnRef.id,
                quantity: Number(purchaseData.quantity),
                cost_per_ball: Number(purchaseData.cost_per_ball),
                total_cost: Number(purchaseData.quantity) * Number(purchaseData.cost_per_ball),
                date_purchased: new Date(purchaseData.date_purchased),
            };

            console.log("Submitting Purchase Data:", purchase);
            await addPurchaseAndLink(yarnRef.id, purchase);
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Yarn</h3>
            <div>
                <label>Brand:</label>
                <input type="text" name="brand" value={yarnData.brand} onChange={handleYarnChange} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={yarnData.name} onChange={handleYarnChange} required />
            </div>
            <div>
                <label>Color:</label>
                <input type="text" name="color" value={yarnData.color} onChange={handleYarnChange} required />
            </div>
            <div>
                <label>Weight:</label>
                <input type="text" name="weight" value={yarnData.weight} onChange={handleYarnChange} required />
            </div>
            <div>
                <label>Fiber Content:</label>
                <div>
                    <label>Fiber Name:</label>
                    <input
                        type="text"
                        name="fiber"
                        value={newFiber.fiber}
                        onChange={(e) => setNewFiber({ ...newFiber, fiber: e.target.value })}
                        required={yarnData.fiber_content.length === 0} // Required only if no fibers added
                    />
                </div>
                <div>
                    <label>Percentage:</label>
                    <input
                        type="number"
                        name="percentage"
                        value={newFiber.percentage}
                        onChange={(e) => setNewFiber({ ...newFiber, percentage: Number(e.target.value) })}
                        required={yarnData.fiber_content.length === 0} // Required only if no fibers added
                    />
                </div>
                <button type="button" onClick={addFiber}>
                    Add Fiber
                </button>
                <ul>
                    {yarnData.fiber_content.map((fiber, index) => (
                        <li key={index}>
                            {fiber.fiber}: {fiber.percentage}%
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Yards per Ball:</label>
                <input type="number" name="yards_per_ball" value={yarnData.yards_per_ball} onChange={handleYarnChange} required />
            </div>
            <h3>Initial Purchase</h3>
            <div>
                <label>Quantity:</label>
                <input type="number" name="quantity" value={purchaseData.quantity} onChange={handlePurchaseChange} required />
            </div>
            <div>
                <label>Cost per Ball:</label>
                <input type="number" name="cost_per_ball" value={purchaseData.cost_per_ball} onChange={handlePurchaseChange} required />
            </div>
            <div>
                <label>Date Purchased:</label>
                <input type="date" name="date_purchased" value={purchaseData.date_purchased} onChange={handlePurchaseChange} required />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Yarn..." : "Add Yarn"}
            </button>
        </form>
    );
};

export default AddYarnForm;
