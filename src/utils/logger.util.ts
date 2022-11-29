import logger from "pino";
import dayjs from "dayjs";
import appUtil from "./application.util";

const logUtil = appUtil?.activateLogger ?
    logger({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        },
        base: {
            pid: false,
        },
        timestamp: () => `,"time":"${dayjs().format()}"`,
    }) :
    undefined;

export default logUtil;
