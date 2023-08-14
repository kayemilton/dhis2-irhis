import React from "react";
import { Stack, Text } from "@chakra-ui/react";

import AggTable from "../../components/AggTable";
import family_planning from "./family_planning.json";
import {
    REFUGEE,
    NEW_USER,
    REPEAT_USER,
    DISCONTINUED_USER,
    AGE_18_G_YRS,
    MALE_FEMALE,
    NATIONAL,
} from "../../utils";
export const FP = ({ data }: { data: any }) => {
    return (
        <Stack>
            <Text>Family Planning </Text>
            <AggTable
                refugeeColumns={[
                    [NEW_USER, REPEAT_USER, DISCONTINUED_USER],
                    [REFUGEE],

                    AGE_18_G_YRS,
                    MALE_FEMALE,
                ]}
                nationalColumns={[
                    [NEW_USER, REPEAT_USER, DISCONTINUED_USER],
                    [NATIONAL],
                ]}
                rows={family_planning}
                data={data}
            />
        </Stack>
    );
};
