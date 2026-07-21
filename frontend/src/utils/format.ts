export const getTimeInSeconds = (time_ms: number) => {
    return time_ms / 1000;
};

export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
};