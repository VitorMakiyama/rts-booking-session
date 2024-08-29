import { ComponentPropsWithoutRef } from "react";

type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithoutRef<"input">;

// Base input wrapper that bundles it with a label
export default function Input(props: InputProps) {
    const { label, id, ...otherProps } = props;
    return <div className="control">
        <label>{label}</label>
        <input {...otherProps} />
    </div>;
};
