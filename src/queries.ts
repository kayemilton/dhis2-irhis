import { useDataEngine } from "@dhis2/app-runtime";
import { useQuery } from "@tanstack/react-query";
import { Dictionary, fromPairs } from "lodash";
import { evaluate } from "mathjs";
import { Facility } from "./interfaces";
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
            return data;
        },
        { refetchInterval: 1000 * 10 }
    );
};

export const queryDataValues = async (
    engine: any,
    orgUnit: string | undefined,
    period: string | undefined
) => {
    if (orgUnit && period) {
        let allParams = new URLSearchParams();
        allParams.append("dataSet", "RtEYsASU7PG");
        allParams.append("dataSet", "ic1BSWhGOso");
        allParams.append("dataSet", "nGkMm2VBT4G");
        allParams.append("dataSet", "VDhwrW9DiC1");
        allParams.append("dataSet", "quMWqLxzcfO");
        allParams.append("dataSet", "GyD9wEs2NYG");
        allParams.append("dataSet", "EBqVAQRmiPm");
        allParams.append("orgUnit", orgUnit);
        allParams.append("period", period);
        const query = {
            initial: {
                resource: `dataValueSets.json?${allParams.toString()}`,
            },
        };
        const {
            initial: { dataValues },
        }: any = await engine.query(query);

        if (dataValues) {
            const allValues = fromPairs<string>(
                dataValues.map(
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
            return fromPairs(
                mapping.map(({ key, value }) => {
                    let attribute = "";
                    if (key.indexOf("_Ref") !== -1) {
                        attribute = "TFRceXDkJ95";
                    } else if (key.indexOf("_Nat")) {
                        attribute = "Lf2Axb9E6B4";
                    }

                    if (value === "0") {
                        return [key, { value: "0", expression: "0" }];
                    } else if (value) {
                        let value2 = value;
                        const splitString = value.split(/\+|\-/);
                        const splitString2 = String(value2).split(/\+|\-/);

                        splitString.forEach((val) => {
                            value = value.replace(
                                val,
                                allValues[`${val}.${attribute}`] || "0"
                            );
                        });

                        splitString2.forEach((val) => {
                            value2 = value2.replace(
                                val,
                                `${allValues[`${val}.${attribute}`] || "0"}`
                            );
                        });
                        let val = 0;
                        try {
                            val = evaluate(value);
                        } catch (error) {
                            console.log(key, value);
                            console.log(error);
                        }
                        return [key, { value: val, expression: value2 }];
                    }
                    return [key, { value: "0", expression: "0" }];
                })
            );
        }
    }
    return {};
};

export function useDataValueSet(
    orgUnit: string | undefined,
    period: string | undefined
) {
    const engine = useDataEngine();

    return useQuery<any, Error>(["data-value-set", orgUnit, period], async () =>
        queryDataValues(engine, orgUnit, period)
    );
}