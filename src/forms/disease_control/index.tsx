import React from "react";
import { Stack, Text } from "@chakra-ui/react";

import AggTable from "../../components/AggTable";
import { REFUGEE, MALE_FEMALE, AGE_0_TO_14_LT, NATIONAL } from "../../utils";
import tb from "./tb.json";
import leprossy from "./leprossy.json";

export const DiseaseControl = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Tuberculosis</Text>
                <AggTable
                    refugeeColumns={[
                        [{ ...REFUGEE, id: `${REFUGEE.id}_TBC` }],
                        MALE_FEMALE,
                        AGE_0_TO_14_LT,
                    ]}
                    nationalColumns={[
                        [{ ...NATIONAL, id: `${NATIONAL.id}_TBC` }],
                        AGE_0_TO_14_LT,
                    ]}
                    rows={tb}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Leprosy</Text>
                <AggTable
                    refugeeColumns={[
                        [{ ...REFUGEE, id: `${REFUGEE.id}_Leprosy` }],
                        MALE_FEMALE,
                        AGE_0_TO_14_LT,
                    ]}
                    nationalColumns={[
                        [{ ...NATIONAL, id: `${NATIONAL.id}_Leprosy` }],
                        AGE_0_TO_14_LT,
                    ]}
                    rows={leprossy}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};
