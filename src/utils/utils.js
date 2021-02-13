export function GenerateSubCoordinates () {
    const subY = (Math.ceil(Math.random() * 100));
    const subX = (Math.ceil(Math.random() * 10));

    return [subX, subY];
}

export function GenerateExitCoordinates () {
    const subY = (Math.ceil(Math.random() * 100));
    const subX = 90 + (Math.ceil(Math.random() * 10));

    return [subX, subY];
}

export function generateMineCoordinates () {
    const MineX = (Math.ceil(Math.random() * 100));
    const MineY = (Math.ceil(Math.random() * 100));

    return [MineX, MineY];
}

export function isWithinRange(value1, value2, range) {
    if (Math.abs(value1 - value2) <= range) return true;
    return false;
}