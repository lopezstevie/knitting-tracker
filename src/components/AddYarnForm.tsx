import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addYarnToInventory, addPurchaseAndLink } from "@/services/inventoryService";

const AddYarnForm = ({ onClose }: { onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [yarnData, setYarnData] = useState({
        brand: "",
        name: "",
        color: "",
        weight: "",
        fiber_content: [{ fiber: "", percentage: 0 }],
        yards_per_ball: 0,
    });

    const [purchaseData, setPurchaseData] = useState({
        quantity: 0,
        cost_per_ball: 0,
        date_purchased: "",
    });

    const handleYarnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setYarnData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFiberChange = (index: number, field: string, value: string | number) => {
        const updatedFiberContent = [...yarnData.fiber_content];
        updatedFiberContent[index] = { ...updatedFiberContent[index], [field]: value };
        setYarnData((prev) => ({ ...prev, fiber_content: updatedFiberContent }));
    };

    const addFiberField = () => {
        setYarnData((prev) => ({
            ...prev,
            fiber_content: [...prev.fiber_content, { fiber: "", percentage: 0 }],
        }));
    };

    const removeFiberField = (index: number) => {
        const updatedFiberContent = yarnData.fiber_content.filter((_, i) => i !== index);
        setYarnData((prev) => ({ ...prev, fiber_content: updatedFiberContent }));
    };

    const handlePurchaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPurchaseData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) {
            console.warn("Form already submitted, skipping...");
            return;
        }

        setIsSubmitting(true);

        try {
            const calculatedRemainingYards = purchaseData.quantity * yarnData.yards_per_ball;
            const calculatedTotalSpent = purchaseData.quantity * purchaseData.cost_per_ball;

            const yarn = {
                ...yarnData,
                fiber_content: yarnData.fiber_content.map((fiber) => ({
                    fiber: fiber.fiber,
                    percentage: fiber.percentage,
                })),
                total_yards_used: 0,
                remaining_yards: calculatedRemainingYards,
                total_spent: calculatedTotalSpent,
                purchase_ids: [],
            };

            const yarnRef = await addYarnToInventory(yarn);

            const purchase = {
                yarn_id: yarnRef.id,
                quantity: purchaseData.quantity,
                cost_per_ball: purchaseData.cost_per_ball,
                total_cost: calculatedTotalSpent,
                date_purchased: new Date(purchaseData.date_purchased),
            };

            await addPurchaseAndLink(yarnRef.id, purchase);

            onClose();
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 4,
                background: "#F8F8FF", // Soft lavender background
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                maxWidth: 500,
                margin: "auto",
                fontFamily: "'Poppins', sans-serif",
                border: "2px solid #EAEAEA", // Subtle border
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#6A5ACD", // Lavender text
                }}
            >
                Add New Yarn
            </Typography>
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Brand"
                    name="brand"
                    value={yarnData.brand}
                    onChange={handleYarnChange}
                    fullWidth
                    required
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            background: "#FFF5E1", // Pastel yellow
                        },
                    }}
                />
                <TextField
                    label="Name"
                    name="name"
                    value={yarnData.name}
                    onChange={handleYarnChange}
                    fullWidth
                    required
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            background: "#EAF8FF", // Pastel blue
                        },
                    }}
                />
                <TextField
                    label="Color"
                    name="color"
                    value={yarnData.color}
                    onChange={handleYarnChange}
                    fullWidth
                    required
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            background: "#FFE4E1", // Pastel coral
                        },
                    }}
                />
                <TextField
                    label="Weight"
                    name="weight"
                    value={yarnData.weight}
                    onChange={handleYarnChange}
                    fullWidth
                    required
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            background: "#E1FFF6", // Pastel mint
                        },
                    }}
                />
            </Box>

            <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                    fontWeight: 500,
                    color: "#FF6F61", // Coral
                }}
            >
                Fiber Content
            </Typography>
            {yarnData.fiber_content.map((fiber, index) => (
                <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        label="Fiber Name"
                        value={fiber.fiber}
                        onChange={(e) => handleFiberChange(index, "fiber", e.target.value)}
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                background: "#FFF5E1", // Light yellow
                            },
                        }}
                    />
                    <TextField
                        label="Percentage"
                        value={fiber.percentage}
                        type="number"
                        onChange={(e) => handleFiberChange(index, "percentage", Number(e.target.value))}
                        fullWidth
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                background: "#FCEEFF", // Light lavender
                            },
                        }}
                    />
                    <IconButton
                        onClick={() => removeFiberField(index)}
                        disabled={yarnData.fiber_content.length === 1} // Disable if only one fiber
                        sx={{ color: "#FF6F61" }}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <IconButton
                        onClick={addFiberField}
                        sx={{ color: "#FFD700" }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            ))}

            <TextField
                label="Yards per Ball"
                name="yards_per_ball"
                value={yarnData.yards_per_ball}
                onChange={handleYarnChange}
                type="number"
                fullWidth
                required
                sx={{
                    mt: 2,
                    "& .MuiOutlinedInput-root": {
                        background: "#EAF8FF", // Light blue
                    },
                }}
            />

            <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 3, fontWeight: 500, color: "#6A5ACD" }}
            >
                Initial Purchase
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Quantity"
                    name="quantity"
                    value={purchaseData.quantity}
                    onChange={handlePurchaseChange}
                    type="number"
                    fullWidth
                    required
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            background: "#FFF5E1", // Light yellow
                        },
                    }}
                />
                <TextField
                    label="Cost per Ball"
                    name="cost_per_ball"
                    value={purchaseData.cost_per_ball}
                    onChange={handlePurchaseChange}
                    type="number"
                    fullWidth
                    required
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            background: "#FCEEFF", // Light lavender
                        },
                    }}
                />
            </Box>
            <TextField
                label="Date Purchased"
                name="date_purchased"
                value={purchaseData.date_purchased}
                onChange={handlePurchaseChange}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                        background: "#E1FFF6", // Light mint
                    },
                }}
            />

            <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isSubmitting}
                sx={{
                    backgroundColor: "#FF6F61",
                    color: "white",
                    fontWeight: 600,
                    padding: "10px",
                    "&:hover": {
                        backgroundColor: "#FF867F",
                    },
                }}
            >
                {isSubmitting ? "Adding Yarn..." : "Add Yarn"}
            </Button>
        </Box>
    );
};

export default AddYarnForm;
