export default function itemsReducer(state, action) {
    switch (action.type) {
        case 'INIT_ITEM':
            return InitializeItem(action);
        case 'CREATE_ITEM':
            return createItem(state, action);
        case 'UPDATE_ITEM':
            return updateItem(state, action);
        case 'DELETE_ITEM':
            return deleteItem(state, action);
		case 'SET_ITEM':
			return setItem(action);            
        default:
            throw new Error(`itemsReducer() unhandled action "${action.type}"`);
    }
}

function InitializeItem(action) {
    const newList = action.payload;
    return newList;
}
function createItem(state, action) {
    const [form, id] = action.payload;
    const newItem = { ...form, id: id };
    return [...state, newItem];
}

function updateItem(state, action) {
    const updatedItem = action.payload;
    const newState = [...state];
    const index = newState.findIndex((item) => item.id === updatedItem.id);
    newState[index] = updatedItem;
    return newState;
}

function deleteItem(state, action) {
    const id = action.payload;
    const newState = state.filter((item) => item.id !== id);
    return newState;
}

function setItem(action) {
	const newState = action.payload;
    return newState;
}
