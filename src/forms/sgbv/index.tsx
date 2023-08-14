import React from "react";
import { Stack, Text } from "@chakra-ui/react";

import AggTable from "../../components/AggTable";
import { AGE_18_G_YRS, MALE_FEMALE, NATIONAL, REFUGEE } from "../../utils";
import sgbv from "./sgbv.json";

export const SGBV = ({ data }: { data: any }) => {
    return (
        <Stack>
            <AggTable
                refugeeColumns={[[{ id: "", name: "Total" }]]}
                rows={[
                    {
                        id: "SGBV_Total_no_rape_survivors_seen",
                        name: "Total no rape survivors seen",
                    },
                ]}
                data={data}
                onlyRow
            />
            <Stack>
                <Text>Sexual and Gender-based Violence</Text>
                <AggTable
                    refugeeColumns={[[REFUGEE], AGE_18_G_YRS, MALE_FEMALE]}
                    nationalColumns={[[NATIONAL], AGE_18_G_YRS]}
                    rows={sgbv}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};
