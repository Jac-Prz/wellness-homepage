const formatSeconds = (t) => {
    
    let format = "";

    if (t < 60) {
        format = t + "s";
    }
    if (t < 3600) {
        format = Math.floor(t / 60) + "m " + Math.floor(t % 60) + "s";
    } else {
        format = Math.floor(t / 3600) + "h " + Math.floor((t % 3600) / 60) + "m";
    };

    return format;
}

export default formatSeconds;