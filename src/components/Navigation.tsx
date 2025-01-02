import React from "react";
import Link from "next/link";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/add-yarn">Add Yarn</Link>
                </li>
                <li>
                    <Link href="/">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
