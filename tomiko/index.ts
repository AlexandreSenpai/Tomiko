import { Tomiko } from "./src/infra/entrypoints/discord";

const tomiko = new Tomiko();

tomiko.listen().then(() => {
    console.log('Starting Tomiko.');
});