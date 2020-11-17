import React, { SyntheticEvent } from "react";
import { Pagination } from "semantic-ui-react";

type NavigationProps = {
    totalPages: number;
    activePage: number;
    disabled: boolean;
    pageChange: (page: number) => void;
};

const SearchNavigation = (props: NavigationProps) => {
    const handlePageChange = (event: SyntheticEvent, data: any) => {
        props.pageChange(data.activePage);
    };

    return (
        <Pagination
            className={"search-navigation"}
            totalPages={props.totalPages}
            activePage={props.activePage}
            onPageChange={handlePageChange}
            boundaryRange={1}
            siblingRange={0}
            firstItem={null}
            lastItem={null}
            disabled={props.disabled}
        />
    );
};

export default SearchNavigation;
