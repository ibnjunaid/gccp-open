import colors from 'colors';

const logger = {
    info: (message: string) => {
        console.log( 'INFO: ', colors.cyan( Date().toString() ), colors.green(message) );
    },
    warn: (message: string) => {
        console.warn( 'WARN: ', colors.cyan( Date().toString() ), colors.yellow(message) );
    },
    error: (message: string) => {
        console.error( 'ERROR', colors.cyan( Date().toString() ), colors.red(message) );
    }
}

export default logger;