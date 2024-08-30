import { useEffect, useRef } from "react";
import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import UpcomingSession from "./UpcomingSession";
import { useSessionsContext } from "../../store/sessions-context";

type UpcomingSessionsProps = {
    onClose: () => void;
};

export default function UpcomingSessions({ onClose }: UpcomingSessionsProps) {
    const modal = useRef<ModalHandle>(null);

    const sessionsCtx = useSessionsContext();

    const upcomingSessions = sessionsCtx.upcomingSessions;

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    function onCancelUpcomingSession(id: string) {
        sessionsCtx.cancelSession(id)
    };

    return <Modal ref={modal} onClose={onClose}>
        <h2>Upcoming Sessions</h2>
        <div>
            {upcomingSessions.length === 0 && <p>No booked sessions yet! 😉</p>}
            {upcomingSessions.length > 0 && <ul id="upcoming-list">
                {upcomingSessions.map((session) => {
                    return <UpcomingSession sessionData={session} onCancelSession={onCancelUpcomingSession} key={session.id} />
                })}
            </ul>}
        </div>
        <p className="actions">
            <Button onClick={onClose}>Close</Button>
        </p>
    </Modal>;
};
