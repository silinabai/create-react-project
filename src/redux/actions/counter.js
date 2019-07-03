
// export const INCREMENT = 'counter/INCREMENT';
// export const DECREMENT = 'counter/DECREMENT';
// export const RESET = 'counter/RESET';
//
// export function increment() {
//     return {
//         type: INCREMENT
//     };
// };
//
// export function decrement() {
//     return {type: DECREMENT};
// }
//
// export function reset() {
//     return {type: RESET};
// }

export const increaseType = 'increase';
export const decreaseType = 'decrease';

export const increase = () => {
    return {
        type: increaseType
    };
};

export const decrease = () => {
    return {
        type: decreaseType
    };
};
