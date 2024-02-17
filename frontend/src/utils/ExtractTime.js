export function extractTime(dateString){
    const date = new Date(dateString);
    const hour = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    return `${year}/${month}/${day} - ${hour}:${minutes}`;
}
function padZero(number){
    return number.toString().padStart(2,"0");
}