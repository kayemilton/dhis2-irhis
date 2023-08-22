import React from "react";
import { Stack, Text } from "@chakra-ui/react";
import {
    AGE_18,
    REFUGEE_NATIONAL,
    HOME_DELIVERY,
    FACILITY_DELIVERY,
    AGE_18_G_YRS,
    REFUGEE,
    NATIONAL,
    YEARS_LT_20,
    YEARS_GT_20,
    YEARS_T0TAL,
    MALE_FEMALE,
    join2,
    YEARS_0_T0_4,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60,
    YEARS_T0TAL_LT_5,
    AGE_0_TO_60,
} from "../../utils";
import AggTable from "../../components/AggTable";
import deliveries from "./deliveries.json";
import pnc from "./pnc.json";
import pregnant_women_at_delivery from "./pregnant_women_at_delivery.json";
import AggTable2 from "../../components/AggTable2";

export const Delivery = ({ data }: { data: any }) => {
    const columns0To4 = join2(
        [YEARS_LT_20, YEARS_GT_20],
        [HOME_DELIVERY, FACILITY_DELIVERY]
    );

    const yearsColumns = [...columns0To4, YEARS_T0TAL];

    const nationalColumn = [YEARS_LT_20, YEARS_GT_20, YEARS_T0TAL];

    const acuteColumns = [
        [
            { ...REFUGEE, span: yearsColumns.length },
            { ...NATIONAL, span: nationalColumn.length },
        ],
        [
            ...yearsColumns.map((a) => ({
                ...a,
                id: `${REFUGEE.id}_${a.id}`,
            })),
            ...nationalColumn.map((a) => ({
                ...a,
                id: `${NATIONAL.id}_${a.id}`,
            })),
        ],
    ];
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Deliveries</Text>
                <AggTable2
                    columns={acuteColumns}
                    rows={deliveries}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">
                    Number of pregnant women at time of delivery who
                </Text>
                <AggTable
                    refugeeColumns={[
                        REFUGEE_NATIONAL,
                        [YEARS_LT_20, YEARS_GT_20, YEARS_T0TAL],
                    ]}
                    rows={pregnant_women_at_delivery}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Postnatal care</Text>
                <AggTable
                    refugeeColumns={[
                        REFUGEE_NATIONAL,
                        [YEARS_LT_20, YEARS_GT_20, YEARS_T0TAL],
                    ]}
                    rows={pnc}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};
