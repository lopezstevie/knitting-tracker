import React from "react";
import { Modal, Box } from "@mui/material";
import AddYarnForm from "./AddYarnForm";

const AddYarnModal = ({ 
    open,
    onClose,
    onYarnAdded
}: {
    open: boolean;
    onClose: () => void
    onYarnAdded: () => void;
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "80%", md: "50%", lg: "40%" }, // Responsive width
                    bgcolor: "#FFF1F4", // Soft pastel pink background
                    borderRadius: 12, // Rounded corners
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Softer shadow
                    p: { xs: 2, sm: 4 }, // Responsive padding
                    border: "2px solid #E7D8F5", // Subtle lavender border
                }}
            >
                <Box
                    sx={{
                        maxHeight: "70vh", // Set maximum height for modal content
                        overflowY: "auto", // Enable scrolling for overflowing content
                        pr: 1, // Padding to avoid scrollbar overlapping content
                        "&::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "#FFF1F4", // Match modal background
                            borderRadius: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#F9D3E0", // Solid pastel pink
                            borderRadius: "8px",
                            border: "2px solid #FFF1F4", // Matches the modal background
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#F5B8C6", // Slightly darker pastel pink on hover
                        },
                    }}
                >
                    <AddYarnForm onClose={onClose} onYarnAdded={onYarnAdded} />
                </Box>
            </Box>
        </Modal>
    );
};

export default AddYarnModal;
