import SessionItem, { type SessionItemData } from "./SessionItem"

type SessionsListProps = {
    sessionsData: SessionItemData[]
};

export default function SessionsList({ sessionsData }: SessionsListProps) {

    return <div className="sessions-list">
        {sessionsData.length === 0 && <p>No sessions available!</p>}
        {sessionsData.length > 0 && <ul id="sessions-list">
            {sessionsData.map((session) => {
                return <SessionItem item={session} key={session.id} />
            })}
        </ul>}
    </div>
};
