import React from 'react';
import AddYarnForm from '@/components/AddYarnForm';

const AddYarnPage = () => {
    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1>Add Yarn</h1>
            <AddYarnForm />
        </div>
    );
};

export default AddYarnPage;
