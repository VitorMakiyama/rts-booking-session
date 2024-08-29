import { createContext, ReactNode, useContext, useReducer } from "react";
import { SessionItemData } from "../components/Sessions/SessionItem";

type SessionsState = {
    upcomingSessions: SessionItemData[];
}

type SessionsContextValue = SessionsState & {
    bookSession: (bookedSession: SessionItemData) => void;
    cancelSession: (sessionId: string) => void;
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
    payload: SessionItemData;
};
type CancelSessionAction = {
    type: "CANCEL_ACTION";
    sessionId: string;
};
type Action = BookSessionAction | CancelSessionAction;
function sessionsReducer(state: SessionsState, action: Action): SessionsState {
    if (action.type === "BOOK_ACTION") {
        return {
            upcomingSessions: [
                ...state.upcomingSessions,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    summary: action.payload.summary,
                    description: action.payload.description,
                    duration: action.payload.duration,
                    date: action.payload.date,
                    image: action.payload.image
                }
            ]
        };
    } else if (action.type === "CANCEL_ACTION") {
        return {
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
        bookSession(bookedSession: SessionItemData) {
            dispatch({type: "BOOK_ACTION", payload: bookedSession})
        },
        cancelSession(sessionId: string) {
            dispatch({type: "CANCEL_ACTION", sessionId: sessionId})
        },
    };

    return (
        <SessionsContext.Provider value={ctx}>
            {children}
        </SessionsContext.Provider>
    );
};
