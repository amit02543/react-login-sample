import React from "react";
import Card from "../UI/Card/Card";
import Mode from "../UI/Mode/Mode";

import classes from './Settings.module.css';
import Style from "../UI/Style/Style";

const Settings = () => {
    return (
        <Card className={classes.settings}>
            <div className={classes.row}>
                <div className={classes.label}>Theme</div>
                <div className={classes.value}>
                    <span className={classes.optionText}>Light</span>
                    <Mode/>
                    <span className={classes.optionText}>Dark</span>
                </div>
            </div>
            <div className={classes.row}>
                <div className={classes.label}>Style</div>
                <div className={classes.value}><Style /></div>
            </div>
        </Card>
    );
};

export default Settings;