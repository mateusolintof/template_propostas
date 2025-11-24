import { db } from "./firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Proposal, defaultProposal } from "../types/proposal";

export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
    if (!db) {
        // Demo Mode
        if (slug === "demo" || slug === "exemplo") return defaultProposal;
        return null;
    }
    try {
        const q = query(collection(db, "proposals"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return null;
        }

        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Proposal;
    } catch (error) {
        console.error("Error getting proposal:", error);
        return null;
    }
}

export async function getProposalById(id: string): Promise<Proposal | null> {
    if (!db) return defaultProposal; // Demo Mode
    try {
        const docRef = doc(db, "proposals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Proposal;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting proposal by ID:", error);
        return null;
    }
}

export async function getAllProposals(): Promise<Proposal[]> {
    if (!db) {
        // Demo Mode - Return a list with the default proposal
        return [{ ...defaultProposal, id: "demo-id" }];
    }
    try {
        const querySnapshot = await getDocs(collection(db, "proposals"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Proposal));
    } catch (error) {
        console.error("Error getting all proposals:", error);
        return [];
    }
}
