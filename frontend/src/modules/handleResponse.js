const handleResponse = (response) => {

    if (response.errors) {
        const message = response.errors[0].message;
        throw new Error(message);
    }

    return response.data;

};

export default handleResponse;
