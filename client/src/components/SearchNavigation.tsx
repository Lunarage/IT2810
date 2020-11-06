import React, { SyntheticEvent } from "react";
import { Pagination } from "semantic-ui-react";

type NavigationProps = {
    page: number;
    pageChange: (page: number) => void;
};

const SearchNavigation = (props: NavigationProps) => {
    const handlePageChange = (event: SyntheticEvent, data: any) => {
        props.pageChange(data.activePage);
    };

    return (
        <Pagination
            totalPages={10000}
            activePage={props.page}
            onPageChange={handlePageChange}
            boundaryRange={0}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
        />
    );
};

export default SearchNavigation;
