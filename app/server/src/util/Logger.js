import winston from 'winston';

const customFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
        // print log trace
        return `${timestamp} ${level}: ${message} - ${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
        new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.mmm" }),
        winston.format.colorize(),
        customFormat
    )
});

const log = (message, severity, overwriteConfig = false) => {
    const loggerActive = process.env.LOGGER;

    if (loggerActive == 'false' && !overwriteConfig) return;

    switch (severity) {
        case 'info': 
            logger.info(`... ${message} ...`);
            break;

        case 'warn':
            logger.warn(`... ${message} ...`);            
            break;
        
        case 'error':
            logger.error(`... ${message} ...`);
            break;
    }


}

export {log};

export default logger;
