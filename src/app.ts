import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(async () => {
    main();
})();


async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    });
    Server.start();
}