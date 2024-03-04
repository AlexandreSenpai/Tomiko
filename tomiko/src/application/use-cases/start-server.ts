import axios from "axios";
import { Firestore } from "../../infra/adapters/repositories/firestore-repository";

export class StartServerUseCase {

    constructor(private firestore: Firestore) {}

    public async execute(world: string) {
        
        const worldInformation = await this.firestore.get(world);

        if(worldInformation === null) return null; 

        const response = await axios.post(
            'https://start-minecraft-4bcquuskpq-ue.a.run.app/launch-minecraft', 
            {"world_uri": worldInformation.uri}, 
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    }
}