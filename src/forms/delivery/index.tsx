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
} from "../../utils";
import AggTable from "../../components/AggTable";
import deliveries from "./deliveries.json";
import pnc from "./pnc.json";
import pregnant_women_at_delivery from "./pregnant_women_at_delivery.json";

export const Delivery = ({ data }: { data: any }) => {
    return (
        <Stack spacing="40px">
            <Stack>
                <Text fontWeight="bold">Deliveries</Text>
                <AggTable
                    refugeeColumns={[
                        [REFUGEE],
                        AGE_18_G_YRS,
                        [HOME_DELIVERY, FACILITY_DELIVERY],
                    ]}
                    nationalColumns={[[NATIONAL], AGE_18_G_YRS]}
                    rows={deliveries}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">
                    Number of pregnant women at time of delivery who
                </Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, AGE_18_G_YRS]}
                    rows={pregnant_women_at_delivery}
                    data={data}
                />
            </Stack>
            <Stack>
                <Text fontWeight="bold">Postnatal care</Text>
                <AggTable
                    refugeeColumns={[REFUGEE_NATIONAL, AGE_18_G_YRS]}
                    rows={pnc}
                    data={data}
                />
            </Stack>
        </Stack>
    );
};
