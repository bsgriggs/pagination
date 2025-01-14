import { createElement, ReactElement, useMemo } from "react";
import { ButtonStyleEnum, PageDisplayTypeEnum } from "../../../typings/AdvancedPaginationProps";
import NavButton from "./NavButton";
import classNames from "classnames";
import { WebIcon } from "mendix";
import pageDisplayFormatter from "../../utils/pageDisplayFormatter";

type NavigationPaginationProps = {
    page: number;
    pageSize: number;
    pageTotal: number;
    resultCount: number;
    pageDisplayType: PageDisplayTypeEnum;
    buttonStyle: ButtonStyleEnum;
    includeEnds: boolean;
    tabIndex: number;
    setPage: (newPage: number) => void;
    /* Label customization */
    groupDigits: boolean;
    pageLabel: string;
    ofLabel: string;
    toLabel: string;
    firstLabel: string;
    previousLabel: string;
    nextLabel: string;
    lastLabel: string;
    customPageDisplay: string;
    /* Icon set */
    firstIcon: WebIcon;
    previousIcon: WebIcon;
    nextIcon: WebIcon;
    lastIcon: WebIcon;
};

const NavigationPagination = (props: NavigationPaginationProps): ReactElement => {
    const pageDisplay: string = useMemo(
        () =>
            pageDisplayFormatter(
                props.page,
                props.pageSize,
                props.resultCount,
                props.pageTotal,
                props.pageDisplayType,
                props.groupDigits,
                props.pageLabel,
                props.toLabel,
                props.ofLabel,
                props.customPageDisplay
            ),
        [
            props.page,
            props.pageSize,
            props.resultCount,
            props.pageTotal,
            props.pageDisplayType,
            props.groupDigits,
            props.pageLabel,
            props.toLabel,
            props.ofLabel,
            props.customPageDisplay
        ]
    );

    return (
        <div className={classNames("navigation-pagination")}>
            {props.includeEnds && (
                <NavButton
                    title={`${props.firstLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page > 1) {
                            props.setPage(1);
                        }
                    }}
                    disabled={props.page === 1}
                    buttonStyle={props.buttonStyle}
                    icon={props.firstIcon}
                    tabIndex={props.tabIndex}
                />
            )}
            <NavButton
                title={`${props.previousLabel} ${props.pageLabel}`}
                onClick={() => {
                    if (props.page > 1) {
                        props.setPage(props.page - 1);
                    }
                }}
                disabled={props.page === 1}
                buttonStyle={props.buttonStyle}
                icon={props.previousIcon}
                tabIndex={props.tabIndex}
            />
            <span className="mx-text">{pageDisplay}</span>
            <NavButton
                title={`${props.nextLabel} ${props.pageLabel}`}
                onClick={() => {
                    if (props.page < props.pageTotal) {
                        props.setPage(props.page + 1);
                    }
                }}
                disabled={props.page === props.pageTotal}
                buttonStyle={props.buttonStyle}
                icon={props.nextIcon}
                tabIndex={props.tabIndex}
            />
            {props.includeEnds && (
                <NavButton
                    title={`${props.lastLabel} ${props.pageLabel}`}
                    onClick={() => {
                        if (props.page < props.pageTotal) {
                            props.setPage(props.pageTotal);
                        }
                    }}
                    disabled={props.page === props.pageTotal}
                    buttonStyle={props.buttonStyle}
                    icon={props.lastIcon}
                    tabIndex={props.tabIndex}
                />
            )}
        </div>
    );
};

export default NavigationPagination;
