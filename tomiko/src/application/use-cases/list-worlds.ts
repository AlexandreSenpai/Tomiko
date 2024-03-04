import { Firestore } from "../../infra/adapters/repositories/firestore-repository";

export class ListWorldsUseCase {

    constructor(private firestore: Firestore) {}

    public async execute() {
        return this.firestore.list();
    }
}