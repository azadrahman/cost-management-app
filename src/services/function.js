export function convertToyyyyMMdd(dateString) {
    const date = new Date(dateString),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
}