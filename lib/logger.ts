export const logger = (type: string, msg: string) => {
    if (type === 'error') {
        console.error('Something went wrong: ', msg);
    } else {
        console.log(msg);
    }
}