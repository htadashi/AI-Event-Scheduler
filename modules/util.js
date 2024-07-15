export function isAllDayEvent(dateString) {
    const allDayFormat = /^\d{8}$/;
    return allDayFormat.test(dateString);
}