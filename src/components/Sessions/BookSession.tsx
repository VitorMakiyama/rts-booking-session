import { FormEvent, useEffect, useRef } from "react"
import Modal, { ModalHandle } from "../UI/Modal"
import { useSessionsContext } from "../../store/sessions-context";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { SessionItemData } from "./SessionItem";

type BookSessionProps = {
    session: SessionItemData;
    onClose: () => void;
}

export default function BookSession({ session, onClose }: BookSessionProps) {
    const modal = useRef<ModalHandle>(null);

    const sessionsCtx = useSessionsContext();

    useEffect(() => {
        if (modal.current) {
            modal.current.open();
        }
    }, []);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // this line prevents the default behaviour, where a request is sent to the server of this app
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData);
        console.log(data); // would be sent to a server
        if (typeof data.name === "string" && typeof data.email === "string") {
            sessionsCtx.bookSession({
                ...session,
                userName: data.name,
                userEmail: data.email
            });
        }
        onClose();
    }

    return (<Modal ref={modal} onClose={onClose}>
        <h2>Book a session</h2>
        <form onSubmit={handleSubmit}>
            {/* the 'name' attribute is fundamental for the form extraction logic to work on handleSubmit() */}
            <Input id="input-name" label="Your Name" name="name" type="text"></Input>
            <Input id="input-email" label="Your Email" name="email" type="email"></Input>
            <p className="actions">
                <Button textOnly onClick={onClose} type="button">Cancel</Button>
                {/* this button's onClick will be auto assigned to form submit() */}
                <Button type="submit">Book Session</Button>
            </p>
        </form>
    </Modal>);

};
