import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import graphQlQueries from '../../modules/queries';
import handleResponse from '../../modules/handleResponse';
import handleError from '../../modules/handleError';
import SERVER_ADDRESS from '../../modules/server';

class DeleteActor extends Component {

    constructor(props) {

        super(props);

        this.state = {
            table: 'actors',
            authorized: true,
            deleted: false,
            errors: []
        }

    }

    componentDidMount() {
        this.deleteActor(Number(this.props.match.params.id))
        .then((res) => {
            this.setState({
                deleted: true
            })
        })
        .catch((err) => {
            handleError(err);
        });
    }

    deleteActor(actorId) {

        let requestBody = {
            query: graphQlQueries.DELETE_ACTOR,
            variables: {
                id: actorId
            }
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

    render() {
        if (!this.state.authorized) {
            return <Redirect from={ `/${this.state.table}/delete/${
                this.props.match.params.id}` } to='/signin' />
        }
        else {
            if (this.state.deleted) {
                return <Redirect from={ `/${this.state.table}/delete/${
                    this.props.match.params.id}` } to={ `/${this.state.table}` } />
            }
            else {
                let errorBlocks = this.state.errors.map((error) =>
                    <div key={ error.msg } className="container">
                        <div className="alert alert-danger">{ error.message }</div>
                    </div>
                );
                return(

                    <div>
                        { errorBlocks }
                    </div>

                )
            }
        }
    }
}

export default DeleteActor;
