export function lerp(
    start: number,
    end: number,
    factor: number
) {
    return start + (end - start) * factor;
}