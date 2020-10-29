import React from "react";
import {Accordion} from "semantic-ui-react";
import {Table} from "semantic-ui-react";
import {Movie} from "../types/DatabaseTypes";


/* ResultTableAccordion får inn en liste av filmer movies fra SearchResult.
* Disse presenteres som en tabell der radene er "trekkspill", altså at det vises mer info om filmen i den enkelte raden om den trykkes på. Dette innholdet ligger i en ny tabell.*/
const ResultTableAccordion = (props: { movies: Movie[] }) => {
    const panels = props.movies.map(n => {
        return {
            key: n.tconst,      // Unik nøkkel, basert på tconst-ID i databasen
            class: "tr",
            title: {            // Dette er raden som vises, og som kan trykkes på for å vise content
                as: Table.Row,
                className: "accordion-title",
                children: [     // Cellene i raden. Data splittes opp fra movies og brukes til key, og vises i cellen.
                    <Table.Cell key={'${n.tconst}_movie'}>{n.primary_title}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_title_type'}>{n.title_type}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_start_year'}>{n.start_year}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_genres'}>{isNull(n.genres)}</Table.Cell>,
                    <Table.Cell key={'${n.tconst}_liked'}>{n.liked ? "Liked" : "Not Liked"}</Table.Cell>

                ]
            },
            content: {          // Dette er "det skjulte innholdet". Ved klikk på title vises mer informasjon om filmen
                as: Table.Row,  // legges til som en rad
                className: "accordion-content",
                content: (
                    <Table.Cell key={'${n.tconst}content'}>         {/* i raden er en celle, inne i cellen er en ny tabell */}
                        <Table className="accordion-inner-table">
                            <Table.Body>
                                {/* Original title */}
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_original_title_header'}>Original Title:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_original_title'}>{n.original_title}</Table.Cell>
                                </Table.Row>
                                {/* Start year */}
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_start_year_header'}>Start Year:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_start_year'}>{n.start_year}</Table.Cell>
                                </Table.Row>
                                {/* End year */}
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_end_year_header'}>End Year:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_end_year'}>{isNull(n.end_year)}</Table.Cell>
                                </Table.Row>
                                {/* Runtime minutes */}
                                <Table.Row>
                                    <Table.Cell key={'${n.tconst}_runtime_header'}>Runtime minutes:</Table.Cell>
                                    <Table.Cell key={'${n.tconst}_runtime'}>{isNull(n.runtime_minutes)}</Table.Cell>
                                </Table.Row>
                                {/* Adult */}
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


    // Returnerer tabellen
    return (
        <Table celled /*selectable={true}*/>
            {/* Table header av semantic-ui-Table */}
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Year</Table.HeaderCell>
                    <Table.HeaderCell>Genre</Table.HeaderCell>
                    <Table.HeaderCell>Liked</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {/* Table body av semantic-ui-Accordion. Denne har rader med title (det som vises) og content (det som er skjult i "trekkspillet".*/}
            <Accordion fluid as={Table.Body} panels={panels}/>
        </Table>
    )
};


const isNull = (value: any) => {
    if (value != null) {
        return value;
    } else {
        return "---";
    }
}

export default ResultTableAccordion
