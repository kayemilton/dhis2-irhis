import axios from "axios";
import { Facility } from "./interfaces";
import { fromPairs } from "lodash";

export function encodeToBinary(str: string): string {
    return btoa(
        encodeURIComponent(str).replace(
            /%([0-9A-F]{2})/g,
            function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            }
        )
    );
}
export function decodeFromBinary(str: string): string {
    return decodeURIComponent(
        Array.prototype.map
            .call(atob(str), function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}

export const MALE = { id: "M", name: "M" };
export const FEMALE = { id: "F", name: "F" };
export const YEARS_0_T0_4 = { id: "0_4_yrs", name: "0-4" };
export const YEARS_0_T0_4_LT = { id: "lt_0_4", name: "0-4" };
export const YEARS_T0_1 = { id: "lt_1", name: "<1" };
export const YEARS_T0TAL_LT_5 = { id: "lt_5", name: "Total < 5" };
export const YEARS_T0TAL_GT_5 = { id: "gte_5", name: "Total > 5" };
export const YEARS_T0TAL = { id: "total_crude", name: "Total Crude" };
export const YEARS_T0_1L = { id: "lt1", name: "<1" };
export const YEARS_1_T0_4 = { id: "1_4_yrs", name: "1-4" };
export const YEARS_5_TO_17 = { id: "5_17_yrs", name: "5-17" };
export const YEARS_5_TO_9 = { id: "5_9_yrs", name: "5-9" };
export const YEARS_10_TO_14 = { id: "10_14_yrs", name: "10-14" };
export const YEARS_15_TO_49 = { id: "15_49_yrs", name: "15-49" };
export const YEARS_50_TO_60 = { id: "50_60_yrs", name: "50-60" };
export const YEARS_18_TO_59 = { id: "18_59_yrs", name: "18-59" };
export const YEARS_FROM_60 = { id: "gt_60_yrs", name: ">=60" };
export const YEARS_FROM_60_IM = { id: "gte_60", name: ">=60" };
export const YEARS_FROM_60_YRS = { id: "gte_60_yrs", name: ">=60" };
export const YEARS_FROM_14 = { id: "gt_14", name: ">14" };
export const MONTHS_0_TO_6 = { id: "0_6_mon", name: "0-6Months" };
export const MONTHS_6_TO_23 = { id: "6_23_mon", name: "6-23Months" };
export const MONTHS_24_TO_59 = { id: "24_59_mon", name: "24-59Months" };
export const NATIONAL = { id: "Nat", name: "National" };
export const REFUGEE = { id: "Ref", name: "Refugee" };
export const HIV_TB = { id: "HIV_TB", name: "HIV/TB" };
export const ADMISSION = { id: "Adm", name: "Admission" };
export const DEATHS = { id: "Death", name: "DEATH" };
export const PREGNANT_LACTATING = {
    id: "Pregnant_and_Lactating",
    name: "Pregnant and Lactating",
};
export const YEARS_FROM_18 = { id: "gte_18", name: ">=18" };
export const YEARS_FROM_18_YRS = { id: "gte_18_yrs", name: ">=18" };
export const YEARS_FROM_18_G = { id: "gt_18", name: ">=18" };
export const YEARS_TO_18 = { id: "lt_18", name: "<18" };
export const YEARS_TO_18_YRS = { id: "lt_18_yrs", name: "<18" };
export const HOME_DELIVERY = { id: "Home_delivery", name: "Home delivery" };
export const FACILITY_DELIVERY = {
    id: "Health_facility",
    name: "Health Facility delivery",
};
export const YEARS_5_TO_14 = { id: "5_14_yrs", name: "5-14" };
export const YEARS_5_TO_14_NO = { id: "5_14", name: "5-14" };
export const NEW_USER = { id: "New_user", name: "New user" };
export const REPEAT_USER = { id: "Repeat_user", name: "Repeat user" };
export const DISCONTINUED_USER = {
    id: "Discontinued_user",
    name: "Discontinued user",
};
export const DONE = { id: "done", name: "Done" };
export const POSITIVE = { id: "positive", name: "Positive" };
export const ADMINISTERED = { id: "administered", name: "Doses Administered" };
export const SUPPLIED = { id: "supplied", name: "Doses Supplied" };

export const YEARS_LT_20 = { id: "lt_20_yrs", name: "<20" };
export const YEARS_GT_20 = { id: "gte_20_yrs", name: ">=20" };

export const REFUGEE_NATIONAL = [REFUGEE, NATIONAL];
export const MALE_FEMALE = [MALE, FEMALE];
export const ADMIN_DEATHS = [ADMISSION, DEATHS];
export const AGE_1_TO_60 = [
    YEARS_T0_1,
    YEARS_1_T0_4,
    YEARS_T0TAL_LT_5,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60,
    YEARS_T0TAL,
];
export const EPI_AGE = [
    YEARS_T0_1L,
    YEARS_1_T0_4,
    YEARS_T0TAL_LT_5,
    YEARS_5_TO_9,
    YEARS_10_TO_14,
    YEARS_15_TO_49,
    YEARS_50_TO_60,
    YEARS_FROM_60_IM,
    YEARS_T0TAL,
];
export const AGE_0_TO_60 = [
    YEARS_0_T0_4,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60,
];
export const AGE_0_TO_60_YRS = [
    YEARS_0_T0_4,
    YEARS_5_TO_17,
    YEARS_18_TO_59,
    YEARS_FROM_60_YRS,
];

export const AGE_0_TO_14 = [YEARS_0_T0_4, YEARS_5_TO_14, YEARS_FROM_14];
export const AGE_0_TO_14_LT = [
    YEARS_0_T0_4_LT,
    YEARS_5_TO_14_NO,
    YEARS_FROM_14,
];

export const AGE_0_TO_59_MONTHS = [
    MONTHS_0_TO_6,
    MONTHS_6_TO_23,
    MONTHS_24_TO_59,
    YEARS_T0TAL_LT_5,
];

export const AGE_0_TO_59_MONTHS_TB_PREG = [
    ...AGE_0_TO_59_MONTHS,
    HIV_TB,
    PREGNANT_LACTATING,
];

export const AGE_18 = [YEARS_TO_18, YEARS_FROM_18];
export const AGE_18_G = [YEARS_TO_18, YEARS_FROM_18_G];
export const AGE_18_G_YRS = [YEARS_TO_18_YRS, YEARS_FROM_18_YRS];
export const USERS = [NEW_USER, REPEAT_USER, DISCONTINUED_USER];

export const MORTALITY = [
    { columns: REFUGEE_NATIONAL, colSpan: AGE_1_TO_60.length },
    { columns: AGE_1_TO_60, colSpan: 1 },
];

export const REF_AGE_1_TO_60_GENDER = [[REFUGEE], AGE_1_TO_60, MALE_FEMALE];
export const NAT_AGE_1_TO_60 = [[NATIONAL], AGE_1_TO_60];
export const MORTALITY_BY_AGE = [REFUGEE_NATIONAL, AGE_1_TO_60];
export const MORBIDITY_TOTAL = [REFUGEE_NATIONAL, MALE_FEMALE];
export const REF_AGE_0_TO_60_GENDER = [[REFUGEE], AGE_0_TO_60, MALE_FEMALE];
export const NAT_AGE_0_TO_60 = [[NATIONAL], AGE_0_TO_60];
export const REF_AGE_0_TO_60_GENDER_MOB = [
    [REFUGEE],
    AGE_0_TO_60_YRS,
    MALE_FEMALE,
];
export const NAT_AGE_0_TO_60_MOB = [[NATIONAL], AGE_0_TO_60_YRS];
export const NAT_AGE_0_TO_60_ADMIN = [
    REFUGEE_NATIONAL,
    [...AGE_0_TO_60, YEARS_T0TAL],
    ADMIN_DEATHS,
];

export const findMerged = (
    list: Array<Array<{ id: string; name: string; span?: number }>>
) => {
    let finalColumns: Array<
        Array<{ id: string; name: string; span?: number }>
    > = [];
    for (let index = 0; index < list.length; index++) {
        let currentValues = list[index];
        if (index === 0) {
            finalColumns[0] = currentValues;
        } else {
            const prev = finalColumns[index - 1];
            let nextValues: Array<{ id: string; name: string; span?: number }> =
                [];
            for (const v of prev) {
                for (const p of currentValues) {
                    nextValues = [
                        ...nextValues,
                        {
                            name: p.name,
                            id: `${v.id}_${p.id}`,
                            span: 1,
                        },
                    ];
                }
            }
            finalColumns[index] = nextValues;
        }
    }

    return finalColumns.map((data, index, columns) => {
        if (index < columns.length - 1) {
            const last = columns[columns.length - 1].length;
            const current = columns[index].length;
            return data.map((x) => {
                return { ...x, span: last / current };
            });
        }
        return data;
    });
};

export const sendData = async ({
    payload,
    startDate,
    endDate,
    facility,
}: {
    payload: any;
    startDate: string;
    endDate: string;
    facility: string;
}) => {
    const username = process.env["REACT_APP_USERNAME"];
    const password = process.env["REACT_APP_PASSWORD"];
    const baseURL = process.env["REACT_APP_URL"];

    const instance = axios.create({
        baseURL: baseURL,
    });

    const {
        data: { access },
    } = await instance.post("auth/jwt/create", {
        username,
        password,
    });
    const finalPayload = {
        user: 5389,
        schema: 96,
        data: fromPairs(
            Object.entries(payload).map(([key, val]: any) => [
                key,
                val ? Number(val.value) : 0,
            ])
        ),
        timelevel: 3,
        location: Number(facility),
        date_start: startDate,
        date_end: endDate,
    };

    if (access) {
        const { data: data1 } = await instance.post(
            "reports/form_data/",
            finalPayload,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                    "Content-Type": "application/json",
                },
            }
        );
    }
};

export const join2 = (
    a1: Array<{ id: string; name: string }>,
    a2: Array<{ id: string; name: string }>
) => {
    return a1.flatMap((a) => {
        return a2.map((b) => {
            return { id: `${a.id}_${b.id}`, name: `${a.name} ${b.name}` };
        });
    });
};

const columns0To4 = join2([YEARS_0_T0_4], MALE_FEMALE);
const columns5To14 = join2([YEARS_5_TO_14, YEARS_FROM_14], MALE_FEMALE);
const yearsColumns = [
    ...columns0To4,
    YEARS_T0TAL_LT_5,
    ...columns5To14,
    YEARS_T0TAL,
];

const nationalColumn = [
    YEARS_0_T0_4,
    YEARS_5_TO_14,
    YEARS_FROM_14,
    YEARS_T0TAL,
];

export const diseaseControlColumns = [
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
