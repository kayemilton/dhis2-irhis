import { MakeGenerics } from "@tanstack/react-location";

export interface Store {
    currentUser: string;
    selectedUnits: string[];
    root: string;
    name?: string;
    activities: { [key: string]: string }[];
    columns: any[];
    organisationActivities: {
        // [key: string]: { date: [moment.Moment, moment.Moment]; output: string };
        [key: string]: any;
    };
}

export interface CommonIdentifier {
    id: string;
    name: string;
    code: string;
}

export interface OptionSet {
    id: string;
    type: "OPTION_SET" | "EVENT" | "TRACKED_ENTITY_INSTANCE";
}

export interface TrackedEntityAttribute {
    id: string;
    name: string;
    shortName: string;
    unique: boolean;
    displayFormName: string;
    optionSetValue: boolean;
    valueType: string;
    generated: boolean;
    confidential: boolean;
}

export interface ProgramTrackedEntityAttribute {
    id: string;
    mandatory: boolean;
    trackedEntityAttribute: TrackedEntityAttribute;
}

export interface Field {
    label: string;
    id: string;
    valueType: string;
    optionSetValue: boolean;
    optionSet: OptionSet | undefined;
    mandatory: boolean;
    hidden: boolean;
    options: any[];
}

export type EventsSearch = {
    form: string;
    facility: string;
    period: string;
};

export type EventsGenerics = MakeGenerics<{
    Search: EventsSearch;
}>;

export interface Facility {
    "DHIS2 UID": string;
    Settlement: string;
    HF: string;
    Level: string;
    "iRHIS ID": string;
}
