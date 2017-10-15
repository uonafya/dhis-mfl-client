import React from 'react'
import { Table, Icon, Header } from "semantic-ui-react"

export const FacilityResolutionTable = (props) => {
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>DHIS2</Table.HeaderCell>
                    <Table.HeaderCell>KMHFL</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.data.map((facility, i) => {
                    return ([
                        <Table.Row negative={!facility.name.didResolve}>
                            <Table.Cell>
                                <Header as='h3'>{facility.name.meta.dhis2Name}</Header>
                            </Table.Cell>
                            <Table.Cell>{facility.name.meta.dhis2Name}</Table.Cell>
                            <Table.Cell>{facility.name.meta.mflName}</Table.Cell>
                        </Table.Row>,
                        <Table.Row negative={!facility.code.didResolve}>
                            <Table.Cell disabled>Code</Table.Cell>
                            <Table.Cell>{facility.code.meta.dhis2Code}</Table.Cell>
                            <Table.Cell>{facility.code.meta.mflCode}</Table.Cell>
                        </Table.Row>,
                        <Table.Row negative={!facility.coordinates.didResolve}>
                            <Table.Cell disabled>Coordinates</Table.Cell>
                            <Table.Cell>{facility.coordinates.meta.dhis2Coordinates}</Table.Cell>
                            <Table.Cell>{facility.coordinates.meta.mflCoordinates}</Table.Cell>
                        </Table.Row>,
                        <Table.Row disabled>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    ]
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default FacilityResolutionTable