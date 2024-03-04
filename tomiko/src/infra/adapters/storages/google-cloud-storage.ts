// import { IStorage } from "../../core/interfaces/storage.base";
// import { Storage } from "@google-cloud/storage";

// export class GoogleCloudStorage implements IStorage {
    
//     private readonly storage = new Storage({
//         keyFile: '~/.credentials/gcp/catherine.json'
//     })

//     async read(): Promise<string[]> {
//         const files = await this.storage.bucket('mapas-do-minecraft').get({
//             prefix: 'worlds/'
//         });
//         console.log(files)
//         return files[0].map(file => file.name);
//     }
// }