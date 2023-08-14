import { TreeSelect } from "antd";
import React, { useState } from "react";
import facilities from "../facilities.json";
import { groupBy } from "lodash";

const { SHOW_PARENT } = TreeSelect;

const facilityTree = Object.entries(groupBy(facilities, "Settlement")).map(
    ([key, value]) => {
        return {
            title: key,
            value: key,
            key: key,
            children: value.map((facility) => ({
                title: facility.HF,
                value: facility["DHIS2 UID"],
                key: facility["DHIS2 UID"],
            })),
        };
    }
);

export default function FacilityTree({
    value,
    onChange,
}: {
    onChange: (newValue: string[], rest: any) => void;
    value: string[];
}) {
    const tProps = {
        treeData: facilityTree,
        value,
        onChange,
        treeCheckable: true,
        allowClear: true,
        multiple: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: "Please select",
        style: {
            width: "auto",
            minWidth: "40%",
        },
    };

    return (
        <TreeSelect {...tProps} size="large" showCheckedStrategy="SHOW_CHILD" />
    );
}
