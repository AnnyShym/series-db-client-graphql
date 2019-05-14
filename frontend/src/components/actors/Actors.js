import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Table from '../Table';

import graphQlQueries from '../../modules/queries';
import handleResponse from '../../modules/handleResponse';
import handleError from '../../modules/handleError';
import SERVER_ADDRESS from '../../modules/server';

class Actors extends Component {

    constructor(props) {

        super(props);

        this.state = {
            table: 'actors',
            columns: ['#', 'Name', 'Middle Name', 'Last Name', 'Citizenship'],
            rows: [],
            authorized: true,
            errors: []
        };

    }

    componentDidMount() {
        this.getActors()
        .then((res) => {
            const actors = res.getActors;
            this.setState({
                rows: actors,
            })
        })
        .catch((err) => {
            handleError(err);
        });
    }

    getActors() {

        let requestBody = {
            query: graphQlQueries.GET_ACTORS
        };

        return fetch(`${SERVER_ADDRESS}/graphql`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.json();
        })
        .then(handleResponse)
        .catch(handleError);

    }

    getActorInfo(table, row) {
        return(

            <tr>
                <th scope="row">{ row.id }</th>
                <td>{ row.name }</td>
                <td>{ row.middle_name }</td>
                <td>{ row.last_name }</td>
                <td>{ row.citizenship }</td>
                <td>
                    <div className="btn-group-vertical">
                        <Link to={ `/${table}/update/${row.id}` } rel="noopener" className="btn btn-sm btn-success">Update</Link>
                        <Link to={ `/${table}/delete/${row.id}` } rel="noopener" className="btn btn-sm btn-danger">Delete</Link>
                    </div>
                </td>
            </tr>

        )
    }

    render() {

        let errorBlocks = null;
        if (!this.state.authorized) {
            return <Redirect from={ `/${this.state.table}` } to='/signin' />
        }
        else {
            errorBlocks = this.state.errors.map((error) =>
                <div key={ error.msg } className="container">
                    <div className="alert alert-danger">{ error.message }</div>
                </div>
            );
        }

        return(

            <Table table={ this.state.table } columns={ this.state.columns } rows={ this.state.rows } getRowInfo={ this.getActorInfo } errorBlocks={ errorBlocks } />

        )

    }

}

export default Actors;
