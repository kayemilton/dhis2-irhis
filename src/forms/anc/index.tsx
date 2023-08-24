import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import {
    REFUGEE_NATIONAL,
    YEARS_GT_20,
    YEARS_LT_20,
    YEARS_T0TAL,
} from "../../utils";
import anc from "./anc.json";
export const ANC = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>Stabilization Center </Text>
            <AggTable
                refugeeColumns={[
                    REFUGEE_NATIONAL,
                    [YEARS_LT_20, YEARS_GT_20, YEARS_T0TAL],
                ]}
                rows={anc}
                data={data}
            />
        </Stack>
    );
};
