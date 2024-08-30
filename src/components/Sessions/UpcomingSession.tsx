import { SavedSessionData } from "../../store/sessions-context";
import Button from "../UI/Button";

type UpcomingSessionProps = {
    sessionData: SavedSessionData;
    onCancelSession: (id: string) => void;
};

export default function UpcomingSession({ sessionData, onCancelSession }: UpcomingSessionProps) {
    return (<div className="upcoming-session">
        <div>
            <h3>{sessionData.title}</h3>
            <p>{sessionData.summary}</p>
            {sessionData.userName && <p>{`Student: ${sessionData.userName}`}</p>}
            <time dateTime={new Date(sessionData.date).toISOString()}>
              {new Date(sessionData.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
        </div>
        <div className="actions">
            <Button textOnly onClick={() => { onCancelSession(sessionData.id) }}>Cancel</Button>
        </div>
    </div>);
};
