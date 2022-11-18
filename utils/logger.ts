import colors from 'colors';

const logger = {
    info: (message: any) => {
        console.log( 'INFO: ', colors.cyan( Date().toString() ), colors.green(message) );
    },
    warn: (message: any) => {
        console.warn( 'WARN: ', colors.cyan( Date().toString() ), colors.yellow(message) );
    },
    error: (message: any) => {
        console.error( 'ERROR', colors.cyan( Date().toString() ), colors.red(message) );
    }
}

export default logger;