import { useState } from "react";
import Button from "../UI/Button";
import UpcomingSessions from "../Sessions/UpcomingSessions";

export default function MainHeader() {
    const [upcomingSessionsModalIsVisible, setUpcomingSessionsModalIsVisible] = useState(false);
    function onOpenUpcomingSessionsModal() {
        setUpcomingSessionsModalIsVisible(true);
    };
    function onCloseUpcomingSessionsModal() {
        setUpcomingSessionsModalIsVisible(false);
    };

    return <>
        {upcomingSessionsModalIsVisible && <UpcomingSessions onClose={onCloseUpcomingSessionsModal} />}

        <header id="main-header">
            <h1>ReactMentoring</h1>
            <nav>

                <p>
                    <Button to={""} textOnly>Our mission</Button>
                    <Button to={"sessions"} textOnly>Browse Sessions</Button>
                    <Button onClick={onOpenUpcomingSessionsModal}>Upcoming Sessions</Button>
                </p>
            </nav>
        </header>
    </>

};
