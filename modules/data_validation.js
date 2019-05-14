// Validation patterns
const NAME_PATTERN = /^[A-Za-z]+('[A-Za-z]+)?(-|\s)?[A-Za-z]+('[A-Za-z]+)?$/;
const MIDDLE_NAME_PATTERN = /^[A-Za-z]+('[A-Za-z]+)?(-|\s)?[A-Za-z]+('[A-Za-z]+)?$/;
const LAST_NAME_PATTERN = /^[A-Za-z]+('[A-Za-z]+)?(-|\s)?[A-Za-z]+('[A-Za-z]+)?(\,\s[A-Za-z]+\.)?$/;

// Some validation information
const NAME_MAX = 50;

// Some validation messages
const MSG_NAME_NOT_EMPTY = "Name is required!";
const MSG_NAME_MAX = `Name must contain not more than ${NAME_MAX} symbols!`;
const MSG_NAME_PATTERN = 'Invalid name!';

const MSG_MIDDLE_NAME_MAX = `Middle name must contain not more than ${NAME_MAX} symbols!`;
const MSG_MIDDLE_NAME_PATTERN = 'Invalid middle name!';

const MSG_LAST_NAME_NOT_EMPTY = "Last name is required!";
const MSG_LAST_NAME_MAX = `Last name must contain not more than ${NAME_MAX} symbols!`;
const MSG_LAST_NAME_PATTERN = 'Invalid last name!';

function validateData(data) {

    data.check('name')
        .trim()
        .notEmpty().withMessage(MSG_NAME_NOT_EMPTY)
        .isLength({ max: NAME_MAX }).withMessage(MSG_NAME_MAX)
        .matches(NAME_PATTERN, 'i')
        .withMessage(MSG_NAME_PATTERN);

    data.check('middle_name')
        .trim()
        .isLength({ max: NAME_MAX }).withMessage(MSG_MIDDLE_NAME_MAX)

    if (data.middle_name !== '') {
        data.check('middle_name')
            .matches(MIDDLE_NAME_PATTERN, 'i')
            .withMessage(MSG_MIDDLE_NAME_PATTERN);
    }

    data.check('last_name')
        .trim()
        .notEmpty().withMessage(MSG_LAST_NAME_NOT_EMPTY)
        .isLength({ max: NAME_MAX }).withMessage(MSG_LAST_NAME_MAX)
        .matches(LAST_NAME_PATTERN, 'i')
        .withMessage(MSG_LAST_NAME_PATTERN);

    return data.validationErrors();

}

module.exports = {
    validateData
};
