import dotenv from "dotenv";

dotenv.config();
import logUtil from "./utils/logger.util";
import configUtil from "./utils/config.util";
import appUtil from "./utils/application.util";

const port = configUtil.get("PORT");
const app = appUtil.createServer();

app.listen(port, async () => {
    logUtil?.info(`App is running on port: ${port}`);
});
