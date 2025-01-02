import React from "react";
import Link from "next/link";

const Navigation = () => {
    return (
        <nav style={{ padding: "1rem", backgroundColor: "#FFEBF1", display: "flex", justifyContent: "space-between" }}>
            <ul style={{ display: "flex", gap: "1rem", listStyleType: "none", margin: 0 }}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/yarn-inventory">Yarn Inventory</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
