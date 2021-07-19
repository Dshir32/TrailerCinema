import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";

export function reduce(oldAppState: AppState, action: Action): AppState {

    const newAppState = {...oldAppState };

    switch (action.type) {

        case ActionType.getUser:
            // newAppState.user.push(action.payload);
            newAppState.user = action.payload;
            break;

        default: break;
    
    }

    return newAppState;
}
