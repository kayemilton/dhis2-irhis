import { Link, useSearch } from "@tanstack/react-location";
import React from "react";
import { EventsGenerics } from "../interfaces";
export default function ILink({
    search,
    label,
}: {
    search: string;
    label: string;
}) {
    const { form } = useSearch<EventsGenerics>();

    return (
        <Link<EventsGenerics>
            to="/"
            search={(prev) => ({ ...prev, form: search })}
            getActiveProps={() => ({
                className: form === search ? "yellow" : "",
            })}
            className="link"
        >
            {label}
        </Link>
    );
}
