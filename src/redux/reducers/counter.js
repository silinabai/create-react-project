import {increaseType, decreaseType} from '../actions/counter';

const initState = {
    count: 1
};

const counterFun = (state = initState, action) => {
    switch (action.type) {
        case increaseType:
            return {
                count: state.count + 1
            };
        case decreaseType:
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
};

export default counterFun;
