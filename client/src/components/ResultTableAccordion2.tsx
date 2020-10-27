import React from "react";
import {Table} from 'semantic-ui-react'
import {Accordion} from "semantic-ui-react";

const ResultTable = () => (
    <Table>
        <Table.Header>
            <Table.HeaderCell>Node Type</Table.HeaderCell>
            <Table.HeaderCell>Display</Table.HeaderCell>
        </Table.Header>
        <Accordion
            fluid={true}
            as={Table.Body}
            /*
            panels={this.props.visibleNodes.map(n => {
                return {
                    key: n.id,
                    class: "tr",
                    title: {
                        as: Table.Row,
                        className: "",
                        children: [
                            <Table.Cell key={`${n.id}_type`}>{n._node_type}</Table.Cell>,
                            <Table.Cell key={`${n.id}_display`}>{n._display}</Table.Cell>
                        ]
                    },
                    content: {
                        children: JSON.stringify(n.properties)
                    }
                };
            })}*/
        />
    </Table>
)

export default ResultTable;