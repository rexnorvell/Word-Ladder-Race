export const getTimeInSeconds = (time_ms: number) => {
    return time_ms / 1000;
};

export const formatDate = (timestamp: string) => {
    const [year, month, day] = timestamp.split(" ")[0].split("-");
    return `${month}/${day}/${year}`;
};