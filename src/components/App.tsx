import { Stack, Spacer, Spinner } from "@chakra-ui/react";
import {
    createHashHistory,
    Link,
    Outlet,
    parseSearchWith,
    ReactLocation,
    Router,
    stringifySearchWith,
} from "@tanstack/react-location";
import React from "react";
import { EventsGenerics } from "../interfaces";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import { decodeFromBinary, encodeToBinary } from "../utils";
import { useInitial } from "../queries";
import ILink from "./ILink";

const hashHistory = createHashHistory();

const location = new ReactLocation<EventsGenerics>({
    history: hashHistory,
    parseSearch: parseSearchWith((value) =>
        JSON.parse(decodeFromBinary(value))
    ),
    stringifySearch: stringifySearchWith((value) =>
        encodeToBinary(JSON.stringify(value))
    ),
});

export default function App() {
    const { isLoading, isError, isSuccess, data, error } = useInitial();

    if (isLoading) {
        return <Spinner />;
    }

    if (isSuccess && data) {
        return (
            <Router
                location={location}
                routes={[
                    {
                        path: "/",
                        element: <Dashboard />,
                    },
                    {
                        path: "/settings",
                        element: <Settings data={data} />,
                    },

                    {
                        element: <Dashboard />,
                    },
                ]}
            >
                <Stack
                    p="5px"
                    h="calc(100vh - 48px)"
                    direction="row"
                    bg="gray.200"
                    w="100%"
                >
                    <Stack
                        w="200px"
                        p="10px"
                        bg="white"
                        maxW="200px"
                        minW="200px"
                    >
                        <ILink search="mortality" label="Mortality" />
                        <ILink search="morbidity" label="Morbidity" />
                        <ILink search="ipd" label="IPD" />
                        <ILink search="lab" label="Laboratory" />
                        <ILink
                            search="disease_control"
                            label="Disease Control"
                        />

                        <ILink search="epi" label="EPI" />
                        <ILink search="anc_tetanus" label="ANC Tetanus" />
                        <ILink
                            search="stabilization"
                            label=" Stabilization Center"
                        />
                        <ILink search="otp" label="OTP" />
                        <ILink search="tsfp" label="TSFP" />
                        <ILink search="muac" label="GMP&MUAC" />
                        <ILink search="anc" label="Antenatal Care" />
                        <ILink search="delivery" label="Deliveries & PNC" />
                        <ILink search="fp" label="Family Planning" />
                        <ILink search="sgbv" label="SGBV" />
                        <ILink search="hiv" label="HIV" />
                        <Spacer />

                        <Stack>
                            <Link<EventsGenerics> to="/settings">
                                Configurations
                            </Link>
                        </Stack>
                    </Stack>
                    <Stack
                        p="10px"
                        bg="white"
                        // overflow="auto"
                        // w="calc(100vw - 210px)"
                    >
                        <Outlet />
                    </Stack>
                </Stack>
            </Router>
        );
    }
    return <pre>{JSON.stringify(error)}</pre>;
}
