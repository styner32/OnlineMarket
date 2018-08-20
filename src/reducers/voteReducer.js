export default function voteReducer(state = [], action) {
  switch (action.type) {
    case 'UPVOTE_SUCCESS':
      state.push(action.item);
      return [...state,
        Object.assign({}, action.item),
      ];

    default:
      return state;
  }
}
