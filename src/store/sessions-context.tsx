import { createContext, ReactNode, useContext, useReducer } from "react";
import { SessionItemData } from "../components/Sessions/SessionItem";

// This type allows us to use the user name and email input during the booking of an session
export type SavedSessionData = SessionItemData & {
    userName: string;
    userEmail: string;
};

type SessionsState = {
    upcomingSessions: SavedSessionData[];
}

type SessionsContextValue = SessionsState & {
    bookSession: (bookedSession: SavedSessionData) => void;
    cancelSession: (sessionId: string) => void;
    isBooked: (sessionId: string) => boolean;
}

// creates a context that will be delivered by a hook
const SessionsContext = createContext<SessionsContextValue | null>(null);

// hook that delivers the context
export function useSessionsContext() {
    const ctx = useContext(SessionsContext);

    if (ctx == null) {
        throw new Error("Sessions Context is null, somethings really wrong!");
    }

    return ctx;
};

type SessionsContextProviderProps = {
    children: ReactNode;
};

type BookSessionAction = {
    type: "BOOK_ACTION";
    payload: SavedSessionData;
};
type CancelSessionAction = {
    type: "CANCEL_ACTION";
    sessionId: string;
};
type Action = BookSessionAction | CancelSessionAction;
function sessionsReducer(state: SessionsState, action: Action): SessionsState {
    if (action.type === "BOOK_ACTION") {
        if (state.upcomingSessions.find((session) => {return session.id === action.payload.id})) {
            return state
        }
        return {
            ...state,
            upcomingSessions: [
                ...state.upcomingSessions,
                {
                    ...action.payload
                }
            ]
        };
    } else if (action.type === "CANCEL_ACTION") {
        return {
            ...state,
            upcomingSessions: [
                ...state.upcomingSessions.filter((session) => {return session.id != action.sessionId})
            ]
        };
    }

    return state;
};

const initialState: SessionsState = {
    upcomingSessions: []
}

// usually we use an provider so the context is available to the application, and can be changed by other components
export default function SessionsContextProvider({ children }: SessionsContextProviderProps) {
    const [sessionsState, dispatch] = useReducer(sessionsReducer, initialState);

    const ctx: SessionsContextValue = {
        upcomingSessions: sessionsState.upcomingSessions,

        bookSession(bookedSession: SavedSessionData) {
            dispatch({type: "BOOK_ACTION", payload: bookedSession})
        },
        cancelSession(sessionId: string) {
            dispatch({type: "CANCEL_ACTION", sessionId: sessionId})
        },
        isBooked: (sessionId: string) => {
            return sessionsState.upcomingSessions.find((session) => {return session.id === sessionId}) != null
        }
    };

    return (
        <SessionsContext.Provider value={ctx}>
            {children}
        </SessionsContext.Provider>
    );
};
