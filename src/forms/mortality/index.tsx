import { Stack } from "@chakra-ui/react";
import React from "react";
import mortality from "./mortality.json";
import mortalityByAge from "./mortality_age.json";
import {
    MORTALITY_BY_AGE,
    NAT_AGE_1_TO_60,
    REF_AGE_1_TO_60_GENDER,
} from "../../utils";
import AggTable from "../../components/AggTable";

export const Mortality = ({ data }: { data: any }) => {
    return (
        <Stack>
            <AggTable
                refugeeColumns={MORTALITY_BY_AGE}
                rows={mortalityByAge}
                data={data}
            />
            <AggTable
                refugeeColumns={REF_AGE_1_TO_60_GENDER}
                nationalColumns={NAT_AGE_1_TO_60}
                rows={mortality}
                data={data}
            />
        </Stack>
    );
};
