import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import {
    AGE_0_TO_60,
    NAT_AGE_0_TO_60_ADMIN,
    REFUGEE_NATIONAL,
} from "../../utils";
import admissions from "./admissions.json";
import ipd_admissions_death from "./ipd_admissions_death.json";
import ipd_indicators from "./ipd_indicators.json";

export const IPD = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Admissions/Exits</Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, AGE_0_TO_60]}
                    rows={admissions}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">IPD Indicators</Text>
                <AggTable
                    refugeeColumns={[[{ name: "Total", id: "" }]]}
                    rows={ipd_indicators}
                    data={data}
                    onlyRow
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">In-patient Admissions and Deaths</Text>
                <AggTable
                    refugeeColumns={NAT_AGE_0_TO_60_ADMIN}
                    rows={ipd_admissions_death}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};
