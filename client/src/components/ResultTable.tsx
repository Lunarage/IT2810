import React from 'react'
import {Table} from 'semantic-ui-react'


const TableExampleSelecttableRow = () => (
    <Table celled selectable className={"result-table"}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Year</Table.HeaderCell>
                <Table.HeaderCell>Genre</Table.HeaderCell>
                <Table.HeaderCell>Liked</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Little Women</Table.Cell>
                <Table.Cell>Film</Table.Cell>
                <Table.Cell>2019</Table.Cell>
                <Table.Cell>Kostymedrama</Table.Cell>
                <Table.Cell>(Y)</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Little Women</Table.Cell>
                <Table.Cell>Film</Table.Cell>
                <Table.Cell>2019</Table.Cell>
                <Table.Cell>Kostymedrama</Table.Cell>
                <Table.Cell>(Y)</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Little Women</Table.Cell>
                <Table.Cell>Film</Table.Cell>
                <Table.Cell>2019</Table.Cell>
                <Table.Cell>Kostymedrama</Table.Cell>
                <Table.Cell>(Y)</Table.Cell>
            </Table.Row>

        </Table.Body>
    </Table>
)

export default TableExampleSelecttableRow;