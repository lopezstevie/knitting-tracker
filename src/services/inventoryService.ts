import { doc, updateDoc, arrayUnion, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { YarnInventory } from '@/models/YarnInventory';
import { YarnPurchase } from '@/models/YarnPurchase';

/**
 * Add a new yarn to the inventory collection.
 */
export const addYarnToInventory = async (yarn: Omit<YarnInventory, "id">): Promise<YarnInventory> => {
    try {
        console.log("Submitting Yarn Data:", yarn);

        // Add the yarn to Firestore without an ID initially
        const docRef = await addDoc(collection(db, "yarn_inventory"), yarn);

        // Update the yarn document with the generated ID
        const id = docRef.id;
        await updateDoc(docRef, { id });

        console.log("Yarn added with ID: ", id);

        return { ...yarn, id }; // Return the updated yarn object with ID
    } catch (error) {
        console.error("Error adding yarn to inventory: ", error);
        throw error;
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

/**
 * Fetch all yarns from the yarn_inventory collection
 */
export const fetchYarnInventory = async (): Promise<YarnInventory[]> => {
    try {
        const yarnCollection = collection(db, "yarn_inventory");
        const yarnSnapshot = await getDocs(yarnCollection);

        const yarns = yarnSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(), // Ensure this includes all required fields of YarnInventory
        })) as YarnInventory[]; // Use type assertion if you're confident in the structure

        return yarns;
    } catch (error) {
        console.error("Error fetching yarn inventory: ", error);
        throw error;
    }
};
