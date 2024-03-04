import { credential } from "firebase-admin";
import { getApp, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';

export class Firestore {
    private readonly firebaseApp = getApps().length === 0 ? initializeApp({
        credential: credential.cert('/home/alexandresenpai/.credentials/gcp/catherine.json')
    }) : getApp();

    private readonly firestore = getFirestore();

    async get(world: string): Promise<any> {
        const worldsCollection = this.firestore.collection('tomiko').doc('worlds').collection('available').doc(world?.split(' ')?.join('-')?.toLowerCase());
        const found = await worldsCollection.get();
        if(found.exists) return found.data();
        return null;
    }

    async list(): Promise<any[]> {

        const worldsCollection = this.firestore.collection('tomiko').doc('worlds').collection('available');
        const fetch = await worldsCollection.get();

        return fetch.docs.map(world => {
            const data = world.data();
            return { name: data.name, genre: data.genre };
        });
    }
}

