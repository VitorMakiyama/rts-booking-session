import Button from "../UI/Button";

export type SessionItemData = {
    id: string,
    title: string,
    summary: string,
    description: string,
    duration: number,
    date: string,
    image: string,
};

type SessionItemProps = {
    item: SessionItemData
};

export default function SessionItem({ item }: SessionItemProps) {
    return <li id={item.id}>
        <div className="session-item">
            <img src={item.image} />
            <div className="session-data">
                <h3>{item.title}</h3>
                {item.summary}
            </div>
            <p>
                <Button to={item.id}>Learn more!</Button>
            </p>
        </div>
    </li>;
};
