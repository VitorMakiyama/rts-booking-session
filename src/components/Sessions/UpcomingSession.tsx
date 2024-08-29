import Button from "../UI/Button";
import { SessionItemData } from "./SessionItem";

type UpcomingSessionProps = {
    sessionData: SessionItemData;
    onCancelSession: (id: string) => void;
};

export default function UpcomingSession({ sessionData, onCancelSession }: UpcomingSessionProps) {
    return <div className="upcoming-session">
        <h3>{sessionData.title}</h3>
        <Button textOnly onClick={() => { onCancelSession(sessionData.id) }}>Cancel</Button>

        <p>{sessionData.summary}</p>
        <time>{sessionData.date}</time>
    </div>
};
