import React from 'react';

import strings from 'strings';

class Albums extends React.Component {

    render() {
        return (
            <div className="page dashboard-albums">
                <h1>{strings.MODULE_MUSIC}</h1>
            </div>
        );
    }
}

export default Albums;