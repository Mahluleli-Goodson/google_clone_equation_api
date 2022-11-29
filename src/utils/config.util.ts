/**
 * Class wraps all configuration related settings e.g: we are currently using dotenv
 */
class ConfigUtil {
    public static get = (envVar: string) => {
        return process.env?.[envVar];
    };
}

const configUtil = ConfigUtil;

export default configUtil;
