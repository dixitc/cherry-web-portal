const initTitle = 'Memories';
const titleReducer = (state=initTitle,action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return action.title;
            break;
        default:
        return state;
    }
}

export { titleReducer };
