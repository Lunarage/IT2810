import React from "react";
import {Accordion} from "semantic-ui-react";

const panels = [
    {
        key: 'movie-1',
        title: "Movie1",
        content: [
            "movie 2000 Norwegian more text lorem ipsum"
        ].join(' '),
    },
    {
        key: 'movie-2',
        title: "Movie2",
        content: [
            "movie 1990 Norwegian more text lorem ipsum"
        ].join(' '),
    },
    {
        key: 'movie-3',
        title: "Movie3",
        content: {
            content: (
                <div>
                    <p>
                        "movie 2000 Norwegian more text lorem ipsum"

                    </p>
                </div>
            ),
        },
    },
]

const AccordionExampleStandardShorthand = () => (
    <Accordion defaultActiveIndex={0} panels={panels} />
)

export default AccordionExampleStandardShorthand