"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography, Box, CardContent, CardActions } from "@mui/material";
import AddYarnModal from "@/components/AddYarnModal";
import { fetchYarnInventory } from "@/services/inventoryService";
import { YarnInventory } from "@/models/YarnInventory";

const YarnInventoryPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [yarns, setYarns] = useState<YarnInventory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const loadYarns = async () => {
        try {
            setIsLoading(true);
            const data = await fetchYarnInventory();
            setYarns(data);
        } catch (error) {
            console.error("Error fetching yarn inventory: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadYarns();
    }, []);

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#6A5ACD",
                    fontWeight: 600,
                    marginBottom: "1rem",
                }}
            >
                Yarn Inventory
            </Typography>

            <Typography
                variant="body1"
                sx={{ fontFamily: "'Poppins', sans-serif", marginBottom: "2rem" }}
            >
                Manage your yarn inventory. Use the button below to add new yarn to your inventory.
            </Typography>

            <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                    backgroundColor: "#FF6F61",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#FF867F" },
                }}
            >
                Add Yarn
            </Button>

            <AddYarnModal open={isModalOpen} onClose={handleCloseModal} onYarnAdded={loadYarns} />

            {isLoading ? (
                <Typography>Loading yarn inventory...</Typography>
            ) : yarns.length === 0 ? (
                <Typography>No yarns found. Add some to your inventory!</Typography>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "16px",
                        marginTop: "2rem",
                    }}
                >
                    {yarns.map((yarn) => (
                        <Box
                            key={yarn.id}
                            sx={{
                                background: "#FFF5F8",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                overflow: "hidden",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 600, color: "#6A5ACD" }}
                                >
                                    {yarn.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {yarn.brand}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {yarn.color}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Weight: {yarn.weight}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Remaining Yards: {yarn.remaining_yards}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Total Spent: ${yarn.total_spent}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Fibers:
                                </Typography>
                                <ul>
                                    {yarn.fiber_content.map(
                                        (
                                            fiber: { fiber: string; percentage: number },
                                            index: number
                                        ) => (
                                            <li key={index}>
                                                {fiber.fiber}: {fiber.percentage}%
                                            </li>
                                        )
                                    )}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button size="small" sx={{ color: "#6A5ACD" }}>
                                    View Details
                                </Button>
                            </CardActions>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default YarnInventoryPage;
