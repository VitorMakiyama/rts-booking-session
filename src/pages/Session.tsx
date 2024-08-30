import { useParams } from 'react-router-dom';

import { SESSIONS } from '../dummy-sessions.ts';
import Button from '../components/UI/Button.tsx';
import { useState } from 'react';
import BookSession from '../components/Sessions/BookSession.tsx';
import { useSessionsContext } from '../store/sessions-context.tsx';

export default function SessionPage() {
  const params = useParams<{ id: string }>();

  const sessionId = params.id;
  const loadedSession = SESSIONS.find((session) => session.id === sessionId);

  const [isBookSessionVisible, setBookSessionVisible] = useState(false);

  const { isBooked } = useSessionsContext();

  function onShowBookSessionModal() {
    setBookSessionVisible(true);
  }

  function onCloseBookSession() {
    setBookSessionVisible(false);
  }

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }


  return (
    <main id="session-page">
      {isBookSessionVisible && <BookSession session={loadedSession} onClose={onCloseBookSession} />}
      <article>
        <header>
          <img
            src={loadedSession.image}
            alt={loadedSession.title}
          />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <p>
              {isBooked(loadedSession.id) ? <h3>Already booked!</h3> : <Button onClick={onShowBookSessionModal}>Book Session</Button>}
            </p>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
