import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "@tanstack/react-query";
import { fromPairs, orderBy, groupBy, sum } from "lodash";
import { evaluate } from "mathjs";
import dayjs from "dayjs";
import mapping from "./mapping.json";

export const useInitial = () => {
    const engine = useDataEngine();
    return useQuery<
        { username: string; password: string; baseURL: string },
        Error
    >(["initial"], async () => {
        const query = {
            data: {
                resource: "dataStore/irhis/user",
            },
        };
        const {
            data: { baseURL, username, password },
        }: any = await engine.query(query);
        return { baseURL, username, password };
    });
};

export const useHistory = () => {
    const engine = useDataEngine();
    return useQuery<any[]>(
        ["history"],
        async () => {
            const query = {
                data: {
                    resource: "dataStore/irhis/previous",
                },
            };
            const { data }: any = await engine.query(query);
            return orderBy(data, "date", "desc");
        },
        { refetchInterval: 1000 * 10 }
    );
};

export const queryDataValues = async (
    engine: any,
    orgUnit: string | undefined,
    period: [string, string] | undefined
) => {
    if (orgUnit && period) {
        const previousPeriod = dayjs(period[0]).subtract(1, "months");
        const prevStartDate = previousPeriod
            .startOf("month")
            .format("YYYY-MM-DD");
        const prevEndDate = previousPeriod.endOf("month").format("YYYY-MM-DD");

        let prevParameters = new URLSearchParams();
        prevParameters.append("orgUnit", orgUnit);
        prevParameters.append("startDate", prevStartDate);
        prevParameters.append("endDate", prevEndDate);
        prevParameters.append(
            "dataSet",
            [
                "RtEYsASU7PG",
                "ic1BSWhGOso",
                "nGkMm2VBT4G",
                "VDhwrW9DiC1",
                "quMWqLxzcfO",
                "GyD9wEs2NYG",
                "EBqVAQRmiPm",
                "C4oUitImBPK",
            ].join(",")
        );

        let allParams = new URLSearchParams();
        allParams.append("dataSet", "RtEYsASU7PG");
        allParams.append("dataSet", "ic1BSWhGOso");
        allParams.append("dataSet", "nGkMm2VBT4G");
        allParams.append("dataSet", "VDhwrW9DiC1");
        allParams.append("dataSet", "quMWqLxzcfO");
        allParams.append("dataSet", "GyD9wEs2NYG");
        allParams.append("dataSet", "EBqVAQRmiPm");
        allParams.append("dataSet", "C4oUitImBPK");
        allParams.append("orgUnit", orgUnit);
        allParams.append("startDate", period[0]);
        allParams.append("endDate", period[1]);

        const query = {
            current: {
                resource: `dataValueSets.json?${allParams.toString()}`,
            },
            previous: {
                resource: `dataValueSets.json?${prevParameters.toString()}`,
            },
        };

        const {
            current: { dataValues },
            previous: { dataValues: prev },
        }: any = await engine.query(query);

        let allValues: { [key: string]: any } = {};
        let allValuesPrev: { [key: string]: any } = {};

        if (dataValues) {
            const withWeeks = dataValues.filter(
                (d: any) => d.period.indexOf("W") !== -1
            );
            const withoutWeeks = dataValues.filter(
                (d: any) => d.period.indexOf("W") === -1
            );

            const processed = Object.entries(
                groupBy(
                    withWeeks,
                    (v) =>
                        `${v.attributeOptionCombo}${v.categoryOptionCombo}${v.dataElement}${v.orgUnit}`
                )
            ).map(([k, values]) => ({
                ...values[0],
                value: String(sum(values.map((d: any) => Number(d.value)))),
            }));

            allValues = fromPairs<string>(
                withoutWeeks
                    .concat(processed)
                    .map(
                        ({
                            dataElement,
                            categoryOptionCombo,
                            attributeOptionCombo,
                            value,
                        }: any) => [
                            `${dataElement}.${categoryOptionCombo}.${attributeOptionCombo}`,
                            value,
                        ]
                    )
            );
        }

        if (prev) {
            const withWeeks = prev.filter(
                (d: any) => d.period.indexOf("W") !== -1
            );
            const withoutWeeks = prev.filter(
                (d: any) => d.period.indexOf("W") === -1
            );

            const processed = Object.entries(
                groupBy(
                    withWeeks,
                    (v) =>
                        `${v.attributeOptionCombo}${v.categoryOptionCombo}${v.dataElement}${v.orgUnit}`
                )
            ).map(([k, values]) => ({
                ...values[0],
                value: String(sum(values.map((d: any) => Number(d.value)))),
            }));

            allValuesPrev = fromPairs<string>(
                withoutWeeks
                    .concat(processed)
                    .map(
                        ({
                            dataElement,
                            categoryOptionCombo,
                            attributeOptionCombo,
                            value,
                        }: any) => [
                            `${dataElement}.${categoryOptionCombo}.${attributeOptionCombo}`,
                            value,
                        ]
                    )
            );
        }

        return fromPairs(
            mapping.map(({ key, value }) => {
                let actualValue = String(value);
                let attribute = "";
                if (
                    [
                        "OPD_TS_oar_nr_outbreaks_rep",
                        "OPD_TS_oar_nr_rep_invest",
                    ].indexOf(String(key)) !== -1
                ) {
                    attribute = "HllvX50cXC0";
                } else if (String(key).indexOf("_Ref") !== -1) {
                    attribute = "TFRceXDkJ95";
                } else if (String(key).indexOf("_Nat") !== -1) {
                    attribute = "Lf2Axb9E6B4";
                }

                let workingWith = allValues;

                if (key.indexOf("beginning_of_reporting_period") !== -1) {
                    workingWith = allValuesPrev;
                }
                if (value === "0" || value === 0) {
                    if (
                        [
                            "IPD_TS_Ind_ipd_reporting_period_days",
                            "OPD_TS_Ind_full_days_OPD_functioning",
                        ].indexOf(key) !== -1
                    ) {
                        return [
                            key,
                            {
                                value: dayjs(period[0]).daysInMonth(),
                                expression: "0",
                            },
                        ];
                    }
                    return [key, { value: "0", expression: "0" }];
                } else if (String(value) && attribute) {
                    let value2 = actualValue;
                    const splitString = String(value).split(/\+|\-/);
                    const splitString2 = String(value2).split(/\+|\-/);

                    splitString.forEach((val) => {
                        actualValue = actualValue.replace(
                            val,
                            workingWith[`${val}.${attribute}`] || "0"
                        );
                    });

                    splitString2.forEach((val) => {
                        value2 = value2.replace(
                            val,
                            `${workingWith[`${val}.${attribute}`] || "0"}`
                        );
                    });
                    let val = 0;
                    try {
                        val = evaluate(actualValue);
                    } catch (error) {
                        console.log(key, value);
                        console.log(error);
                    }
                    return [key, { value: val, expression: value2 }];
                } else {
                    let national = String(value);
                    let refugee = String(value);

                    const natSplit = national.split(/\+|\-/);
                    const refSplit = refugee.split(/\+|\-/);

                    natSplit.forEach((val) => {
                        national = national.replace(
                            val,
                            workingWith[`${val}.Lf2Axb9E6B4`] || "0"
                        );
                    });

                    refSplit.forEach((val) => {
                        refugee = refugee.replace(
                            val,
                            workingWith[`${val}.TFRceXDkJ95`] || "0"
                        );
                    });

                    try {
                        const natValue = evaluate(national);
                        const refValue = evaluate(refugee);
                        return [
                            key,
                            {
                                value:
                                    key === "IPD_TS_nr_beds"
                                        ? refValue
                                        : String(natValue + refValue),
                                expression: "",
                            },
                        ];
                    } catch (error) {
                        console.log(key, value);
                        console.log(error);
                    }
                }
                return [key, { value: "0", expression: "0" }];
            })
        );
    }
    return {};
};

export function useDataValueSet(
    orgUnit: string | undefined,
    period: [string, string] | undefined
) {
    const engine = useDataEngine();

    return useQuery<any, Error>(
        ["data-value-set", orgUnit, ...[period ? period : ""]],
        async () => {
            return queryDataValues(engine, orgUnit, period);
        }
    );
}
