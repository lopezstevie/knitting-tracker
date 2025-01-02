import { doc, updateDoc, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { YarnInventory } from '@/models/YarnInventory';
import { YarnPurchase } from '@/models/YarnPurchase';

/**
 * Add a new yarn to the inventory collection.
 */
export const addYarnToInventory = async (yarn: YarnInventory) => {
    try {
        // Add the yarn to the Firestore `yarn_inventory` collection
        const docRef = await addDoc(collection(db, "yarn_inventory"), yarn);

        console.log("Yarn added with ID: ", docRef.id);
        return docRef; // Return the reference for further operations
    } catch (error) {
        console.error("Error adding yarn to inventory: ", error);
        throw error; // Rethrow the error for the calling code to handle
    }
};

/**
 * Add a new purchase to the `yarn_purchases` collection and update the linked `yarn_inventory` document.
 */
export const addPurchaseAndLink = async (
    yarnId: string,
    purchase: YarnPurchase
) => {
    try {
        console.log("Linking Purchase:", { yarnId, purchase });

        // Add the purchase to the `yarn_purchases` collection
        const purchaseRef = await addDoc(collection(db, "yarn_purchases"), {
            ...purchase,
            total_cost: purchase.quantity * purchase.cost_per_ball,
        });
        const purchaseId = purchaseRef.id;

        const yarnRef = doc(db, "yarn_inventory", yarnId);

        // Update only the `purchase_ids` field
        await updateDoc(yarnRef, {
            purchase_ids: arrayUnion(purchaseId),
        });

        console.log("Purchase linked successfully with ID:", purchaseId);
    } catch (error) {
        console.error("Error in addPurchaseAndLink:", error);
    }
};
