import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import AggTable from "../../components/AggTable";
import AggTable2 from "../../components/AggTable2";
import {
    FACILITY_DELIVERY,
    HOME_DELIVERY,
    join2,
    NATIONAL,
    REFUGEE,
    REFUGEE_NATIONAL,
    YEARS_GT_20,
    YEARS_LT_20,
    YEARS_T0TAL,
} from "../../utils";
import deliveries from "./deliveries.json";
import pnc from "./pnc.json";
import pregnant_women_at_delivery from "./pregnant_women_at_delivery.json";

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
        <Stack spacing="20px">
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
