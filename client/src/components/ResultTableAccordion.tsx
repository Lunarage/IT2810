import React from "react";
import {Accordion} from "semantic-ui-react";
import {Table} from "semantic-ui-react";


const panels = [
    {
        key: 'movie-1',
        title: {
            as: Table.Row,
            children: [
                <Table.Cell>Movie 1</Table.Cell>,
                <Table.Cell>2009</Table.Cell>
            ]
        },
        content: {
            as: Table.Row,
            content: (
                <Table.Cell>Info about movie</Table.Cell>
            )

        }
    },
    {
        key: 'movie-2',
        title: {
            as: Table.Row,
            children: [
                <Table.Cell>Movie 2</Table.Cell>,
                <Table.Cell>2008</Table.Cell>
            ]
        },
        content: {
            as: Table.Row,
            content: (
                <Table.Cell>Info about movie</Table.Cell>
            )

        }
    },

]

const AccordionExampleStandardShorthand = () => (
    <Accordion defaultActiveIndex={0} panels={panels} />
)

const ResultAccordionTable = () => (
    <Table selectable>
        <Table.Header>
            <Table.HeaderCell>Movie</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
        </Table.Header>
        <Accordion as={Table.Body} panels={panels}/>
    </Table>
)



export default ResultAccordionTable