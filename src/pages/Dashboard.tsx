import {
    Button,
    Spacer,
    Spinner,
    Stack,
    Text,
    useToast,
    Box,
} from "@chakra-ui/react";
import { useDataEngine } from "@dhis2/app-runtime";
import { useNavigate, useSearch } from "@tanstack/react-location";
import { useQueryClient } from "@tanstack/react-query";
import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import { fromPairs } from "lodash";
import React, { useEffect, useState } from "react";
import FacilityTree from "../components/FacilityTree";
import facilities from "../facilities.json";
import { ANC } from "../forms/anc";
import { ANCTetanus } from "../forms/anc_tetanus";
import { BSFP1 } from "../forms/bsfp1";
import { BSFP2 } from "../forms/bsfp2";
import { Delivery } from "../forms/delivery";
import { DiseaseControl } from "../forms/disease_control";
import { EPI } from "../forms/epi";
import { FP } from "../forms/fp";
import { HIV } from "../forms/hiv";
import { IPD } from "../forms/ipd";
import { LAB } from "../forms/lab";
import { Morbidity } from "../forms/morbidity";
import { Mortality } from "../forms/mortality";
import { MUAC } from "../forms/muac";
import { OTP } from "../forms/otp";
import { SGBV } from "../forms/sgbv";
import { Stabilization } from "../forms/stabilization";
import { TSFP } from "../forms/tsfp";
import { EventsGenerics } from "../interfaces";
import { queryDataValues, useDataValueSet } from "../queries";
import { getDatesBetween, processDates, sendData } from "../utils";

dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
    weekStart: 1,
});
dayjs.extend(utc);

const facilityObjects1 = fromPairs(
    facilities.map((obj) => [obj["DHIS2 UID"], obj.HF])
);

const facilityObjects2 = fromPairs(
    facilities.map((obj) => [obj["DHIS2 UID"], obj["iRHIS ID"]])
);

export default function Dashboard() {
    const queryClient = useQueryClient();
    const toast = useToast();
    const navigate = useNavigate<EventsGenerics>();
    const engine = useDataEngine();
    const [index, setIndex] = useState<number>(0);
    const [units, setUnits] = useState<string[]>(["lvbkNrwAFmE"]);

    const onChangeTree = (newValue: string[], rest: any) => {
        setUnits(() => newValue);
        navigate({
            search: (prev) => ({
                ...prev,
                facility: newValue.length > 0 ? newValue[0] : undefined,
            }),
        });
    };
    const { form, facility, period } = useSearch<EventsGenerics>();
    const [value, setValue] = useState<Dayjs | undefined | null>(
        dayjs().subtract(2, "months")
    );

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (facility === undefined && period === undefined && value) {
            const startDate = value.startOf("month").format("YYYY-MM-DD");
            const endDate = value.endOf("month").format("YYYY-MM-DD");

            navigate({
                search: (prev) => ({
                    ...prev,
                    period: [startDate, endDate],
                    facility: "lvbkNrwAFmE",
                    form: "mortality",
                }),
            });
        }
        return () => {};
    }, []);

    const { isError, isLoading, isSuccess, data, error } = useDataValueSet(
        facility,
        period
    );
    const forms = {
        mortality: <Mortality data={data} />,
        morbidity: <Morbidity data={data} />,
        ipd: <IPD data={data} />,
        lab: <LAB data={data} />,
        disease_control: <DiseaseControl data={data} />,
        epi: <EPI data={data} />,
        anc_tetanus: <ANCTetanus data={data} />,
        stabilization: <Stabilization data={data} />,
        otp: <OTP data={data} />,
        tsfp: <TSFP data={data} />,
        bsfp1: <BSFP1 data={data} />,
        bsfp2: <BSFP2 data={data} />,
        muac: <MUAC data={data} />,
        anc: <ANC data={data} />,
        delivery: <Delivery data={data} />,
        fp: <FP data={data} />,
        sgbv: <SGBV data={data} />,
        hiv: <HIV data={data} />,
    };
    const postData = async () => {
        setLoading(() => true);
        try {
            if (value && units.length > 0) {
                const end = value
                    .startOf("month")
                    .endOf("week")
                    .format("YYYY-MM-DD");
                const start = value
                    .startOf("month")
                    .startOf("week")
                    .format("YYYY-MM-DD");
                const allDates = getDatesBetween(
                    new Date(start),
                    new Date(end)
                );

                const [startDate, endDate] = processDates(allDates);

                for (const unit of units) {
                    const iRHISUnit = facilityObjects2[unit];
                    const data = queryClient.getQueryData<any>([
                        "data-value-set",
                        unit,
                        period,
                    ]);
                    if (data && startDate && endDate) {
                        await sendData({
                            payload: data,
                            startDate,
                            endDate,
                            facility: iRHISUnit,
                        });
                        toast({
                            title: "Data uploaded.",
                            description: `Data has sent to for ${facilityObjects1[unit]}  iRHIS successfully`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                    } else {
                        const data = await queryClient.fetchQuery({
                            queryKey: ["data-value-set", unit, period],
                            queryFn: async () => {
                                return await queryDataValues(
                                    engine,
                                    unit,
                                    period
                                );
                            },
                        });
                        await sendData({
                            payload: data,
                            startDate: value
                                .startOf("week")
                                .format("YYYY-MM-DD"),
                            endDate: value.endOf("week").format("YYYY-MM-DD"),
                            facility: iRHISUnit,
                        });

                        toast({
                            title: "Data uploaded.",
                            description: `Data has sent to for ${facilityObjects1[unit]}  iRHIS successfully`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                }
            }
        } catch (error) {
            toast({
                title: "Sending to iRHIS failed",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        setLoading(() => false);
    };

    const onChange: DatePickerProps["onChange"] = (date) => {
        setValue(() => date);
        if (date) {
            const startDate = date.startOf("month").format("YYYY-MM-DD");
            const endDate = date.endOf("month").format("YYYY-MM-DD");
            navigate({
                search: (prev) => ({
                    ...prev,
                    period: [startDate, endDate],
                }),
            });
        }
    };

    const next = () => {
        if (units.length > 0) {
            setIndex((s: number) => (s + 1) % units.length);
            navigate({
                search: (prev) => ({
                    ...prev,
                    facility: units[index],
                }),
            });
        }
    };
    return (
        <Stack h="calc(100vh - 78px)" spacing="5px">
            <Stack
                h="96px"
                direction="row"
                alignItems="center"
                w="100%"
                spacing="20px"
            >
                <FacilityTree value={units} onChange={onChangeTree} />
                <Stack direction="row" alignItems="center">
                    <Text>Period</Text>
                    <DatePicker
                        onChange={onChange}
                        picker="month"
                        mode="month"
                        style={{ padding: "8px" }}
                        value={value}
                    />
                </Stack>
            </Stack>
            <Box overflow="auto" h="calc(100vh - 112px)" w="100%" p="0">
                {isLoading && (
                    <Stack
                        w="100%"
                        h="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Spinner />
                    </Stack>
                )}
                {isSuccess && (forms[form || ""] || <Text>Select form</Text>)}
                {isError && <pre>{JSON.stringify(error)}</pre>}
            </Box>
            <Stack
                h="48px"
                // boxShadow="xl"
                direction="row"
                alignItems="center"
                p="5px"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text>{facilityObjects1[facility || ""]}</Text>
                    <Button onClick={() => next()}>Next</Button>
                </Stack>
                <Spacer />
                <Button
                    colorScheme="green"
                    onClick={() => postData()}
                    isLoading={loading}
                    isDisabled={
                        facility === undefined ||
                        value === null ||
                        value === undefined
                    }
                >
                    Send to IRHIS
                </Button>
            </Stack>
        </Stack>
    );
}
