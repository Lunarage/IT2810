import React from "react";
import {Accordion} from "semantic-ui-react";
import {Table} from "semantic-ui-react";
import {Movie} from "../types/DatabaseTypes";

const isNull = (value: any) => {
    if (value != null) {
        return value;
    } else {
        return "---";
    }
}

const ResultTableAccordion = (props: { movies: Movie[] }) => {

    const panels = props.movies.map(n => {
        return {
            key: n.tconst,
            class: "tr",
            title: {
                as: Table.Row,
                className: "accordion-title",
                children: [
                    <Table.Cell key={'${n.tconst}_movie'}>{n.primary_title}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_title_type'}>{n.title_type}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_start_year'}>{n.start_year}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_genres'}>{isNull(n.genres)}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_liked'}>{n.liked ? "Liked":"Not Liked"}</Table.Cell>

                ]
            },
            content: {
                as: Table.Row,
                className: "accordion-content",
                content: (
                    <Table.Cell key={'${n.tconst}content'}>
                        <Table className="accordion-inner-table">
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_original_title_header'}>Original Title:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_original_title'}>{n.original_title}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_start_year_header'}>Start Year:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_start_year'}>{n.start_year}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_end_year_header'}>End Year:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_end_year'}>{isNull(n.end_year)}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_runtime_header'}>Runtime minutes:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_runtime'}>{isNull(n.runtime_minutes)}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_adult_header'}>Adult:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_adult'}>{n.is_adult ? "Yes" : "No"}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Table.Cell>
                )


            }
        }
    })


    /*[{
            key: 1,
            title: {
                as: Table.Row,
                children: [<Table.Cell key={1}>celle 1</Table.Cell>]
            }

    }];*/


    return (
        <Table celled /*selectable={true}*/>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.HeaderCell>Genre</Table.HeaderCell>
                    <Table.HeaderCell>Liked</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Accordion fluid as={Table.Body} panels={panels}/>
        </Table>
    )

};


export default ResultTableAccordion