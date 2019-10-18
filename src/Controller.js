const {AxiosService} = require('./AxiosControllerClass');


const Controller = () => {

    const requestWithCustomHeader = (request, response) => {
        await AxiosService.post(endpoint,
            {
                email: request.body.email,
                password: request.body.password },
            {
                headers: {
                    Referrer: request.body.email
                }
            })
    };

    const basicRequest = (request, response) => {

    };

    return {
        requestWithCustomHeader,
        basicRequest
    }
};

exports = {
    Controller,
};

