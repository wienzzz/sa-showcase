import React, { FunctionComponent, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { getWeekRange } from '../helper/api/function';
import { addDays } from 'date-fns';

interface MyWeekPickerProps {
    startChange: any;
    endChange: any;
    weekLabel: string;
    isPublished: boolean;
}

const MyWeekPicker: FunctionComponent<MyWeekPickerProps> = ({ startChange, endChange, weekLabel, isPublished }) => {
    const [bowDate, setBowDate] = useState<Date>(new Date());
    const [eowDate, setEowDate] = useState<Date>(new Date());

    function updateMe(objectDate: any) {
        setBowDate(objectDate.beginWeek);
        setEowDate(objectDate.endWeek);
        startChange(objectDate.beginWeek);
        endChange(objectDate.endWeek);
    }

    useEffect(() => {
        let _defObjDate = getWeekRange(new Date());
        updateMe(_defObjDate);
    }, []);


    const getPreviousWeek = () => {
        let dayBeforeThisWeek = addDays(bowDate, -1);
        let _defObjDate = getWeekRange(dayBeforeThisWeek);
        updateMe(_defObjDate);

    }

    const getFollowingWeek = () => {
        let dayAfterThisWeek = addDays(eowDate, 1);
        let _defObjDate = getWeekRange(dayAfterThisWeek);
        updateMe(_defObjDate);
    }

    return (
        <>
            <IconButton
                size="small"
                aria-label="delete"
                onClick={() => getPreviousWeek()}
            >
                <ArrowLeftIcon fontSize="small" />
            </IconButton>
            <span style={{ color: isPublished? 'green': 'black' }}>{weekLabel}</span>
            <IconButton
                size="small"
                aria-label="delete"
                onClick={() => getFollowingWeek()}
            >
                <ArrowRightIcon fontSize="small" />
            </IconButton>
        </>
    )
};

export default MyWeekPicker;
