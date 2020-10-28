import React from "react";
import {Accordion} from "semantic-ui-react";
import {Table} from "semantic-ui-react";
import {Movie} from "../types/DatabaseTypes";



const panels = [
    {
        key: 'movie-1',
        title: {
            as: Table.Row,
            children: [
                <Table.Cell key={1}>Little Women</Table.Cell>,
                <Table.Cell key={2}>Film</Table.Cell>,
                <Table.Cell key={3}>2019</Table.Cell>,
                <Table.Cell key={4}>Kostymedrama</Table.Cell>,
                <Table.Cell key={5}>(Y)</Table.Cell>
            ]
        },
        content: {
            as: Table.Row,
            content: (
                <Table.Cell className={"accordion-inner-table"} key={1} colSpan={5}>
                    <Table celled >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell key={1}>Original title:</Table.Cell>
                                <Table.Cell key={2}>Lorem ipsum sit dolor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={3}>Start year:</Table.Cell>
                                <Table.Cell key={4}>2008</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={5}>End year:</Table.Cell>
                                <Table.Cell key={6}>2008</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={7}>Runtime:</Table.Cell>
                                <Table.Cell key={8}>167</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={9}>Adult:</Table.Cell>
                                <Table.Cell key={10}>No</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Table.Cell>
            ),
        },
    },
    {
        key: 'movie-2',
        title: {
            as: Table.Row,
            children: [
                <Table.Cell key={1}>Little Women</Table.Cell>,
                <Table.Cell key={2}>Film</Table.Cell>,
                <Table.Cell key={3}>2019</Table.Cell>,
                <Table.Cell key={4}>Kostymedrama</Table.Cell>,
                <Table.Cell key={5}>(Y)</Table.Cell>
            ]
        },
        content: {
            as: Table.Row,
            content: (
                <Table.Cell key={1} colSpan={5}>
                    <Table selectable={false} celled>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell key={1}>Original title:</Table.Cell>
                                <Table.Cell key={2}>Lorem ipsum sit dolor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={3}>Start year:</Table.Cell>
                                <Table.Cell key={4}>2008</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={5}>End year:</Table.Cell>
                                <Table.Cell key={6}>2008</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={7}>Runtime:</Table.Cell>
                                <Table.Cell key={8}>167</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell key={9}>Adult:</Table.Cell>
                                <Table.Cell key={10}>No</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Table.Cell>
            ),
        },
    },
]

const ResultTableAccordion = (props:{movies: Movie[]}) => (
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


export default ResultTableAccordion