export function GenerateSubCoordinates () {
    const subX = (Math.floor(Math.random() * 10));
    const subY = (Math.floor(Math.random() * 99));

    return [subX, subY];
}

export function GenerateExitCoordinates () {
    const subY = (Math.ceil(Math.random() * 99));
    const subX = 90 + (Math.ceil(Math.random() * 10));

    return [subX, subY];
}

export function generateMineCoordinates () {
    const MineX = (Math.floor(Math.random() * 99));
    const MineY = (Math.floor(Math.random() * 99));

    return [MineX, MineY];
}

export function isWithinRange(value1, value2, range) {
    if (Math.abs(value1 - value2) <= range) return true;
    else {
        return false;
    }
}

export function collision(obj1, obj2, range) {
    return (isWithinRange(obj1.x, obj2.x, range) && isWithinRange(obj1.y, obj2.y, range));
}

export function move(direction, sub, amount) {
    if(sub.x) {
        console.log(sub);
        if(direction === "right") sub.x += amount;
        if(direction === "left") sub.x -= amount;
        if(direction === "up") sub.y -= amount;
        if(direction === "down") sub.y += amount;
        console.log(sub);
    
    }
}

