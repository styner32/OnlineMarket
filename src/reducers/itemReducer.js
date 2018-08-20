export default function itemReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_ITEM_SUCCESS':
      state.push(action.item);
      return [...state,
        Object.assign({}, action.item),
      ];

    default:
      return state;
  }
}
