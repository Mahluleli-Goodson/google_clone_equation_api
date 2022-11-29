import configUtil from "./config.util";
import express from "express";
import routes from "../routes/routes";

/**
 * Unlike the ConfigUtil, this class consists of functions relating to the app AFTER it has been bootstrapped
 */
class ApplicationUtil {
    public isProduction = configUtil.get("ENV")?.toLowerCase() == "prod";
    public activateLogger = configUtil.get("ACTIVATE_LOGGER")?.toLowerCase() == "true";
    public apiKey = configUtil.get("API_KEY");

    public createServer = () => {
        const app = express();
        app.use(express.json());
        routes(app);

        return app;
    }
}

const appUtil = new ApplicationUtil;

export default appUtil;
