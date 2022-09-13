export function getExercises(n) {
    
    const activity = ["10x squats", "5x push-ups", "20x crunches", "30x star jumps",  "10x lunges", "15x bridges", "a 30s plank"];
    const stretch = ["ankle stretches", "shoulder stretches", "back stretches", "knee stretches", "hip stretches", "neck stretches", "wrist stretches"]
    
    return {activity: activity[n % activity.length], stretch: stretch[ n % stretch.length]};
};

export function getMessage(n){
    const message = ["Lets Go!", "Time to move!", "Your Break Exercises are..."]
    return message[n % message.length];
};

export function getImage(n){
    const image = ["cactus", "coffee-cup", "crab", "dinosaur", "french-fries", "octopus", "penguin", "pineapple", "rainbow"]
    return image[n % image.length];
};


