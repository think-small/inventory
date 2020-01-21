const moment = require.requireActual("moment");

const mockedMoment = (timestamp = 0) => moment(timestamp);

export default mockedMoment;
