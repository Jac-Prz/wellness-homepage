const today = () => {
    
    const today = new Date().toLocaleDateString("en-GB").replaceAll("/", "");

    return today;
}

export default today;