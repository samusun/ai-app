export const initialValues = {
  step: 0,
  Age: "",
  Goal: "",
  Physiqe: "",
  Deadline: "",
  DaysPerWeek: "",
};

export const onboardingReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        step: state.step + 1,
      };
    case "PREV_STEP":
      return {
        ...state,
        step: state.step - 1,
      };
    case "SET_INPUT":
      return { ...state, [action.id]: action.input, step: state.step + 1 };
    default:
      return state;
  }
};

// case "SET_AGE":
//     return {
//       ...state,
//       age: action.payload,
//     };
//   case "SET_GOAL":
//     return {
//       ...state,
//       goal: action.payload,
//     };
//   case "SET_PHYSIQE":
//     return {
//       ...state,
//       physiqe: action.payload,
//     };
//   case "SET_DEADLINE":
//     return {
//       ...state,
//       deadline: action.payload,
//     };
//   case "SET_DAYS_PER_WEEK":
//     return {
//       ...state,
//       daysPerWeek: action.payload,
//     };
//   default:
//     return state;
