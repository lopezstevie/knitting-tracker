"use client";

import React, { useState } from "react";
import Link from "next/link";
import AddYarnModal from "./AddYarnModal";

const Navigation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <button onClick={handleOpenModal}>Add Yarn</button>
                </li>
            </ul>
            {isModalOpen && <AddYarnModal open={isModalOpen} onClose={handleCloseModal} />}
        </nav>
    );
};

export default Navigation;
